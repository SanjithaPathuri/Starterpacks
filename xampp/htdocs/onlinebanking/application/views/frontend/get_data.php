<?php
$url=$_SERVER['REQUEST_URI'];
header("Refresh: 5; URL=$url");  // Refresh the webpage every 5 seconds
?>
<html>
<head>
    <title>Sensor Data</title>
</head>
    <body>
        <h1>Sensor readings</h1>
    <table border="0" cellspacing="0" cellpadding="4">
      <tr>
            <td>ID</td>
            <td>Timestamp</td>
            <td>Temperature</td>
			<td>Humidity</td>
			<td>Soil Moisture</td>
      </tr>
      
<?php
    // Connect to database

   // IMPORTANT: If you are using XAMPP you will have to enter your computer IP address here, if you are using webpage enter webpage address (ie. "www.yourwebpage.com")
    $con=mysqli_connect("192.168.0.11","root","","onlinebanking");
       
    // Retrieve all records and display them   
    $result = mysqli_query($con,'SELECT * FROM sensordata ORDER BY id DESC');
      
    // Process every record
    
    while($row = mysqli_fetch_array($result))
    {      
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['time'] . "</td>";
        echo "<td>" . $row['temperature'] . "</td>";
		echo "<td>" . $row['humidity'] . "</td>";
		echo "<td>" . $row['soilmoisture'] . "</td>";
        echo "</tr>";
        
    }
        
    // Close the connection   
    mysqli_close($con);
?>
    </table>
    </body>
</html>