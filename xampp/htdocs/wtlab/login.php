<html>
<body>
<form action="logout.php" method="post">
<p align="right">
<input type="submit" name="s2" value="LOGOUT"></p>
<center>
<?php
	$name=$_REQUEST["uname"];
	echo "<h1>Hello!!!...<h1>".$name;
	date_default_timezone_set("Asia/kolkata");
	$d1=date('m/d/y h:i:s a',time());
	echo "<br />your login time is :<br />".$d1;
	setcookie("u1",$name);
	setcookie("d1",$d1);
?></center>
</body>
</html>
