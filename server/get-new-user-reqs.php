<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get new user req data from db
//-------------------------------------
include('connection.php');


$result = mysql_query('	SELECT *
						FROM new_user_reqs AS nur
						WHERE NOT EXISTS (
							SELECT *
							FROM new_user_reqs as nur2
							WHERE nur.ip = nur2.ip AND nur2.confirmed = 1
							)');

while($row = mysql_fetch_assoc($result)){
	
	// for each result in the db
	
	echo $row['requestID'] . ":" . $row['name'] . ":" . $row['ip'] . ":" . $row['role'] . ":" . $row['confirmed'] . ":" . $row['timestamp'];
	
	echo '|';
	
}

if(!$result) {
	echo "could not query db->users: " . mysql_error() . " ";
} else {
	// result found
}

mysqli_close($connection);