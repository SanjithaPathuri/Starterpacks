<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Superadmin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Superadmin_model');
		$this->load->database();
	}
	public function index()
	{
		if($this->input->post())
		{
			$res = $this->Superadmin_model->Admin_login_checkUp();
			echo json_encode($res);die;
		}
		$this->load->view('superadmin/Login');
	}
	public function Logout()
	{
		$this->session->sess_destroy();
		redirect(base_url('Superadmin'));
	}
	public function AdminDashboard()
	{
		if($this->input->post('Role') == 'Add_Edit')
		{
			$this->Superadmin_model->Add_Edit_Manageadmins();
			redirect(base_url('Superadmin/AdminDashboard'));
		}
		if($this->input->post('Role') == 'Edit')
		{
			$res = $this->Superadmin_model->Record_Manageadmins();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'Delete')
		{
			$res = $this->Superadmin_model->Delete_Manageadmins();
			echo json_encode($res);die;
		}
		
		if($this->input->post('Role') == 'records')
		{
			$page = '';
			$length = 10 ;
			$skey = '';
			if($this->input->post('page'))
				$page = $this->input->post('page');
			if($this->input->post('skey'))
				$skey = $this->input->post('skey');
			
			$params['page'] = $page ; 
			$params['length'] = $length ; 
			$params['skey'] = $skey ; 
			$records = $this->Superadmin_model->Get_Pagination_records_Manageadmins($params);	
			$paginations = $this->Superadmin_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}		
		$data['menu'] = 'ManageAdmins';
		$this->load->view('Superadmin/includes/header',$data);
		$this->load->view('Superadmin/AdminDashboard');
		$this->load->view('Superadmin/includes/footer');
	}
	
	
	
	
	
	// *************************************************** end of the project *************************************************
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public function ManageAreas()
	{
		if($this->input->post('Role') == 'Add_Edit')
		{
			$this->Admin_model->Add_Edit_ManageAreas();
			redirect(base_url('Admin/ManageAreas'));
		}
		if($this->input->post('Role') == 'Edit')
		{
			$res = $this->Admin_model->Record_ManageAreas();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'Delete')
		{
			$res = $this->Admin_model->Delete_ManageAreas();
			echo json_encode($res);die;
		}
		
		if($this->input->post('Role') == 'records')
		{
			$page = '';
			$length = 10 ;
			$skey = '';
			if($this->input->post('page'))
				$page = $this->input->post('page');
			if($this->input->post('skey'))
				$skey = $this->input->post('skey');
			
			$params['page'] = $page ; 
			$params['length'] = $length ; 
			$params['skey'] = $skey ; 
			$records = $this->Admin_model->Get_Pagination_records_ManageAreas($params);	
			$paginations = $this->Admin_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}		
		$data['menu'] = 'ManageAreas';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/ManageAreas');
		$this->load->view('admin/includes/footer');
	}
	
	public function ManageContacts()
	{
		if($this->input->post('Role') == 'records')
		{
			$page = '';
			$length = 10 ;
			$skey = '';
			if($this->input->post('page'))
				$page = $this->input->post('page');
			if($this->input->post('skey'))
				$skey = $this->input->post('skey');
			
			$params['page'] = $page ; 
			$params['length'] = $length ; 
			$params['skey'] = $skey ; 
			$records = $this->Admin_model->Get_Pagination_records_Contacts($params);	
			$paginations = $this->Admin_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}	
		if($this->input->post('Role') == 'Get_View')	
		{
			$res = $this->Admin_model->Get_View_contact();
			echo json_encode($res);die;
		}
		$data['menu'] = 'ManageContacts';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/ManageContacts');
		$this->load->view('admin/includes/footer');
	}
	public function ManageMainTanker()
	{
		$data['menu'] = 'ManageMainTanker';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/ManageMainTanker');
		$this->load->view('admin/includes/footer');
	}
	public function ManageSubWall()
	{
		$data['menu'] = 'ManageSubWall';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/ManageSubWall');
		$this->load->view('admin/includes/footer');
	}
	public function ManageTankerLevel()
	{
		$data['menu'] = 'ManageTankerLevel';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/ManageTankerLevel');
		$this->load->view('admin/includes/footer');
	}
	public function ManageWaterQuality()
	{
		$data['menu'] = 'ManageWaterQuality';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/ManageWaterQuality');
		$this->load->view('admin/includes/footer');
	}
	
}
