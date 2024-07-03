<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH.'models/Common_model.php');
class Superadmin_model extends Common_model {
	
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
		$this->db->from('wastemanagement_super_admin');
		$this->db->where('Email',$email);
		$this->db->where('Password',$password);
		$result = $this->db->get()->result_array();
		if(count($result) == 1)
		{
			$this->session->set_userdata('SuperAdmin',$result['0']['SuperAdmin_ID']);
			$this->session->set_userdata('Email',$result['0']['Email']);
			return array('err'=>'1','msg'=>'Redirecting ....');
		}
		else
		{
			return array('err'=>'0','msg'=>'Invalid Credentails');
		}
	}
	
	public function Get_Pagination_records_Manageadmins($params)
	{
		extract($params);
		$lstart = (intval($page)-1)*$length;
		$lend = $length;
		$sql = "select * from wastemanagement_admin ";
		if($skey != '')
				$sql .= " where (Name LIKE '%$skey%' or Email LIKE '%$skey%' ) ";
		$tot = $this->db->query($sql);
		$total = $tot->num_rows();
		$sql.= " order by AdminId  DESC LIMIT $lstart, $lend";
		$result = $this->db->query($sql)->result_array();
		return array("total"=>$total,"records"=> $result);
	}
	public function Add_Edit_Manageadmins()
	{
		$AdminId = trim($this->input->post('AdminId'));
		$FullName = trim($this->input->post('AdminName'));
		$Email = trim($this->input->post('AdminEmail'));
		$Password = trim($this->input->post('AdminPassword'));
		$Location = trim($this->input->post('Location'));
		if($AdminId == '')
		{
			$data['Name'] = $FullName ; 
			$data['Email'] = $Email ; 
			$data['Password'] = $Password; 
			$data['Location'] = $Location ; 
			$data['CreatedOn'] = date('Y-m-d h:i:s'); 
			$this->db->insert('wastemanagement_admin',$data);
			return array('err'=>'1','Successfully added new admin');
		}
		else
		{
			$data['Name'] = $FullName ; 
			$data['Email'] = $Email ;
			$data['Location'] = $Location ; 
			$this->db->where('AdminId',$AdminId);
			$this->db->update('wastemanagement_admin',$data);
			return array('err'=>'1','Successfully updated a admin');
		}
	}
	public function Record_Manageadmins()
	{
		$recordId = $this->input->post('recordId');
		$this->db->select('*');
		$this->db->from('wastemanagement_admin');
		$this->db->where('AdminId',$recordId);
		return $this->db->get()->row_array();
	}
	public function Delete_Manageadmins()
	{
		$recordId = $this->input->post('recordId');
		
		$this->db->where('AdminId',$recordId);
		$this->db->delete('wastemanagement_admin');
		return array('msg'=>'Deleted Successfully');
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// **********************************  end  of th epage ***********************************
	
	
	
	
}
?>