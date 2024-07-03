<html>
<body><center>
<form action="retrievcookie.php" method="get">
<h1>Cookie</h1>
<input type="submit" value="List Cookies" name="btn">
</center>
</body>
</html>
<?php
	setcookie("c1","a");
	setcookie("c2","b");
	setcookie("c3","c");
	setcookie("c4","d");
	setcookie("c5","e");
?>