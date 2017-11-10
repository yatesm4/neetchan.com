<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get project data from db
//-------------------------------------
include('connection.php');

$key = $_POST['key'];

$result = mysql_query("SELECT * FROM `projects` WHERE `key` = '{$key}'");

if(!$result) {
	echo "could not query db->projects: " . mysql_error() . " ";
	exit;
} else {
	// if result is found
	$record = mysql_fetch_object($result);
	if(!$record){
		echo "could not read db->results for key: " . $key;
		exit;
	} else {
		// record found
		
		$id = $record->id;
		$name = $record->name;
		$key = $record->key;
		$desc = $record->description;
		$group = $record->groupID;
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
		$timestamp = $record->timestamp;
		$userID = $record->userID;
		
		$taskCount = 0;
		$taskTime = 0.0;
		
		// grab tasks for record
		$query = mysql_query("SELECT * FROM `tasks` WHERE `projectID` = '{$id}'");
		while($element = mysql_fetch_assoc($query)){
			// count up all the found task records
			$taskCount++;
			$taskID = $element['id'];
			// grab individual task info
			$task_time = mysql_query("SELECT * FROM `task_time` WHERE `taskID` = '{$taskID}'");
			$task_time_data = mysql_fetch_object($task_time);
			// add task total time to project task time
			$taskTime += $task_time_data->totalTime;
		}
		
		// grab project time
		$query = mysql_query("SELECT * FROM `project_meta` WHERE `projectID` = '{$id}'");
		$meta = mysql_fetch_object($query);
		$start = $meta->startDate;
		$end = $meta->endDate;
		
		$startDate = strtotime($start);
		$endDate = strtotime($end);
		$today = strtotime("now");
	
		$timeLeft = abs(($startDate - $endDate) / 86400);
		
		// get username of creator
		$query = mysql_query("SELECT * FROM `users` WHERE `id` = '{$userID}'");
		$user = mysql_fetch_object($query);
		$userName = $user->name;
		
		if($startDate >  $today){
			// project hasn't started
			// count days left
			
			$daysLeftTillStart = abs(($today - $startDate) / 86400);
			
			echo $id . "|" . $name . "|" . $key . "|" . $desc . "|" . $group . "|" . $timestamp . "|" . $userName . "|" . $taskCount . "|" . $start . "|" . $end . "|" . $timeLeft . "|" . $taskTime . "|" . ceil($daysLeftTillStart);
		} else {
			// project has started
			echo $id . "|" . $name . "|" . $key . "|" . $desc . "|" . $group . "|" . $timestamp . "|" . $userName . "|" . $taskCount . "|" . $start . "|" . $end . "|" . $timeLeft . "|" . $taskTime;
		}
	}
}

mysqli_close($connection);