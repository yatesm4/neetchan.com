<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: confirm new user request and create a new user
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$requestID = $_POST['requestID'];

echo "POST VARS: " . $requestID . ". ";

$result = mysql_query("SELECT * FROM `new_user_reqs` WHERE `requestID` = '{$requestID}'");
$record = mysql_fetch_object($result);

$name = $record->name;
$ip = $record->ip;
$role = $record->role;
$timestamp = $record->timestamp;

// insert data into db
$result = mysql_insert('new_user_reqs', array(
									'name' => $name,
									'ip'   => $ip,
									'role' => $role,
									'confirmed' => 1
));

if($result){
	echo "submit successful.";
	
	$new_user = mysql_insert('users', array(
									'ip' => $ip,
									'name' => $name,
									'role' => $role
	));
	
	if($new_user){
		echo "new user created.";
	} else {
		echo "submit failed: " . mysql_error() . " ";
	}
	
} else {
	echo "submit failed: " . mysql_error() . " ";
}

mysqli_close($connection);