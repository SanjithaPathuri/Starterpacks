<html>
<body><center><h1><u>List of cookies are:</u></br>
<?php
$c1=$_COOKIE['c1'];
$c2=$_COOKIE['c2'];
$c3=$_COOKIE['c3'];
$c4=$_COOKIE['c4'];
$c5=$_COOKIE['c5'];
echo $c1."<br>";
echo $c2."<br>";
echo $c3."</br>";
echo $c4."</br>";
echo $c5."</br>";
$counter = 0;
foreach($_COOKIE as $value)
{
  if($value)
  {
      ++$counter;
  }
}
echo "cookie count is".$counter;
?></h1>
</center>
</body></html>