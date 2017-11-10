<?php


//-------------------------------------
//By: Matt Yates
//Date: 11-09-2017
//
//Description: submit work log for a task
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$task_id = $_POST['task-id'];
$date = $_POST['log-date'];
$hours = $_POST['log-hours'];
$desc = $_POST['log-desc'];
$user_id = $_SESSION['userid'];

//--------------------------------------------------------------------------------

// insert log into db
$result = mysql_insert('task_logs', array(
									'taskID'	=> $task_id,
									'userID' => $user,
									'userID' 	=> $user_id
));

if($result){

	// get auto-incremented task id
	$log_id = mysql_insert_id();

  $result = mysql_insert('task_log_meta', array(
  									'logID'	=> $log_id,
  									'description' => $desc,
  									'hours' 	=> $hours,
                    'date'  => $date
  ));

  if($result){
    echo "log submit successful|" . $task_id;
  } else {
    echo "log submit failed: " . mysql_error() . "|" . $task_id;
  }

} else {
  echo "log submit failed: " . mysql_error() . "|" . $task_id;
}


mysqli_close($connection);
