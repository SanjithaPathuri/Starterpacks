<!DOCTYPE html>
<html>
<body>
<?php
$myfile = fopen("demo.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("demo.txt"));
fclose($myfile);
?>
</body>
</html>