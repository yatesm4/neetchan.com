<?php


//-------------------------------------
//By: Matt Yates
//Date: 10-11-2017
//
//Description: get tasks data from db
//-------------------------------------
include('connection.php');

$id = $_SESSION['userid'];
$name = $_SESSION['username'];

$result = mysql_query(" SELECT *
                        FROM `task_assignments` AS `ta`
                        LEFT JOIN `tasks` ON tasks.id = ta.taskID
                        LEFT JOIN `projects` AS `p` ON p.id = tasks.projectID
                        LEFT JOIN `task_meta` ON task_meta.taskID = ta.taskID
                        WHERE ta.assigneeID = '{$id}' AND ta.timestamp = (  SELECT MAX(timestamp)
                                                                        FROM task_assignments AS ta2
                                                                        WHERE ta2.id = ta.id
                                                                     )
                        ORDER BY task_meta.priority
                      ");

if(!$result) {
  echo "could not query db->tasks: " . mysql_error() . " ";
} else {
  // result found
  while($row = mysql_fetch_assoc($result)){
    echo $row['taskID'] . "|" . $row['projectID'] . "|" . $row['taskKey'] . "|" . $row['name'] . "|" . $row['description'] . "|";
    echo $row['type'] . "|" . $row['priority'] . "|" . $row['userID'];
    echo "{|}";
  }
}

mysqli_close($connection);
