<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get project task data from db
//-------------------------------------
include('connection.php');

$projectID = $_POST['key'];

// get projectID from projects table based off project key

$result = mysql_query("SELECT * FROM `projects` WHERE `key` = '{$projectID}'");
$record = mysql_fetch_object($result);
$id = $record->id;

$result = mysql_query("	SELECT * 
						FROM `tasks`
						LEFT JOIN `task_meta` ON `tasks`.id = `task_meta`.taskID
						WHERE `tasks`.projectID = '{$id}'
						ORDER BY `task_meta`.type DESC, `task_meta`.timestamp DESC");


while($row = mysql_fetch_assoc($result)){
	
	// for each result in the db
	

	
	// get task info for task
	
	$taskID = $row['id'];
	
	$query = mysql_query("SELECT * FROM `task_meta` WHERE `taskID` = '{$taskID}' ORDER BY timestamp DESC");
	$meta = mysql_fetch_object($query);
	
	if(!$meta){
		// if no record
		echo "could not read db->task_meta for task: " . $taskID;
		exit;
	} else {
		// record found for task meta
		$taskName = ($meta->name ? $meta->name : "Task Name");
		$taskDesc = ($meta->description ? $meta->description : "Task Description");
		$taskPrio = ($meta->priority ? $meta->priority : "No Priority" );
		$taskType = ($meta->type ? $meta->type : "No Type");
		$taskStat = ($meta->status ? $meta->status : "No Status" );
		$taskTimestamp = ($meta->timestamp ? $meta->timestamp : "No Timestamp" );
		$taskCreatedBy = ($meta->userID ? $meta->userID : "No userID Found" );
		
		// get name of created by
		$que = mysql_query("SELECT * FROM `users` WHERE `id` = '{$taskCreatedBy}'");
		$que_data = mysql_fetch_object($que);
		if(!$que_data){
			// user created by not found
		} else {
			$taskCreatedBy = $que_data->name;
		}
		
		$data = mysql_query("SELECT * FROM `task_assignments` WHERE `taskID` = '{$taskID}'");
		$taskData = mysql_fetch_object($data);
		if(!$taskData){
			// no task assignment
			echo "could not read db->task_assignment for task: " . $taskID;
			exit;
		} else {
			// task assignment found
			$assigneeID = $taskData->assigneeID;
			
			$assigneeData = mysql_query("SELECT * FROM `users` WHERE `id` = '{$assigneeID}'");
			$assignee = mysql_fetch_object($assigneeData);
			$taskAssignee = $assignee->name;
			echo $taskID . ":" . $taskName . ":" . $taskDesc . ":" . $taskPrio . ":" . $taskType . ":" . $taskStat . ":" . $taskCreatedBy . ":" . $taskAssignee;
		}
	}
	
	echo '|';
	
}

if(!$result) {
	echo "could not query db->tasks: " . mysql_error() . " ";
} else {
	// result found
}

mysqli_close($connection);