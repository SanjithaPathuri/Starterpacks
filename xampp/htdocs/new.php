<html>
<form action="" method="post">
    <label for='uploaded_file'><b>Select A File To Upload:</b></label>
    <input type="file" name="uploadedfile">
	<input type="submit" value="submit">
</form>
<?php
if(isset($_REQUEST["submit"]))
{
$file=$_REQUEST["uploadedfile"];
$conn=mysql_connect("localhost","root") or die("could not connect".mysql_error());
$a=mysql_select_db("lc",$conn) or die("could not select database".mysql_error());
$q2="LOAD DATA INFILE 'book1.csv' INTO TABLE abc;";
mysql_query($q2);
//echo("entries made");
}
?>
</html>