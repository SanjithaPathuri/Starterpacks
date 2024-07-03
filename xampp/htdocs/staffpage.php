<?php

include 'dbconnect.php';
$uid = $_POST['uname'];
$pass = $_POST['psw'] ;
echo $uid;
echo $pass;
if(isset($_REQUEST["submit"]))
{
//echo 'sadeswed';
if($_REQUEST["login"]=="teacher")
{
$sql="SELECT * FROM teacher WHERE uname='$uid' AND pwd='$pass' ";
$res = mysqli_query($conn,$sql);
if(!$row=mysqli_fetch_assoc($res))
{
	echo "LOGIN FAILED";
}
else
{
	echo "LOGIN SUCCESSFUL";
	header("Location: teacherhome.php");
}
}

if($_REQUEST["login"]=="admin")
{
$sql="SELECT * FROM admin WHERE uname='$uid' AND pwd='$pass' ";
$res = mysqli_query($conn,$sql);
if(!$row=mysqli_fetch_assoc($res))
{
	echo "LOGIN FAILED";
}
else
{
	echo "LOGIN SUCCESSFUL";
	header("Location: adminhome.php");
}
}
}

?>