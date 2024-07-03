<!DOCTYPE html>
<html>
<body>
<?php
$myfile = fopen("demo.txt", "w") or die("Unable to open  file!");
$txt = "good\n";
fwrite($myfile, $txt);
$txt = "night\n";
fwrite($myfile, $txt);
echo "Text overwritten into file.";
fclose($myfile);
?>
</body>
</html>