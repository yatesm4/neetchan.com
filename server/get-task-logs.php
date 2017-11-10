<?php


//-------------------------------------
//By: Matt Yates
//Date: 10-11-2017
//
//Description: get task logs data from db
//-------------------------------------
include('connection.php');

$id = $_SESSION['userid'];
$name = $_SESSION['username'];
$task_id = $_POST['key'];

$result = mysql_query(" SELECT *
                        FROM `task_logs` AS `tl`
                        INNER JOIN `task_log_meta` AS `tlm` ON tlm.logID = tl.id
                        WHERE tl.taskID = '{$task_id}'
                        ORDER BY tl.timestamp DESC
                      ");

if($result){
  while($row = mysql_fetch_assoc($result)){
    echo $row['id'] . "|" . $row['userID'] . "|" . $row['description'] . "|" . $row['hours'] . "|" . $row['date'];
    echo "{|}";
  }
}

mysqli_close($connection);
