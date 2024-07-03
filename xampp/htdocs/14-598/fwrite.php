<!DOCTYPE html>
<html>
<body>
<?php
$myfile = fopen("demo.txt", "a+") or die("Unable to open file!");
$txt = "good\n";
fwrite($myfile, $txt);
$txt = "evening\n";
fwrite($myfile, $txt);
echo "Text written into file.";
fclose($myfile);
?>
</body>
</html>