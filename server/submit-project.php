<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: upload project from project-create to db
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$name = $_POST['project-name'];
$desc = $_POST['project-desc'];
$group = $_POST['project-group'];
$key = $_POST['project-key'];
$start = $_POST['project-start-date'];
$end = $_POST['project-due-date'];
$userID = $_SESSION['userid'];

echo "POST VARS: " . $name . ", " . $key . ". ";

// insert data into db
$result = mysql_insert('projects', array(
									'name' 			=> $name,
									'key' 			=> $key,
									'groupID' 		=> $group,
									'userID' 		=> $userID,
									'description' 	=> $desc
));

$projectID = mysql_insert_id();

$result = mysql_insert('project_meta', array(
									'projectID'	=> $projectID,
									'userID'	=> $userID,
									'startDate'	=> $start,
									'endDate'	=> $end
));

if($result){
	echo "submit successful.";
} else {
	echo "submit failed: " . mysql_error() . " ";
}

mysqli_close($connection);
