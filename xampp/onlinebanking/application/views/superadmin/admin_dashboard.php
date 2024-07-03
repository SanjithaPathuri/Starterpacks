<?php
defined('BASEPATH') OR exit('No direct script access allowed');

									/************** Developer     : Nagarjuna Madluri ********************/
								   /************* Site Name      : Smart PoultryForm *********************/
								  /************* Date - Started : 10th Sep 2016 ********************/
								  
class Admin extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Welcome_model');
		$this->load->database();
	}
	public function index()
	{
		$data['menu'] = 'dashboard';
		$this->load->view('admin/includes/header',$data);
		$this->load->view('admin/AdminDashboard');
		$this->load->view('admin/includes/footer');
	}
	
}
