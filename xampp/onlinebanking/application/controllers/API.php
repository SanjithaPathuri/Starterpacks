<?php
defined('BASEPATH') OR exit('No direct script access allowed');
								  
class API extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('API_model');
		header('Access-Control-Allow-Origin:*');
		error_reporting(E_ERROR | E_PARSE);
	}
	public function index()
	{
		redirect(base_url());
	}
	public function transcations()
	{
		$res =  $this->API_model->transcations();
		echo json_encode($res) ;die ;
	}
	
	
	
	
	
	
	
	// ***************************** end of the page ****************************
	public function logins()
	{
		$res =  $this->API_model->api_logins();
		echo $res ;die ;
	}
	
	public function get_talkback()
	{
		$res =  $this->API_model->get_talkback();
		echo $res ;die ;
	}
	
	public function get_values()
	{
		$res =  $this->API_model->get_values();
		echo json_encode($res) ;die ;
	}
	
	
}