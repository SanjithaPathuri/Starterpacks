<!DOCTYPE html>
<html>
<title>FINAL ADMIN HOME</title>
<style>
form {
    border: 3px solid #f1f1f1;
}

input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}

.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}

.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}

.container {
    padding: 16px;
}

span.psw {
    float: right;
    padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}
</style>
<body>

<center><img src="http://learning-curve-foundation.org/wp-content/uploads/2016/01/Learinng-curve-web.png" width = "300" height = "200">
<br><br><br>

	<a href="DataVisualization.php">Click here to view the assessment</a>
	<br><br>
	
	<a href="ClassRoomAssesment.html">Click here to enter the assessment</a>
	</center>
	<?php
	if(isset($_REQUEST["button1"]))
		header("location:childassess.php");
	if(isset($_REQUEST["button2"]))
		header("location:ClassRoomAssesment.html");
	?>
	<a href="logintest.html">Logout</a>
</body>
</html>









































<!--<html>
<head>
	<title>Admin home page</title>
</head>

<body>
	<form name="view" value="" action="" method="post">
		<input name="button1" type="button" value="child assessment">
		<input name="button2" type="button" value="classroom assessment">
	</form>
	<a href="ClassRoomAssesment.html">CLick here to enter the assessment
</html>-->