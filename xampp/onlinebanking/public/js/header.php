<?php  //print_r($_SESSION); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Smart Bridge</title>
    <!-- Bootstrap -->
    <link href="<?php echo base_url(); ?>css/bootstrap.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>css/stylesheet.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>css/animations.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>css/stylesheet-responsive.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>font-awesome-4.5.0/css/font-awesome.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>fonts/candara-regular/Candara-Regular.css" rel="stylesheet">
	<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Owl Carousel Assets -->
    <link href="<?php echo base_url(); ?>css/owl.carousel.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>css/owl.theme.css" rel="stylesheet">
  </head>
  <body>
    <div class="headerwrps">
    <div class="header-top">
    <div class="hdtop-bgright">
    </div>
    	<div class="container animatedParent">
     	<ul class="nav nav-pills pull-left">
      	<li><a href="index.php"><i class="fa fa-home"></i></a></li>
      	<li><a href="#">About Us</a></li>
      	<li><a href="#">Blog</a></li>
      	<li><a href="#">Contact</a></li>
      </ul>
      <ul class="top-userwps nav nav-pills pull-right">
      	<?php 
		if(isset($_SESSION['UserId']) && $_SESSION['UserId'] != ''){ ?>
			<li><a href="<?php echo base_url(); ?>Logout/index"><i class="fa fa-sign-in"></i> Logout </a></li>
		<?php }else{ ?>
			<li><a href="#" data-toggle="modal" data-target="#myloginpop"><i class="fa fa-sign-in"></i> Login </a></li>
		<?php
		}?>
      	<li class="topregs"><a href="#"><i class="fa fa-user-plus"></i> Register</a>
			<div class="topregs-subbox animated fadeInDown">
            	<a href="<?php echo base_url('Student/Registration')?>" class="btn btn-primary btn-blue"><i class="fa fa-angle-right"></i> Register as Student</a>
            	<a href="<?php echo base_url('College/Registration')?>" class="btn btn-primary btn-red"><i class="fa fa-angle-right"></i> Register as College</a>
            	<a href="<?php echo base_url('Company/Registration')?>" class="btn btn-primary btn-lightgreeen"><i class="fa fa-angle-right"></i> Register as Company</a>
            	<a href="#" class="btn btn-primary btn-yellow"><i class="fa fa-angle-right"></i> Register as Mentor</a>
            </div>        	
        </li>
      </ul>
	<!--login-starts -->
	<div class="modal fade" id="myloginpop" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog modal-lg animated zoomIn" role="document">
	<div class="modal-content loginpopbox">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Create your SmartBridge Account </h4>
		</div>
		
        <form name="loginform" id="loginform" method="post" onSubmit="return false;">
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        	<h5 class="loginhdrtitle">Login</h5>
                            <div class="form-group">
                                <input type="text" class="form-control" id="UserName" name="Email" placeholder="Email Id">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="Password" name="Password" placeholder="Password">
                            </div>
                            <div class="checkbox">
                                <label class="login-radiobox">
                                    <input type="radio" name="UserType" id="usertype1" value="1" checked > Student</label>
                                <label class="login-radiobox">
                                    <input type="radio" name="UserType" id="usertype2" value="2" > College</label>
                                <label class="login-radiobox">
                                    <input type="radio" name="UserType" id="usertype3" value="3" > Company</label>
                                <label class="login-radiobox">
                                    <input type="radio" name="UserType" id="usertype4" value="4" > Mentor</label>
                            </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    	<div class="logindontbx">
                        	<h5>Don't have an account</h5>
                                <div class="logindontbx-reg">
                                	<ul>
                                    	<li><a href="student-registration.php" class="btn btn-primary btn-blue"><i class="fa fa-angle-right"></i> Register as Student</a></li>
                                    	<li><a href="college-registration.php" class="btn btn-primary btn-red"><i class="fa fa-angle-right"></i> Register as College</a></li>
                                    	<li><a href="company-registration.php" class="btn btn-primary btn-lightgreeen"><i class="fa fa-angle-right"></i> Register as Company</a></li>
                                    	<li><a href="#" class="btn btn-primary btn-yellow"><i class="fa fa-angle-right"></i> Register as Mentor</a></li>
                                    </ul>
                                </div>        	
                        </div>
                    </div>
                </div>
            </div>
			<div class="modal-footer">
            	<div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <p class="forgottxt"><a href="#" data-toggle="modal" data-target="#myforgotch">Forgot Password?</a></p>
                    </div>            
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <button type="submit" class="btn btn-info loginbtn" onclick="return setlogin()"><i class="fa fa-lock fa-right"></i> Login</button>
                    </div>            
				</div>        
			</div>        
		</form>

	</div>
	</div>
	</div>      
	<!--login-ends -->  
	<!--forgot-starts -->
	<div class="modal fade" id="myforgotch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog modal-sm animated zoomIn" role="document">
	<div class="modal-content loginpopbox">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Forgot Password</h4>
		</div>
		
        <form>
            <div class="modal-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="form-group">
                        		<label class="control-label">Email Id</label>
                                <input type="text" class="form-control" id="" placeholder="Email Id">
                            </div>
                            <div class="form-group">
                        		<label class="control-label">Mobile Number</label>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="row">
                                    <input type="text" class="registr-inputtxt col-xs-2 col-sm-2 col-md-2 col-lg-2 forgot-cntyfnt" id="" value="+91">
                                    <input type="text" class="registr-inputtxt col-xs-10 col-sm-10 col-md-10 col-lg-10 forgot-phnfnt" id="" placeholder="Mobile Number">
                                </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
			<div class="modal-footer">
                   <button type="submit" class="btn btn-info loginbtn"><i class="fa fa-lock fa-right"></i> Submit</button>
			</div>        
		</form>

	</div>
	</div>
	</div>      
	<!--login-ends -->
     </div>
    </div>
    <div class="navbar-wrps">
    	<nav class="navbar navbar-default">
  <div class="container animatedParent">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.php"><img src="<?php echo base_url(); ?>images/logo.png" class="img-responsive"/></a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
        <li class="active"><a href="#">Students</a></li>
        <li><a href="#">Colleges</a></li>
        <li><a href="#">Companies</a></li>
        <li><a href="#">Mentors</a></li>
        <li class="dropdown">
        	<a aria-expanded="false" aria-haspopup="true" role="button" data-hover="dropdown" data-toggle="dropdown" class="dropdown-toggle" href="#">Media <span class="caret"></span></a>
        	<ul class="dropdown-menu">
            	<li><a href="#">Events</a></li>
            
            </ul>
        </li>
        <li class="dropdown searchwrps-mnbr">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-search"></i></a>
          <div class="dropdown-menu">
          	<form class="navbar-form navbar-right" role="search">
             <div class="form-group">
               <input type="text" class="form-control" placeholder="Search">
               <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
             </div>
             
           </form>
          </div>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
    </div>
    
    </div>