<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get project groups data from db
//-------------------------------------
include('connection.php');


$result = mysql_query('SELECT * FROM project_groups');

while($row = mysql_fetch_assoc($result)){
	
	// for each result in the db
	
	echo $row['id'] . ":" . $row['name'];
	
	echo '|';
	
}

if(!$result) {
	echo "could not query db->project_groups: " . mysql_error() . " ";
} else {
	// result found
}

mysqli_close($connection);