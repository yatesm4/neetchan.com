<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get task data from db
//-------------------------------------
include('connection.php');

// input model: id 0 | name 1 | taskKey 2 | projectID 3 | username 4 | desc 5 | timestamp 6 | lastModified 7 | type 8 | priority 9 | status 10 | start 11 | end 12 | estimated time 13 | total time 14 | userID of last time update 15 | days until start/end 16

$id = $_POST['id'];

$result = mysql_query("SELECT * FROM `tasks` WHERE `id` = '{$id}'");

if(!$result) {
	echo "could not query db->tasks: " . mysql_error() . " ";
	exit;
} else {
	// if result is found
	$record = mysql_fetch_object($result);
	
	if(!$record){
		echo "could not read db->results for task id: " . $id;
		exit;
	} else {
		// task found
		
		$key = $record->taskKey;
		$projectID = $record->projectID;
		
		$userID = $record->userID;
		// grab user name from user id
		$queryUsers = mysql_query("SELECT * FROM `users` WHERE `id` = '{$userID}'");
		$user = mysql_fetch_object($queryUsers);
		$username = $user->name;
		
		$timestamp = $record->timestamp;
		
		// grab meta updates for task
		$query = mysql_query("SELECT * FROM `task_meta` WHERE `taskID` = '{$id}' ORDER BY `timestamp` DESC");
		$updates = array();
		
		while($element = mysql_fetch_assoc($query)){
			$update = array();
			// count up all the found task meta updates
			
			$metaID = $element['metaID'];
			$name = $element['name'];
			$desc = $element['description'];
			$type = $element['type'];
			$priority = $element['priority'];
			$status = $element['status'];
			$updateTimestamp = $element['timestamp'];
			$updateUser = $element['userID'];
			
			// grab user name of whom which created the update
			$por_que = mysql_query("SELECT * FROM `users` WHERE `id` = '{$updateUser}'");
			$por_queData = mysql_fetch_object($por_que);
			// add task total time to project task time
			$updateUser += $por_queData->name;
			
			array_push($update, $metaID, $updateTimestamp, $updateUser);
			array_push($updates, $update);
		}
		
		// grab project time
		$query = mysql_query("SELECT * FROM `task_time` WHERE `taskID` = '{$id}' ORDER BY `timestamp` DESC LIMIT 1");
		$time_meta = mysql_fetch_object($query);
		$start = $time_meta->startTime;
		$end = $time_meta->endTime;
		$estimatedTime = $time_meta->totalTime;
		$lastTimeEditor = $time_meta->userID;
		$totalTime = 0.0;
		
		$queryLogs = mysql_query("	SELECT *
								FROM `task_logs`
								LEFT JOIN `task_log_meta` ON `task_logs`.id = `task_log_meta`.logID
								WHERE `task_logs`.taskID = '{$id}'
		");
		
		$logs = array();
		
		while($element = mysql_fetch_assoc($queryLogs)){
			// go through each log for this task
			$log = array();
			$logID = $element['id'];
			$logUserID = $element['userID'];
			$logTimestamp = $element['timestamp'];
			$logDescription = $element['description'];
			$logHours = $element['hours'];
			$totalTime += $logHours;
			array_push($log, $logID, $logUserID, $logTimestamp, $logDescription, $logHours);
			array_push($logs, $log);
		}
		
		$startDate = strtotime($start);
		$endDate = strtotime($end);
		$today = strtotime("now");
	
		$daysEstimated = abs(($startDate - $endDate) / 86400);
		
		// mru -> most recent update in task_meta table
		$mru = $updates[0];
		$updateID = $mru[0];
		$updateTimestamp = $mru[1];
		
		
		// NOT RETURNING
		//
		// Created, Created By, Last Modified, Status (is returning numbers)
		// task start and end, and hours estimated and total hours
		
		if($startDate >  $today){
			// project hasn't started
			// count days left
			
			$daysLeftTillStart = abs(($today - $startDate) / 86400);
			
			echo $id . "|" . $name . "|" . $key . "|" . $projectID . "|" . $username . "|" . $desc . "|" . $timestamp . "|" . $updateTimestamp . "|" . $type . "|" . $priority . "|" . $status . "|" . $start . "|" . $end . "|" . $estimatedTime . "|" . $totalTime . "|" . $lastTimeEditor . "|" . ceil($daysLeftTillStart) . "|" . ceil($daysEstimated) . "|" . "no";
		} else {
			// project has started
			
			$daysLeftTillEnd = abs(($endDate - $today) / 86400);
			
			echo $id . "|" . $name . "|" . $key . "|" . $projectID . "|" . $username . "|" . $desc . "|" . $timestamp . "|" . $updateTimestamp . "|" . $type . "|" . $priority . "|" . $status . "|" . $start . "|" . $end . "|" . $estimatedTime . "|" . $totalTime . "|" . $lastTimeEditor . "|" . ceil($daysLeftTillEnd) . "|" . ceil($daysEstimated) . "|" . "yes";
		}
	}
}

mysqli_close($connection);