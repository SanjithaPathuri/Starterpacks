<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'models/Common_model.php');
class Admin_model extends Common_model {
	
	public function __construct()
	{
		parent::__construct();
		date_default_timezone_set("Asia/Calcutta");
	}
	public function Admin_login_checkUp()
	{
		$email = trim($this->input->post('UserId'));
		$password = trim($this->input->post('Password'));
		$this->db->select('*');
		$this->db->from('hospital_admin');
		$this->db->where('Email',$email);
		$this->db->where('Password',$password);
		$result = $this->db->get()->result_array();
		if(count($result) == 1)
		{
			$this->session->set_userdata('AdminId',$result['0']['AdminId']);
			$this->session->set_userdata('Email',$result['0']['Email']);
			return array('err'=>'1','msg'=>'Redirecting ....');
		}
		else
		{
			return array('err'=>'0','msg'=>'Invalid Credentails');
		}
	}
	
	public function Add_Edit_doctors(){

		$MemberId = trim($this->input->post('MemberId'));
		$Name = trim($this->input->post('Name'));
		$Email = trim($this->input->post('Email'));
		$Mobile = trim($this->input->post('Mobile'));
		$Designation = trim($this->input->post('Designation'));
		$Address = trim($this->input->post('Address'));
		$Password = trim($this->input->post('Password'));
		$Status = trim($this->input->post('Status'));
		if($MemberId == '')
		{
			$data['Name'] = $Name ;
			$data['Mobile'] = $Mobile ;
			$data['Email'] = $Email ;
			$data['Designation'] = $Designation ;
			$data['Address'] = $Address ;
			$data['Password'] = $Password ;
			$data['Status'] = $Status ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$this->db->insert('hospital_doctors',$data);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['Name'] = $Name ;
			$data['Mobile'] = $Mobile ;
			$data['Email'] = $Email ;
			$data['Designation'] = $Designation ;
			$data['Address'] = $Address ;
			$data['Status'] = $Status ;
			$this->db->where('MemberId',$MemberId);
			$this->db->update('hospital_doctors',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}	
	public function Record_doctors()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('hospital_doctors');
		$this->db->where('MemberId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_doctors()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('MemberId',$recordId);
		$this->db->delete('hospital_doctors');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_doctors($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from hospital_doctors  where Status != 3";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by MemberId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Get_Pagination_records_Contacts($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from hospitals_contacts ";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by ContactId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	
	
	/******************************************************************************/
	
	
	
	public function Add_Edit_toll_gates(){

		$tollgateId = trim($this->input->post('tollgateId'));
		$tollname = trim($this->input->post('tollname'));
		$tolllocation = trim($this->input->post('tolllocation'));
		$status = trim($this->input->post('status'));
		if($tollgateId == '')
		{
			$data['tollname'] = $tollname ;
			$data['tolllocation'] = $tolllocation ;
			$data['status'] = $status ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$this->db->insert('toll_tollgates',$data);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['tollname'] = $tollname ;
			$data['tolllocation'] = $tolllocation ;
			$data['status'] = $status ;
			$this->db->where('tollgateId',$tollgateId);
			$this->db->update('toll_tollgates',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}	
	public function Record_toll_gates()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('toll_tollgates');
		$this->db->where('tollgateId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_toll_gates()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('tollgateId',$recordId);
		$this->db->delete('toll_tollgates');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_toll_gates($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from toll_tollgates  where status != 3";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by tollgateId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Add_Edit_toll_members(){

		$MemberId = trim($this->input->post('MemberId'));
		$Name = trim($this->input->post('Name'));
		$Email = trim($this->input->post('Email'));
		$Mobile = trim($this->input->post('Mobile'));
		$TollId = trim($this->input->post('TollId'));
		$Address = trim($this->input->post('Address'));
		$Password = trim($this->input->post('Password'));
		$Status = trim($this->input->post('Status'));
		if($MemberId == '')
		{
			$data['Name'] = $Name ;
			$data['Mobile'] = $Mobile ;
			$data['Email'] = $Email ;
			$data['TollId'] = $TollId ;
			$data['Address'] = $Address ;
			$data['Password'] = $Password ;
			$data['Status'] = $Status ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$this->db->insert('toll_tollmembers',$data);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['Name'] = $Name ;
			$data['Mobile'] = $Mobile ;
			$data['Email'] = $Email ;
			$data['TollId'] = $TollId ;
			$data['Address'] = $Address ;
			$data['Status'] = $Status ;
			$this->db->where('MemberId',$MemberId);
			$this->db->update('toll_tollmembers',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}	
	public function Record_toll_members()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('toll_tollmembers');
		$this->db->where('MemberId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_toll_members()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('MemberId',$recordId);
		$this->db->delete('toll_tollmembers');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_toll_members($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from toll_tollmembers  where Status != 3";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by MemberId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function get_toll_gates(){
		return $this->db->select('*')->from('toll_tollgates')->where('status',1)->get()->result_array();
	}
	public function Add_Edit_Users(){

		$UserId = trim($this->input->post('UserId'));
		$Name = trim($this->input->post('Name'));
		$Email = trim($this->input->post('Email'));
		$Mobile = trim($this->input->post('Mobile'));
		$CardNo = trim($this->input->post('CardNo'));
		$Address = trim($this->input->post('Address'));
		$Vehicle_Type = trim($this->input->post('Vehicle_Type'));
		$Password = trim($this->input->post('Password'));
		$Status = trim($this->input->post('Status'));
		if($UserId == '')
		{
			$data['Name'] = $Name ;
			$data['Mobile'] = $Mobile ;
			$data['Email'] = $Email ;
			$data['CardNo'] = $CardNo ;
			$data['Address'] = $Address ;
			$data['Password'] = $Password ;
			$data['Status'] = $Status ;
			$data['Vehicle_Type'] = $Vehicle_Type ;
			$data['Amount'] = '250' ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$this->db->insert('toll_users',$data);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['Name'] = $Name ;
			$data['Mobile'] = $Mobile ;
			$data['Email'] = $Email ;
			$data['CardNo'] = $CardNo ;
			$data['Address'] = $Address ;
			$data['Status'] = $Status ;
			$data['Vehicle_Type'] = $Vehicle_Type ;
			$this->db->where('UserId',$UserId);
			$this->db->update('toll_users',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}	
	public function Record_Users()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('toll_users');
		$this->db->where('UserId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_Users()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('UserId',$recordId);
		$this->db->delete('toll_users');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_Users($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from hospital_users  where Status != 3";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by UserId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Add_Edit_FaresAmount(){

		$FareId = trim($this->input->post('FareId'));
		$Vehicle_Type = trim($this->input->post('Vehicle_Type'));
		$FareAmount = trim($this->input->post('FareAmount'));
		$Toll_Type = trim($this->input->post('Toll_Type'));
		$TollgateName = trim($this->input->post('TollgateName'));
		$Status = trim($this->input->post('Status'));
		if($FareId == '')
		{
			$data['Vehicle_Type'] = $Vehicle_Type ;
			$data['FareAmount'] = $FareAmount ;
			$data['Toll_Type'] = $Toll_Type ;
			$data['TollgateName'] = $TollgateName ;
			$data['Status'] = $Status ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$this->db->insert('toll_fareamounts',$data);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['Vehicle_Type'] = $Vehicle_Type ;
			$data['FareAmount'] = $FareAmount ;
			$data['Toll_Type'] = $Toll_Type ;
			$data['TollgateName'] = $TollgateName ;
			$data['Status'] = $Status ;
			$this->db->where('FareId',$FareId);
			$this->db->update('toll_fareamounts',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}	
	public function Record_FaresAmount()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('toll_fareamounts');
		$this->db->where('FareId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_FaresAmount()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('FareId',$recordId);
		$this->db->delete('toll_fareamounts');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_FaresAmount($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from toll_fareamounts  where Status != 3";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by FareId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	
	
	
	
	
	
	
	
	/************************** end of the page *******************************/
	public function Add_Edit_ManageEmployees()
	{
		$EmployeeId = trim($this->input->post('EmployeeId'));
		$FirstName = trim($this->input->post('FirstName'));
		$LastName = trim($this->input->post('LastName'));
		$Email = trim($this->input->post('Email'));
		$Mobile = trim($this->input->post('Mobile'));
		$Location = trim($this->input->post('Location'));
		$Password = trim($this->input->post('Password'));
		$TrainKey = trim($this->input->post('TrainKey'));
		$AdminId = $this->session->userdata('AdminId');
		if($EmployeeId == '')
		{
			$data['FirstName'] = $FirstName ;
			$data['LastName'] = $LastName ;
			$data['Email'] = $Email ;
			$data['Mobile'] = $Mobile ;
			$data['Location'] = $Location ;
			$data['Password'] = md5($Password) ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$data['TrainKey'] = $TrainKey;
			$data['AdminId'] = $AdminId;
			$this->db->insert('rtd_employees',$data);		
			$last_id = $this->db->insert_id(); 
			$data1['EmployeeKey'] = $last_id.time();
			$this->db->where('EmployeeId',$last_id);
			$this->db->update('rtd_employees',$data1);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['FirstName'] = $FirstName ;
			$data['LastName'] = $LastName ;
			$data['Email'] = $Email ;
			$data['Mobile'] = $Mobile ;
			$data['Location'] = $Location ;
			$data['TrainId'] = $TrainId;
			$this->db->where('EmployeeId',$EmployeeId);
			$this->db->update('rtd_employees',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}
	public function Record_ManageEmployees()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('rtd_employees');
		$this->db->where('EmployeeId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_ManageEmployees()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('EmployeeId',$recordId);
		$this->db->delete('rtd_employees');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_ManageEmployees($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$AdminId = $this->session->userdata('AdminId');
		$sql = "select * from rtd_employees  where AdminId='$AdminId'";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by EmployeeId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Get_Trains()
	{
		$AdminId = $this->session->userdata('AdminId');
		$this->db->select('*');
		$this->db->from('rtd_trains');
		$this->db->where('AdminId',$AdminId);
		return $this->db->get()->result_array();
	}
	public function Add_Edit_ManageTrainRoutes()
	{
		$RouteId = trim($this->input->post('RouteId'));
		$Fromloc = trim($this->input->post('From'));
		$Toloc = trim($this->input->post('To'));
		$AdminId = $this->session->userdata('AdminId');
		if($RouteId == '')
		{
			$data['Fromloc'] = $Fromloc ;
			$data['Toloc'] = $Toloc ;
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$data['AdminId'] = $AdminId;
			$this->db->insert('rtd_trainroutes',$data);		
			$last_id = $this->db->insert_id(); 
			$data1['RouteKey'] = $last_id.time();
			$this->db->where('RouteId',$last_id);
			$this->db->update('rtd_trainroutes',$data1);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['Fromloc'] = $Fromloc ;
			$data['Toloc'] = $Toloc ;
			$this->db->where('RouteId',$RouteId);
			$this->db->update('rtd_trainroutes',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}
	public function Record_ManageTrainRoutes()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('rtd_trainroutes');
		$this->db->where('RouteId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_ManageTrainRoutes()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('RouteId',$recordId);
		$this->db->delete('rtd_trainroutes');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_ManageTrainRoutes($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$AdminId = $this->session->userdata('AdminId');
		$sql = "select * from rtd_trainroutes  where AdminId='$AdminId'";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by RouteId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	
	public function Add_Edit_ManageTrains()
	{
		$TrainId = trim($this->input->post('TrainId'));
		$TrainNum = trim($this->input->post('TrainNum'));
		$TrainName = trim($this->input->post('TrainName'));
		$AdminId = $this->session->userdata('AdminId');
		$RouteId =  trim($this->input->post('RouteId'));
		$this->db->select('Fromloc,Toloc');
		$this->db->from('rtd_trainroutes');
		$this->db->where('RouteId',$RouteId);
		$TrainRoute = $this->db->get()->row_array();
		if($TrainId == '')
		{
			$data['TrainId'] = $TrainId ;
			$data['TrainNumber'] = $TrainNum ;
			$data['TrainName'] = $TrainName ;
			$data['RouteId'] = $RouteId;
			$data['TrainRoute'] = $TrainRoute['Fromloc'].' ==>'.$TrainRoute['Toloc'];
			$data['CreatedOn'] = date('Y-m-d h:i:s');
			$data['AdminId'] = $AdminId;
			$this->db->insert('rtd_trains',$data);		
			$last_id = $this->db->insert_id(); 
			$data1['TrainKey'] = $last_id.time();
			$this->db->where('TrainId',$last_id);
			$this->db->update('rtd_trains',$data1);
			return array('err'=>'1','Successfully added new record');
		}
		else
		{
			$data['TrainNumber'] = $TrainNum ;
			$data['TrainName'] = $TrainName ;
			$data['RouteId'] = $RouteId;
			$data['TrainRoute'] =  $TrainRoute['Fromloc'].' ==>'.$TrainRoute['Toloc'];
			$this->db->where('TrainId',$RouteId);
			$this->db->update('rtd_trains',$data);
			return array('err'=>'1','Successfully updated a record');
		}
	}
	public function Record_ManageTrains()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('rtd_trains');
		$this->db->where('TrainId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_ManageTrains()
	{
		$recordId = $this->input->post('recordId');
		$this->db->where('TrainId',$recordId);
		$this->db->delete('rtd_trains');
		return array('msg'=>'Deleted Successfully');
	}
	public function Get_Pagination_records_ManageTrains($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$AdminId = $this->session->userdata('AdminId');
		$sql = "select * from rtd_trains where AdminId='$AdminId'";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by TrainId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	
	
	public function Get_TrainRoutes()
	{
		$AdminId = $this->session->userdata('AdminId');
		$this->db->select('*');
		$this->db->from('rtd_trainroutes');
		$this->db->where('AdminId',$AdminId);
		$result = $this->db->get()->result_array();
		return array("res"=> $result);
	}
	public function Get_Track_Details()
	{	
		$AdminId = $this->session->userdata('AdminId');
		$sqlquery ="select * from rtd_sensor_data INNER JOIN rtd_trains on rtd_sensor_data.TrainKey = rtd_trains.TrainKey 
		INNER JOIN rtd_employees on rtd_trains.TrainKey = rtd_employees.TrainKey where rtd_trains.AdminId='$AdminId' AND rtd_sensor_data.Status!=2 AND (rtd_sensor_data.field3<800 OR rtd_sensor_data.field4>100)";
	
		$query = $this->db->query($sqlquery)->result_array();
		$i= 0 ;
        foreach ($query as $row)
        {
            $addr = $this->Get_Address($row['field1'],$row['field2']);
			$query[$i]['address']  = $addr;
			$i = $i + 1 ;
        }
		return $query ;
    }
	public function Get_Address($lat,$long)
	{
		$latitude = $lat;
		$longitude = $long;

		$geocodeFromLatLong = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?latlng='.trim($latitude).','.trim($longitude).'&sensor=false'); 
		$output = json_decode($geocodeFromLatLong);
		$status = $output->status;
		$address = ($status=="OK")?$output->results[1]->formatted_address:'';
		return $address;
	}
	public function Get_Pagination_records_Notifications($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$AdminId = $this->session->userdata('AdminId');
		/* $sql = "select * from rtd_sensor_data INNER JOIN rtd_trains on rtd_sensor_data.TrainKey = rtd_trains.TrainKey AND rtd_trains.AdminId='$AdminId'  where(field3<800 OR field4>100)";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by recordID  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		$i= 0 ;
        foreach ($result as $row)
        {
            $addr = $this->Get_Address($row['field1'],$row['field2']);
			$result[$i]['address']  = $addr;
			$i = $i + 1 ;
        } */
		$sql = "select * from rtd_notifications";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by Notify_ID  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Get_Pagination_records_TrackRecords($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$AdminId = $this->session->userdata('AdminId');
		$sql = "select * from rtd_sensor_data INNER JOIN rtd_trains on rtd_sensor_data.TrainKey = rtd_trains.TrainKey  
			INNER JOIN rtd_employees on rtd_trains.TrainKey = rtd_employees.TrainKey where rtd_trains.AdminId='$AdminId' AND rtd_sensor_data.Status!=2 AND (rtd_sensor_data.field3<800 OR rtd_sensor_data.field4>100)";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by recordID  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		$i= 0 ;
        foreach ($result as $row)
        {
            $addr = $this->Get_Address($row['field1'],$row['field2']);
			$result[$i]['address']  = $addr;
			$i = $i + 1 ;
        }
		return array("total"=>$total,"records"=> $result);
	}
	public function common_charts($train_key)
	{
		$this->db->select('*');
		$this->db->from('rtd_sensor_data');
		$this->db->where('TrainKey',$train_key);
		$this->db->order_by('recordID','desc');
		$this->db->limit('10','0');
		return $this->db->get()->result_array();
	}
	
	
	
	/*---------- End of Page ---------- */
	
	
	
	
	public function get_lat_long($address)
	{
		$address = str_replace(" ", "+", $address);

		$json = file_get_contents("http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false");
		$json = json_decode($json);

		$lat = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lat'};
		$long = $json->{'results'}[0]->{'geometry'}->{'location'}->{'lng'};
		return array('lat'=>$lat,'long'=>$long);
	}

}
?>