<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'models/Common_model.php');
class API_model extends Common_model {
	
	public function __construct()
	{
		parent::__construct();
		date_default_timezone_set("Asia/Calcutta");
	
	}
	public function transcations(){
		
		/**
			field1 - cardno
			field2 - tollmemberid
			API - http://localhost/tollrace/API/transcations?field1=1236&field2=2
		**/
		
		$field1 = $this->input->get('field1');
		$field2 = $this->input->get('field2');
		if($field1 != ""){
			$row = $this->db->select('*')->from('toll_users')->where('CardNo',$field1)->get()->row_array();
			if(!empty($row)){
				$row1 = $this->db->select('*')->from('toll_tollmembers')->where('MemberId',$field2)->get()->row_array();
				if(!empty($row1)){
					$Vehicle_Type = $row['Vehicle_Type'];
					$row2 = $this->db->select('*')->from('toll_fareamounts')->where('Vehicle_Type',$Vehicle_Type)->order_by('FareId','asc')->get()->row_array();
					if(!empty($row2)){
						$amount = $row2['FareAmount'];						
					}
					else{
						$amount = 50;		
					}
					
					$availableBal = intval($row['Amount']);
					if(intval($availableBal) >= intval($amount)){

						$data1['Amount'] = intval($availableBal) - intval($amount);
						$this->db->where('UserId',$row['UserId']);
						$this->db->update('toll_users',$data1);
						
						$data['TransactionNo'] = time();
						$data['UserId'] = $row['UserId'];
						$data['CardNo'] = $row['CardNo'];
						$data['TollMemberId'] = $row1['MemberId'];
						$data['Amount'] = $amount;
						$data['TransactionStatus'] = 'Success';
						$data['Transactiondate'] = date('d M Y h:i a');
						$data['CreatedOn'] = date('Y-m-d h:i:s');
						$this->db->insert('toll_transactions',$data);
						return array('code'=>'200','msg'=>'Success Debited');
					}
					else{
						return array('code'=>'403','msg'=>'Not Enough money in your account');
					}
				}
				else{
					return array('code'=>'401','msg'=>'Toll member Id');
				}
			}
			else{
				return array('code'=>'401','msg'=>'Invalid Card No');
			}
		}
		else{
			return array('code'=>'401','msg'=>'Invalid Card No');
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/****************************** end of the page *****************************/
	public function update()
	{
	
		if($this->input->get('key'))
		{
			$string = trim($_GET['key']);	
			$this->db->select('*');
			$this->db->from('rtd_trains');
			$this->db->where('TrainKey',$string);
			$result = $this->db->get()->row_array();
			
			if(!empty($result))
			{
				if($this->input->get('field1'))
				{
					$field1 = trim($_GET['field1']);
					$data['field1'] = $field1;
				}
				if($this->input->get('field2'))
				{
					$field2 = trim($_GET['field2']);
					$data['field2'] = $field2;
				}
				if($this->input->get('field3'))
				{
					$field3 = trim($_GET['field3']);
					$data['field3'] = intval($field3);
				}
				if($this->input->get('field4'))
				{
					$field4 = trim($_GET['field4']);
					$data['field4'] = $field4;
				}
				if($this->input->get('field5'))
				{
					$field5 = trim($_GET['field5']);
					$data['field5'] = $field5;
				} 
							
				$data['TrainKey'] = $string ; 
				$data['Date'] = date('Y-m-d') ; 
				$data['Time'] = date('h:i a') ; 
				$data['DetectedOn'] =date('Y-m-d h:i:s') ;
				//echo "train";print_r($data);die;
				$this->db->insert('rtd_sensor_data',$data);
				$crack = intval($data['field3']);
				if($crack==1)
				{
					$addr = $this->Get_Address($field1,$field2);
					$data1['Notification'] = "Crack Detected";
					$data1['Location'] = $addr;
					$data1['CreatedOn'] = date('Y-m-d h:i:s') ; 
					$data1['Date'] = date('d-M-Y');
					$this->db->insert('rtd_notifications',$data1);
					
					// SMS GATEWAY
					 	$phone_number = 9502121552; 
						//$phone_number = 7842252284;
						$message = " Crack is Detected at ".$addr;
						//$message = " Crack is Detected at ";
						$text = urlencode($message); 
						$res = file_get_contents('http://bhashsms.com/api/sendmsg.php?user=amarn&pass=9849334539&sender=JOBSIT&phone='.$phone_number.'&text='.$text.'&priority=sdnd&stype=normal');				
				}
				
				return 'Successfully uploaded';
			}
			else
				return "Invalid apikey"; 
			
		}
		else
			return 'Invalid request';
	}
	
	public function get_data()
	{
		if($this->input->get('apikey'))
		{		
			$string = trim($_GET['apikey']);
			$this->db->select('*');
			$this->db->from('rtd_sensor_data');
			$this->db->where('TrainKey',$string);
			$this->db->order_by('recordID','desc');	
			return $this->db->get()->row_array();
		}
		else
			return 'Invalid request';
	}
	
	public function Get_Address($lat,$long)
	{
		$latitude = $lat;
		$longitude = $long;
		$latlongs = $lat.','.$long;
		$geocodeFromLatLong = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json&latlng='.floatval($latitude).','.floatval($longitude).'&sensor=false'); 
		$output = json_decode($geocodeFromLatLong);
		$status = $output->status;
		$address = ($status=="OK")?$output->results[1]->formatted_address:$latlongs;
		return $address;
	}
	
	
	
	
	
	
	
	
	// ************************* end  of the page **********************
	
	
	
	public function talkback()
	{
		$this->db->select('*');
		$this->db->from('wastemanagement_Commands');
		$res = $this->db->get()->row_array();
		if(!empty($res))
		{
			$res_command = $res['command'];
			$id = $res['CommandID'];
			$this->db->where('CommandID',$id);
			$this->db->delete('wastemanagement_Commands');
			
			return $res_command;	
			
		}
		else
			return 'No Strings' ;
	}
	public function api_logins()
	{
		$email = trim($this->input->post('email'));
		$password = trim($this->input->post('password'));
		
		$this->db->select('*');
		$this->db->from('smarthomeautomation_users');
		$this->db->where('Email',$email);
		$this->db->where('Password',md5($password));
		$res = $this->db->get()->row_array();
		if(!empty($res))
		{
			return $res['UserKey'].','.$res['FirstName'].' '.$res['LastName'];
		}
		else
			return 0 ;
	}

	
	public function get_talkback()
	{
		$key = trim($this->input->get('userkey'));
		$this->db->select('*');
		$this->db->from('smarthomeautomation_users');
		$this->db->where('UserKey',$key);
		$res = $this->db->get()->row_array();
		if(!empty($res))
		{
			$this->db->select('*');
			$this->db->from('smarthomeautomation_talkback');
			$this->db->where('UserKey',$key);
			$this->db->order_by('UserKey','asc');
			$res1 = $this->db->get()->row_array();
			if(!empty($res1))
			{
				$res_command = $res1['Command'];
				$id = $res1['TalkbackId'];
				$this->db->where('TalkbackId',$id);
				$this->db->delete('smarthomeautomation_talkback');
				
				return $res_command;
			}
			else
				return '0';
		}
		else
			return '0' ;
		
	}
	public function get_values()
	{
		$key = trim($this->input->get('key'));
		$this->db->select('*');
		$this->db->from('smarthomeautomation_users');
		$this->db->where('UserKey',$key);
		$res = $this->db->get()->row_array();
		if(!empty($res))
		{
			$this->db->select('*');
			$this->db->from('smarthomeautomation_temp_humidity');
			$this->db->where('UserKey',$key);
			$this->db->order_by('UserKey','desc');
			$res1 = $this->db->get()->row_array();
			if(!empty($res1))
			{
				return array('temp'=>$res1['Temprature'],'hum'=>$res1['Humidity']);
			}
			else
				return array('err'=>'0');
		}
		else
				return array('err'=>'0');
		
		
		
	}
	
	
}
?>