<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get project data from db
//-------------------------------------
include('connection.php');

$group = $_POST['group'];

$result = mysql_query("SELECT * FROM `users` WHERE `role` = '{$group}'");

while($row = mysql_fetch_assoc($result)){
	
	// for each result in the db
	
	echo $row['id'] . ":" . $row['name'] . ":" . $row['role'];
	
	echo '|';
	
}

if(!$result) {
	echo "could not query db->users: " . mysql_error() . " ";
} else {
	// result found
}

mysqli_close($connection);