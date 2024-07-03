<html>
<body>
<form >
<center>
<h1>THANK YOU</h1>
<?php
	date_default_timezone_set("Asia/kolkata");
	$d2=date('m/d/y h:i:s a',time());
	echo "<br />".$_COOKIE['u1']."<br />";
	echo "your login time is ";
	$dt=$_COOKIE['d1'];
	echo $_COOKIE['d1'];
	echo "<br />your logout time is ".$d2;
	$dt1=date_create($dt);
	$dt2=date_create($d2);
	$dd=date_diff($dt1,$dt2);
	echo "<br />your login session is :";
	echo $dd->format('%h hours, %i mins ,%s seconds');
?>
</center>
</form>
</body>
</html>
