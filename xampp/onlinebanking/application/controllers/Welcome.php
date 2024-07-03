<?php
defined('BASEPATH') OR exit('No direct script access allowed');
								  
class Welcome extends CI_Controller {

	public function __construct()
	{
		parent::__construct();	
		$this->load->model('Welcome_model');
		error_reporting(E_ERROR | E_PARSE);
	}
	public function index()
	{
		if($this->input->post())
		{
			$result = $this->Welcome_model->Login();
			echo json_encode($result);die;
		}
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/welcome_message');
		$this->load->view('frontend/include/footer');
		
	}
	public function About()
	{
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/About');
		$this->load->view('frontend/include/footer');	
	}
	public function Services()
	{
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/Services');
		$this->load->view('frontend/include/footer');	
	}
	public function APIS()
	{
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/API');
		$this->load->view('frontend/include/footer');	
	}
	public function Contact()
	{
		if($this->input->post())
		{
			$result = $this->Welcome_model->Contact_data();
			echo json_encode($result);die;
		}
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/include/footer');	
	}
	public function Login()
	{
		if($this->input->post())
		{
			$result = $this->Welcome_model->Login();
			echo json_encode($result);die;
		}
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/Login');
		$this->load->view('frontend/include/footer');	
	}
	public function user_register()
	{
		if($this->input->post())
		{
			$result = $this->Welcome_model->user_register();
			echo json_encode($result);die;
		}
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/user_register');
		$this->load->view('frontend/include/footer');	
	}
	
	public function LogOut()
	{
		$this->session->set_userdata('MemberId','');
		$this->session->set_userdata('UserId','');
		$this->session->sess_destroy();
		redirect(base_url());
	}
	public function users_account(){
		
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
			$records = $this->Welcome_model->get_loans_farmers($params);	
			$paginations = $this->Welcome_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}	
		if($this->input->post('Role') == 'applied_loan')
		{
			$res = $this->Welcome_model->applied_loan();
			echo json_encode($res);die;
		}
		$data['users_data'] = $this->Welcome_model->users_account_details();
		$this->load->view('frontend/include/header',$data);
		$this->load->view('frontend/Myaccount');
		$this->load->view('frontend/include/footer');	
	}
	public function Bank_login()
	{
		if($this->input->post())
		{
			$result = $this->Welcome_model->Bank_login();
			echo json_encode($result);die;
		}
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/Bank_login');
		$this->load->view('frontend/include/footer');	
	}
	public function bank_account(){
		
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
			$records = $this->Welcome_model->get_loans_all_farmers($params);	
			$paginations = $this->Welcome_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}
		if($this->input->post('Role') == 'approve')
		{
			$res = $this->Welcome_model->approve();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'reject')
		{
			$res = $this->Welcome_model->reject();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'Suggestion')
		{
			$res = $this->Welcome_model->Suggestion();
			echo json_encode($res);die;
		}
		
		$data['bank_data'] = $this->Welcome_model->bank_data_details();
		$this->load->view('frontend/include/header',$data);
		$this->load->view('frontend/bank_account');
		$this->load->view('frontend/include/footer');	
	}	
	public function re_payment(){
		
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
			$records = $this->Welcome_model->get_loans_all_farmers($params);	
			$paginations = $this->Welcome_model->create_links($records['total'], $length, $page);	
			echo json_encode(array("records"=>$records['records'],"pagination"=>$paginations)); exit;
		}
		if($this->input->post('Role') == 'approve')
		{
			$res = $this->Welcome_model->approve();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'reject')
		{
			$res = $this->Welcome_model->reject();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'close')
		{
			$res = $this->Welcome_model->close();
			echo json_encode($res);die;
		}
		
		if($this->input->post('Role') == 'Suggestion')
		{
			$res = $this->Welcome_model->Suggestion();
			echo json_encode($res);die;
		}
		if($this->input->post('Role') == 'get_suggestion')
		{
			$res = $this->Welcome_model->get_suggestion();
			echo json_encode($res);die;
		}
		
		$data['bank_data'] = $this->Welcome_model->bank_data_details();
		$this->load->view('frontend/include/header',$data);
		$this->load->view('frontend/re_payment');
		$this->load->view('frontend/include/footer');	
	}	
	
	
	
	
	
	
	
	
	
	
	
	
	/*********************************************** end of th epage *************************************/
	
	public function maps()
	{
		if($this->input->post('Role') == 'GET_SENSORS')
		{ 
			$res = $this->Welcome_model->GET_SENSORS();
			
			$html = '';
			$html .= '<div class="col-sm-6" align="center">
					<h1 class="val_field">'.intval($res["field1"]).'  cm</h1>
					<small class="keys">Bin filled distance</small>
				</div>
				<div class="col-sm-6"  align="center" >
					<h1 class="val_field">'.intval($res["field2"]).' g</h1>
					<small class="keys">Bin Weight</small>
				</div>';
			echo $html; die;
			
		}
		if($this->input->post('Role') == 'Update_Status')
		{
			$res1 = $this->Welcome_model->Update_Status();
		}
		
		$data['menu'] = 'Locations';
		$data['kits'] = $this->Welcome_model->Get_Track_Details();
		 //echo "<pre>";print_r($data['kits']);die;
		$this->load->view('frontend/include/header',$data);
		$this->load->view('frontend/maps');
		$this->load->view('frontend/include/footer');
	}
	public function UserVisualization($id)
	{		
		$data['id'] = $id;
		$data['UserKey'] = $this->session->userdata('UserKey');
		$this->load->view('frontend/include/header',$data);
		$this->load->view('frontend/UserVisualization');
		$this->load->view('frontend/include/footer');
		
	}
	public function API_users()
	{
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/API');
		$this->load->view('frontend/include/footer');
		
	}
	
	public function Documentation()
	{
		$this->load->view('frontend/include/header');
		$this->load->view('frontend/Documentation');
		$this->load->view('frontend/include/footer');	
	}
	
	
	
	
	
	
	
	
	public function doctors_request()
	{
		if($this->input->post())
		{
			$result = $this->Welcome_model->doctors_request();
			echo json_encode($result);die;
		}
		$data['users_data'] = $this->Welcome_model->users_account_details();
		$data['doctors_data'] = $this->Welcome_model->doctors_data_details();
		$this->load->view('frontend/include/header',$data);
		$this->load->view('frontend/doctors_request');
		$this->load->view('frontend/include/footer');	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public function Field1($userkey)
	{	
		if($this->input->post())
		{
			$res =  $this->Welcome_model->temp_charts($userkey);
			echo json_encode(array('res'=>$res));die;
		}
		$data['Title'] = 'Distance' ;
		$this->load->view('frontend/charts',$data);
	}
	public function Field2($userkey)
	{	
		if($this->input->post())
		{
			$res =  $this->Welcome_model->temp_charts($userkey);
			echo json_encode(array('res'=>$res));die;
		}
		$data['Title'] = 'Weight' ;
		$this->load->view('frontend/charts2',$data);
	}
	public function Field3($userkey)
	{	
		if($this->input->post())
		{
			$res =  $this->Welcome_model->temp_charts($userkey);
			echo json_encode(array('res'=>$res));die;
		}
		$data['Title'] = 'Latitude' ;
		$this->load->view('frontend/charts3',$data);
	}
	public function Field4($userkey)
	{	
		if($this->input->post())
		{
			$res =  $this->Welcome_model->temp_charts($userkey);
			echo json_encode(array('res'=>$res));die;
		}
		$data['Title'] = 'Longitude' ;
		$this->load->view('frontend/charts4',$data);
	}
	public function Field5($userkey)
	{	
		if($this->input->post())
		{
			$res =  $this->Welcome_model->temp_charts($userkey);
			echo json_encode(array('res'=>$res));die;
		}
		$data['Title'] = 'Field5' ;
		$this->load->view('frontend/charts5',$data);
	}

	
	
	public function hum_charts($userkey)
	{	
		if($this->input->post())
		{
			$res =  $this->Welcome_model->hum_charts($userkey);
			echo json_encode(array('res'=>$res));die;
		}
		$data['Tile'] = 'Average charts for Humidity' ;
		$this->load->view('frontend/charts_hum',$data);
	}
	
	
	
}