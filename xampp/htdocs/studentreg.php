<html>
<head><title>Student Registration</title>

<script type="text/javascript">

/*function validateForm()
{
	var a=document.entrydetails.id.value;
	var b=document.entrydetails.name.value;
	var c=document.entrydetails.gender.value;
	var d=document.entrydetails.age.value;
	var e=document.entrydetails.status.value;
	var f=document.entrydetails.familytype.value;
	var g=document.entrydetails.siblings.value;
	var h=document.entrydetails.birthorder.value;
	var i=document.entrydetails.educationlevel.value;
	var j=document.entrydetails.income.value;

	if(a=="")
		alert("Enter id");
	if(b=="")
		alert("Enter name");
	if(c=="")
		alert("Enter gender");
	if(d=="")
		alert("Enter age");
	if(e=="")
		alert("Enter status");
	if(f=="")
		alert("Enter familytype");
	if(g=="")
		alert("Enter siblings");
	if(h=="")
		alert("Enter birthorder");
	if(i=="")
		alert("Enter educationlevel");
	if(j=="")
		alert("Enter income");

	
}*/
</script>
</head>
<body>
	<h>Enter student credentials</h>
	<form name="entrydetails" action="studentreg.php" method="post" onsubmit="validateForm()">
	Enter student ID <input type="text" name="id" value=""/><br>
	Enter student name <input type="text" name="name" value=""/><br>
	Enter gender: <input type="radio" name="gender" value="male">Male<input type="radio" name="gender" value="female">Female<br>
	Enter age <input type="text" name="age" value=""/><br>
	Enter parental status <input type="text" name="status" value=""/><br>
	Enter family type <input type="text" name="familytype" value=""/><br>
	Enter no. of siblings <input type="text" name="siblings" value=""/><br>
	Enter section<input type="text" name="section" value=""><br>
	Enter order of birth <input type="text" name="birthorder" value=""/><br>
	Enter parent education level<input type="text" name="educationlevel" value=""/><br>
	Enter family income <input type="text" name="income" value=""/><br>
	<input type="submit" name="submit" value="submit">
</form>
<?php
if(isset($_REQUEST["submit"]))
{
$id=$_REQUEST["id"];
$name=$_REQUEST["name"];
$gender=$_REQUEST["gender"];
$age=$_REQUEST["age"];
$status=$_REQUEST["status"];
$familytype=$_REQUEST["familytype"];
$siblings=$_REQUEST["siblings"];
$birthorder=$_REQUEST["birthorder"];
$educationlevel=$_REQUEST["educationlevel"];
$familyincome=$_REQUEST["income"];
$section=$_REQUEST["section"];
echo($id);
$conn=new mysqli("localhost","root","","bookings");
echo("after selection");
$q2= "CREATE TABLE if not exists studentreg(id varchar(20) primary key,name varchar(30),gender varchar(1),age varchar(2),status varchar(20),familytype varchar(20),siblings varchar(3),birthorder varchar(3),educationlevel varchar(20),familyincome varchar(20),section varchar(2))";
$result=$conn->query($q2);
echo($id);
$q1="INSERT into studentreg values('".$id."','".$name."','".$gender."','".$age."','".$status."','".$familytype."','".$siblings."','".$birthorder."','".$educationlevel."','".$familyincome."','".$section."')";

$result=$conn->query($q1);
echo($id);

//echo("entries made");
}
?>
</body>
</html>



