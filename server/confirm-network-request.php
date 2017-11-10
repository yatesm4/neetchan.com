<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: confirm network request and create a new network
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$requestID = $_POST['requestID'];

echo "POST VARS: " . $requestID . ". ";

$result = mysql_query("SELECT * FROM `network_reqs` WHERE `requestID` = '{$requestID}'");
$record = mysql_fetch_object($result);

$name = $record->name;
$ip = $record->ip;
$timestamp = $record->timestamp;

// insert data into db
$result = mysql_insert('network_reqs', array(
									'name' => $name,
									'ip'   => $ip,
									'confirmed' => 1
));

if($result){
	echo "submit successful.";

	$new_user = mysql_insert('networks', array(
									'ip' => $ip,
									'name' => $name
	));

	if($new_user){
		echo "network created.";
	} else {
		echo "submit failed: " . mysql_error() . " ";
	}

} else {
	echo "submit failed: " . mysql_error() . " ";
}

mysqli_close($connection);
