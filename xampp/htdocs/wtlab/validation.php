<html>
<body><center>
<?php 
if( (strcmp($_REQUEST['unam'],"")==0)|| (strcmp($_REQUEST['a1'],"")==0))
  {
	  echo "Please Enter all values!!..."; 
  }
  else
  {
	  if($_REQUEST['a1']>18)
	  {
			echo "<h1>WELCOME!!!...</h1><br />";
		  echo $_REQUEST['unam']."<br />you are an authorised user:" ;
	  }
	  else
	  {
		  echo "you are an unauthorised user";
	  }
	 
  }
 ?></center>
 </body>
 </html>