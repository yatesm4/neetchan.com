<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get my project data from db
//-------------------------------------
include('connection.php');

$userid = $_POST['userid'];

$result = mysql_query("SELECT * FROM `projects` WHERE `userID` = '{$userid}' ORDER BY `timestamp` DESC");

while($row = mysql_fetch_assoc($result)){

	// for each result in the db

	$group = $row['groupID'];
	switch($group){
		case '1':
			$group = "Website";
			break;
		case '2':
			$group = "Mobile Application";
			break;
		case '3':
			$group = "Software";
			break;
		case '4':
			$group = "Graphics/Design";
			break;
		case '5':
			$group = "Testing";
			break;
		case '6':
			$group = "Administration";
			break;
		case '7':
			$group = "Clerical";
			break;
		case '8':
			$group = "General Tasks";
			break;
		default:
			$group = "N/A";
			break;
	}

	// get task count for project

	$id = $row['id'];

	$taskCount = 0;

	$query = mysql_query("SELECT * FROM `tasks` WHERE `projectID` = '{$id}'");

	while($element = mysql_fetch_assoc($query)){

		// count up all the found task records
		$taskCount++;

	}

	// get user info for project

	$userID = $row['userID'];
	$query = mysql_query("SELECT * FROM `users` WHERE `id` = '{$userID}'");
	$user = mysql_fetch_object($query);
	$username = $user->name;

	// get time info for project

	$query = mysql_query("SELECT * FROM `project_meta` WHERE `projectID` = '{$id}'");

	$time = mysql_fetch_object($query);

	$start = $time->startDate;
	$end = $time->endDate;



	echo $row['name'] . ":" . $row['key'] . ":" . $row['description'] . ":" . $group . ":" . $taskCount . ":" . $start . ":" . $end . ":" . $row['timestamp'] . ":" . $username ;

	echo '|';

}

if(!$result) {
	echo "could not query db->projects: " . mysql_error() . " ";
} else {
	// result found
}

mysqli_close($connection);
