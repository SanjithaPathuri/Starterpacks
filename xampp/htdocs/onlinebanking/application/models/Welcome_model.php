<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Welcome_model extends CI_Model {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->library('session');
		date_default_timezone_set("Asia/Calcutta");
	}
	public function Login()
	{
		$AdhaarNo = $this->input->post('AdhaarNo');
		$Password = $this->input->post('Password');
		$this->db->select('*');
		$this->db->from('farmers_account');
		$this->db->where('AdhaarNo',$AdhaarNo);
		$this->db->where('Password',$Password);
		$row = $this->db->get()->row_array();
		if(!empty($row))
		{
			
			$this->session->set_userdata('UserId',$row['FarmersID']);
			$this->session->set_userdata('Name',$row['Name']);
			$this->session->set_userdata('AdhaarNo',$row['AdhaarNo']);
			$this->session->set_userdata('Mobile',$row['Mobile']);
			$this->session->set_userdata('Address',$row['Address']);
			return array('err'=>1);
		}
		else
		{
			return array('err'=>0);
		}
	}
	public function user_register(){
		$Name = $this->input->post('Name');
		$AdhaarNo = $this->input->post('AdhaarNo');
		$Mobile = $this->input->post('Mobile');
		$Address = $this->input->post('Address');
		$Password = $this->input->post('password');
		$AccountNo = time();
		$Status = 1;
		$CreatedOn = date('d M Y h:i a');		
		$data['Name'] = $Name;
		$data['AdhaarNo'] = $AdhaarNo;
		$data['Mobile'] = $Mobile;
		$data['Address'] = $Address;
		$data['Password'] = $Password;
		$data['AccountNo'] = $AccountNo;
		$data['Status'] = $Status;
		$data['CreatedOn'] = $CreatedOn;		
		$this->db->insert('farmers_account',$data);	
		return array('err'=>1,'msg'=>'Successfully Created a new account');
	}
	
	
	
	/*public function write_data(){
		$time = date('d M Y h:i a');
		$temperature = $this->input->post('temperature');
		$humidity = $this->input->post('humidity');
		$soilmoisture = $this->input->post('soilmoisture');
		$data['temperature'] = $temperature;
		$data['humidity'] = $humidity;
		$data['soilmoisture'] = $soilmoisture;
		$data['time'] = $time;		
		$this->db->insert('sensordata',$data);	
		return array('err'=>1,'msg'=>'Successfully inserted sensor data');
	}*/
	
	
	
	
	public function users_account_details(){
		$FarmersID = $this->session->userdata('UserId');
		return $this->db->select('*')->from('farmers_account')->where('FarmersID',$FarmersID)->get()->row_array();
	}
	public function applied_loan(){
		$FarmersID = $this->session->userdata('UserId');
		$data['farmerId'] = $FarmersID;
		$data['ApplicationId'] = time();
		$data['AppliedStatus'] = 1;
		$data['ApproveStatus'] = 0;
		$data['Status'] = 1;
		$data['FormatedDate'] = date('d M Y h:i a');
		$data['CreatedOn'] = date('Y-m-d h:i:s');
		$this->db->insert('farmers_loans',$data);
		return array('err'=>1, 'msg'=>'Success');
	}
	public function get_loans_farmers($params)
	{	$FarmersID = $this->session->userdata('UserId');
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from farmers_loans  where farmerId = '$FarmersID'";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by ID  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Bank_login(){
		$email = $this->input->post('Email');
		$password = $this->input->post('Password');
		$this->db->select('*');
		$this->db->from('farmers_bank_cedentials');
		$this->db->where('Email',$email);
		$this->db->where('Password',$password);
		$row = $this->db->get()->row_array();
		if(!empty($row))
		{
			$this->session->set_userdata('MemberId',$row['Id']);
			$this->session->set_userdata('Email',$row['Email']);
			return array('err'=>1);
		}
		else
		{
			return array('err'=>0);
		}

	
	}
	public function bank_data_details(){
		$MemberId = $this->session->userdata('MemberId');
		return $this->db->select('*')->from('farmers_bank_cedentials')->where('Id',$MemberId)->get()->row_array();
	}
	public function get_loans_all_farmers($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		//$sql = "select * from farmers_loans  where Status != 3";
		$sql = "select * from farmers_loans as fl right join farmers_account as ac on fl.farmerId = ac.FarmersID   "; 
		if($skey != ''){
			$sql .= " where  (ac.AdhaarNo LIKE '$skey' or ac.AccountNo LIKE '$skey') " ;
		}		
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by fl.ID  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		$i = 0;
		/*foreach($result as $row){
			$id = $row['farmerId'];
			$r = $this->db->select('*')->from('farmers_account')->where('FarmersID',$id)->get()->row_array();
			$result[$i]['Name'] = $r['Name'];
			$result[$i]['Mobile'] = $r['Mobile'];	
			$result[$i]['AdhaarNo'] = $r['AdhaarNo'];	
			$i = $i + 1 ; 			
		}*/
		return array("total"=>$total,"records"=> $result);
	}
	public function get_loans_all_farmers1($params)
	{
		$array = array();
		$sql1 = "select * from farmers_account  where AdhaarNo LIKE '%$skey%' or AccountNo  LIKE '%$skey%'";
		$records1 = $this->db->query($sql)->result_array();
		$i = 0;
		foreach($records1 as $row1){
			$farmerId = $row1['FarmersID'];
			$sql2 = "select * from farmers_loans  where farmerId = '$farmerId' order by ID  DESC LIMIT $lstart, $lend";
			$records2 = $this->db->query($sql2)->result_array();
			foreach($records2 as $row2){
				$array[$i] =  '';
				
			}
		}
		
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from farmers_loans  where Status != 3";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by ID  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		$i = 0;
		foreach($result as $row){
			$id = $row['farmerId'];
			$r = $this->db->select('*')->from('farmers_account')->where('FarmersID',$id)->get()->row_array();
			$result[$i]['Name'] = $r['Name'];
			$result[$i]['Mobile'] = $r['Mobile'];	
			$result[$i]['AdhaarNo'] = $r['AdhaarNo'];	
			$i = $i + 1 ; 			
		}
		return array("total"=>$total,"records"=> $result);
	}
	public function approve(){
		$ID = $this->input->post('ID');
		$data['ApproveStatus'] = 1;
		$this->db->where('ID',$ID);
		$this->db->update('farmers_loans',$data);
		return array('err'=>1,'msg'=>'sucess');
	}
	public function reject(){
		$ID = $this->input->post('ID');
		$data['ApproveStatus'] = 2;
		$this->db->where('ID',$ID);
		$this->db->update('farmers_loans',$data);
		return array('err'=>1,'msg'=>'sucess');
	}
	/*
	public function close_app(){
		$ID = $this->input->post('ID');
		$data['ApproveStatus'] = 3;
		$this->db->where('ID',$ID);
		$this->db->update('farmers_loans',$data);
		return array('err'=>1,'msg'=>'sucess');
	}
	*/
	
	public function Suggestion(){
		
		$status = '';
		$err = 0;
		$ID = $this->input->post('ID');
		$sql = "select * from farmers_loans where ID = '$ID' ";
		$records = $this->db->query($sql)->row_array(); 
		$farmerId = $records['farmerId'];
		$sql1 = "select * from farmers_loans where farmerId = '$farmerId' ";	
		$records1 = $this->db->query($sql1)->result_array(); 		
		$LoanAmount = 0;
		$PaidAmount = 0;
		foreach($records1 as $row){
			$LoanAmount += $row['LoanAmount'];
			$PaidAmount += $row['PaidAmount'];
		}		
		$half_amount = $LoanAmount / 2;
		
		## Case - 1
		if($PaidAmount > $half_amount ){
			$result = file_get_contents('https://api.thingspeak.com/channels/162569/feeds.json?api_key=1B9C77S004RAGRPW');
			$result = json_decode($result);
			$rows = $result->feeds;
			
			$Temperature = 0 ;
			$Humidity = 0 ;
			$Soil_moisture = 0 ;
			$i = 0 ;
			foreach($rows as $row){
				//field1 - Temperature
				//field2 - Humidity
				//field3 - Soil moisture  
				$Temperature += $row->field1;	
				$Humidity += $row->field2;	
				$Soil_moisture += $row->field3;	
				$i = $i + 1;
			}
			$Avg_temperature = $Temperature / $i;
			$Avg_humidity = $Humidity / $i;
			$Avg_soil_moisture = $Soil_moisture / $i;
			## Case - 2
			if(($Avg_temperature >= 30 or $Avg_temperature <= 35) or ($Avg_humidity >= 25 or $Avg_humidity <= 30) and ($Avg_soil_moisture >= 1000 or $Avg_soil_moisture <= 1500)){
				$status = 'Approve';
				$err = 1;
			}
			else{
				$status = 'Installment Payment';
				$err = 3;
			}
		}
		else if(($PaidAmount == 0) and ($half_amount==0) ){
				$status = 'Can Approve - New Loan';
				$err = 5;
		}
		else{
			$result = file_get_contents('https://api.thingspeak.com/channels/162569/feeds.json?api_key=1B9C77S004RAGRPW');
			$result = json_decode($result);
			$rows = $result->feeds;
			
			$Temperature = 0 ;
			$Humidity = 0 ;
			$Soil_moisture = 0 ;
			$i = 0 ;
			foreach($rows as $row){
				//field1 - Temperature
				//field2 - Humidity
				//field3 - Soil moisture  
				$Temperature += $row->field1;	
				$Humidity += $row->field2;	
				$Soil_moisture += $row->field3;	
				$i = $i + 1;
			}
			$Avg_temperature = $Temperature / $i;
			$Avg_humidity = $Humidity / $i;
			$Avg_soil_moisture = $Soil_moisture / $i;
			## Case - 3
			if(($Avg_temperature >= 30 or $Avg_temperature <= 35) or ($Avg_humidity >= 25 or $Avg_humidity <= 30) and ($Avg_soil_moisture >= 1000 or $Avg_soil_moisture <= 1500)){
				$status = 'Installment Payment';
				$err = 4;			
			}
			else{
				$status = 'Rejected';
				$err = 2;
			}
		}
		return array('err'=>$err,'msg'=>$status);
	}
	public function close(){
		$ID = $this->input->post('ID');
		$data['ApproveStatus'] = 3;
		$this->db->where('ID',$ID);
		$this->db->update('farmers_loans',$data);
		return array('err'=>1,'msg'=>'sucess');
	}
	public function get_suggestion(){
		$skey = $this->input->post('search');
		$status = ''; 
		$sql = "select * from farmers_account where AdhaarNo LIKE '$skey' or AccountNo LIKE '$skey' ";
		$records = $this->db->query($sql)->row_array();
		if(!empty($records)){			
			$farmerId = $records['farmerId'];
			$sql1 = "select * from farmers_loans where farmerId = '$farmerId' ";	
			$records1 = $this->db->query($sql1)->result_array(); 		
			$LoanAmount = 0;
			$PaidAmount = 0;
			foreach($records1 as $row){
				$LoanAmount += $row['LoanAmount'];
				$PaidAmount += $row['PaidAmount'];
			}		
			$half_amount = $LoanAmount / 2;
			
			## Case - 1
			if($PaidAmount > $half_amount ){
				$result = file_get_contents('https://api.thingspeak.com/channels/162569/feeds.json?api_key=1B9C77S004RAGRPW');
				$result = json_decode($result);
				$rows = $result->feeds;
				
				$Temperature = 0 ;
				$Humidity = 0 ;
				$Soil_moisture = 0 ;
				$i = 0 ;
				foreach($rows as $row){
					//field1 - Temperature
					//field2 - Humidity
					//field3 - Soil moisture  
					$Temperature += $row->field1;	
					$Humidity += $row->field2;	
					$Soil_moisture += $row->field3;	
					$i = $i + 1;
				}
				$Avg_temperature = $Temperature / $i;
				$Avg_humidity = $Humidity / $i;
				$Avg_soil_moisture = $Soil_moisture / $i;
				## Case - 2
				if(($Avg_temperature >= 30 or $Avg_temperature <= 35) or ($Avg_humidity >= 25 or $Avg_humidity <= 30) and ($Avg_soil_moisture >= 1000 or $Avg_soil_moisture <= 1500)){
					$status = 'Condition of farm is good, revenue can be generated';
					$err = 1;
				}
				else{
					$status = 'Farm condition is not good but, loan history is good';
					$err = 3;
				}
			}
			else{
				$result = file_get_contents('https://api.thingspeak.com/channels/162569/feeds.json?api_key=1B9C77S004RAGRPW');
				$result = json_decode($result);
				$rows = $result->feeds;
				
				$Temperature = 0 ;
				$Humidity = 0 ;
				$Soil_moisture = 0 ;
				$i = 0 ;
				foreach($rows as $row){
					//field1 - Temperature
					//field2 - Humidity
					//field3 - Soil moisture  
					$Temperature += $row->field1;	
					$Humidity += $row->field2;	
					$Soil_moisture += $row->field3;	
					$i = $i + 1;
				}
				$Avg_temperature = $Temperature / $i;
				$Avg_humidity = $Humidity / $i;
				$Avg_soil_moisture = $Soil_moisture / $i;
				## Case - 3
				if(($Avg_temperature >= 30 or $Avg_temperature <= 35) or ($Avg_humidity >= 25 or $Avg_humidity <= 30) and ($Avg_soil_moisture >= 1000 or $Avg_soil_moisture <= 1500)){
					$status = 'Condition of farm is good, revenue can be generated';
					$err = 2;
				}
				else{
					$status = 'Farm condition is not good but, loan history is good';
					$err = 3;
				}
			}		
		}
		else{
			$status = "No record found .. ";
		}
		
		return array('err'=>1,'status'=>$status);
	}
	public function Contact_data()
	{
		$name = $this->input->post('name');	
		$email = $this->input->post('email');
		$message = $this->input->post('message');
		$AdminId = $this->session->userdata('AdminId');
		$data['Name	'] = $name;
		$data['Email'] = $email;
		$data['Message'] = $message;
		$data['createdon'] = date('Y-m-d h:i:s');
		$this->db->insert('contacts',$data);		
		return array('err'=>1);
		
	}
	
	
	
	

	/************************** end of the page **************************************/






	
	//---------------------Pagination code----------------------------
	function create_links($total_rows=0, $per_page=0, $cur_page=0,$num_links=10)
	{
		
		if ($total_rows == 0 OR $per_page == 0)
		return '';
		
		$num_pages = (int) ceil($total_rows / $per_page);
	
		if ($num_pages === 1)
		return '';

		
		if($cur_page > $num_pages)
			$cur_page = $num_pages;		

		if($cur_page<$num_links)
		{
			$start	= 1;
			if($num_links > $num_pages) 
				$end = $num_pages;	
			else
				$end = $num_links;
		}
		else
		{
			$start	= $cur_page;
			if(($cur_page + $num_links) > $num_pages) 
				$end = $num_pages;	
			else
				$end = $num_links;
		}
		
		$output = '';
		// Render the "First" link.
		if ($cur_page > 1)
		$output .= '<li page="1"><a aria-label="First"> <span aria-hidden="true">First</span></a></li>';

       
      
		// Render the "Previous" link.
		if ($cur_page !== 1 && $cur_page>1)
		$output .= '<li page="'.($cur_page-1).'"><a  >Previous</li></a>';

		for ($loop = $start; $loop <= $end; $loop++)
		{
			if (intval($cur_page) == intval($loop))
				$output .= "<li page='$loop' class='active'><a>".$loop."</a></li>";
			else
				$output .= "<li page='$loop'><a>".$loop."</a></li>";
		}	
		
		if ($cur_page < $num_pages)
		{
			$i = $cur_page + 1;
			$output .= "<li page='$i'><a >Next</a></li>";
		}

		if($cur_page < $num_pages-1)
		$output .= "<li page='$num_pages'><a >Last</a></li>";

		return $output;
	}
	
}
?>