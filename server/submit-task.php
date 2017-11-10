<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: upload project from project-create to db
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$projectKey = $_POST['task-project-id'];
$name = $_POST['task-name'];
$desc = $_POST['task-desc'];
$type = $_POST['task-type'];
$priority = $_POST['task-priority'];
$assignee = $_POST['task-assignee'];
$start	= $_POST['task-start'];
$end	= $_POST['task-end'];
$time	= $_POST['task-time'];
$status = 'open';
$ip = GetIP(); // get IP for user ID
$userID = $_SESSION['userid'];

//--------------------------------------------------------------------------------

// get projectID from projects table based off project key

$result = mysql_query("SELECT * FROM `projects` WHERE `key` = '{$projectKey}'");
$record = mysql_fetch_object($result);
$id = $record->id;

// get task count from tasks table where projectID matches $id
$result = mysql_query("SELECT * FROM `tasks` WHERE `projectID` = '{$id}'");
$count = 1;
while($row = mysql_fetch_assoc($result)){
	$count++;
}

$taskKey = $projectKey . "-" . $count;


//--------------------------------------------------------------------------------

// insert task into db
$result = mysql_insert('tasks', array(
									'taskKey'	=> $taskKey,
									'projectID' => $id,
									'userID' 	=> $userID
));

if($result){

	// get auto-incremented task id
	$taskID = mysql_insert_id();

	$result = mysql_insert('task_meta', array(
											'taskID' 		=> $taskID,
											'name' 			=> $name,
											'description' 	=> $desc,
											'type' 			=> $type,
											'priority' 		=> $priority,
											'status' 		=> $status,
											'userID' 		=> $userID
	));

	if($result){

		$result = mysql_insert('task_assignments', array(
														'taskID'		=> $taskID,
														'userID'		=> $userID,
														'assigneeID'	=> $assignee
		));

		if($result){

			$result = mysql_insert('task_time', array(
													'taskID'	=> $taskID,
													'startTime'	=> $start,
													'endTime'	=> $end,
													'totalTime'	=> $time,
													'userID'	=> $userID
			));
			if($result){
				echo "task submit successful|" . $projectKey;
			} else {
				echo "task submit failed: " . mysql_error() . "|" . $projectID;
			}
		} else {
			echo "task assignment submit failed: " . mysql_error() . "|" . $projectID;
		}

	} else {
		echo "task meta submit failed: " . mysql_error() . "|" . $projectID;
	}

} else {
	echo "task submit failed: " . mysql_error() . "|" . $projectID;
}

mysqli_close($connection);
