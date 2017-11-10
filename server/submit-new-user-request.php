<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: upload user from user-create to db
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$name = $_POST['user-name'];
$role = $_POST['user-role']; 
$ip = GetIP();

echo "POST VARS: " . $name . ", " . $role . ", " . $ip . ". ";

// insert data into db
$result = mysql_insert('new_user_reqs', array(
									'name' 	=> $name,
									'ip'	=> $ip,
									'role' 	=> $role
));

if($result){
	echo "new user request submit successful.";
} else {
	echo "new user request submit failed: " . mysql_error() . " ";
}

mysqli_close($connection);