<html>
<body>
<html>
<head>
<title>Calculator</title>
</head>
<body style="background-color:pink;border:1">
<h2>
<form method="POST" action="calculator.php">
enter number 1:<input type="text" name="t1"/>
<br>
enter number 2:<input type="text" name="t2"/>
<br>
operator:<select name="operator">
<option value="">--select--</option>
<option value="+">add</option>
<option value="-">sub</option>
<option value="*">mul</option>
<option value="/">div</option>
</select>
<br>
<input type="submit" name="calculate" value="calculate"/>
</form>
</h2>
result:
<?php 
	$res=0;
	if(isset($_REQUEST["calculate"])){
	$val1=$_REQUEST["t1"];
	$val2=$_REQUEST["t2"];
	$op=$_REQUEST["operator"];
	
	if($op=="+")
	{
		$res=$val1+$val2;
		echo("<h1>$val1+$val2=$res</h1>");
	}
	if($op=="-")
        {
                $res=$val1-$val2;
                echo("<h1>$val1-$val2=$res</h1>");
        }
	if($op=="*")
        {
                $res=$val1*$val2;
                echo("<h1>$val1*$val2=$res</h1>");
        }
	if($op=="/")
        {
                $res=$val1/$val2;
                echo("<h1>$val1/$val2=$res</h1>");
        }
	if($op=="")
	{
		echo("<h1>please select a operator</h1>");
	}
}
?>


</body>
</html>

