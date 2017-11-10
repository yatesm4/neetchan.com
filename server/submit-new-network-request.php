<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: upload network from network-create to db
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$name = $_POST['network-name'];
$ip = GetIP();

echo "POST VARS: " . $name . ", " . $ip . ". ";

// insert data into db
$result = mysql_insert('network_reqs', array(
									'ip' 	=> $ip,
									'name'	=> $name
));

if($result){
	echo "network request submit successful.";
} else {
	echo "network request submit failed: " . mysql_error() . " ";
}

mysqli_close($connection);
