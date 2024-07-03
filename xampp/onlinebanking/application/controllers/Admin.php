<?php
defined('BASEPATH') OR exit('No direct script access allowed');
								  
class Admin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Admin_model');
		$this->load->database();
		error_reporting(E_ERROR | E_PARSE);
	}
	public function index()
	{
		if($this->input->post())
		{
			$res = $this->Admin_model->Admin_login_checkUp();
			echo json_encode($res);die;
		}
		$this->load->view('admin/Login');
	}
	public function Logout()
	{
		$this->session->sess_destroy();
		redirect(base_url('Admin'));
	}
	public function AdminDashboard()
	{
		if($this->input->post('Role') == 'trains')
		{
			$res = $this->Admin_model->Get_Trains();
			echo json_encode(array("res"=>$res['res'])); exit;
		}
		$data['menu'] = 'dashboard';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/sidebar');
		$this->load->view('admin/AdminDashboard');
		$this->load->view('admin/includes/footer');
	}
	public function doctors()
	{
		if($this->input->post('Role') == 'Add_Edit')
		{
			$this->Admin_model->Add_Edit_doctors();
			redirect(base_url('admin/doctors'));
		}
		if($this->input->post('Role') == 'Edit')
		{
			$res = $this->Admin_model->Record_doctors();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'Delete')
		{
			$res = $this->Admin_model->Delete_doctors();
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
			$records = $this->Admin_model->Get_Pagination_records_doctors($params);	
			$paginations = $this->Admin_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}
		$data['toolgates'] = $this->Admin_model->get_toll_gates();
		$data['menu'] = 'dashboard';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/sidebar');
		$this->load->view('admin/doctors');
		$this->load->view('admin/includes/footer');
	}
	public function Users()
	{
		if($this->input->post('Role') == 'Add_Edit')
		{
			$this->Admin_model->Add_Edit_Users();
			redirect(base_url('admin/Users'));
		}
		if($this->input->post('Role') == 'Edit')
		{
			$res = $this->Admin_model->Record_Users();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'Delete')
		{    
			$res = $this->Admin_model->Delete_Users();
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
			$records = $this->Admin_model->Get_Pagination_records_Users($params);	
			$paginations = $this->Admin_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}
		$data['toolgates'] = $this->Admin_model->get_toll_gates();
		$data['menu'] = 'dashboard';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/sidebar');
		$this->load->view('admin/Users');
		$this->load->view('admin/includes/footer');
	}
	public function contact()
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
		$this->load->view('admin/sidebar');
		$this->load->view('admin/ManageContacts');
		$this->load->view('admin/includes/footer');
	}
	
	
	
	
	
	
	
	

}
