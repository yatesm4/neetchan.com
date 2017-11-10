<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get role data from db
//-------------------------------------
include('connection.php');


$result = mysql_query('SELECT * FROM roles');

while($row = mysql_fetch_assoc($result)){
	
	// for each result in the db
	
	echo $row['id'] . ":" . $row['label'];
	
	echo '|';
	
}

if(!$result) {
	echo "could not query db->roles: " . mysql_error() . " ";
} else {
	// result found
}

mysqli_close($connection);