<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get login data from db
//-------------------------------------
include('connection.php');

$name = $_POST['username'];
$pass = $_POST['password'];
$ip = GetIP();

$result = mysql_query("SELECT * FROM `users` WHERE `name` = '{$name}'");
$record = mysql_fetch_object($result);

if($record){
  // username match
  $password_hash = $record->pass;
  if(password_verify($pass, $password_hash)){
    // password is valid
    $userid = $record->id;
    $role = $record->role;
    echo "true|";
    // store session data

    $_SESSION['username'] = $name;
    $_SESSION['userid'] = $userid;
    $_SESSION['roleid'] = $role;
    echo $_SESSION['username'];
    echo "-";
    echo $_SESSION['userid'];
  } else {
    // password is invalid
    echo "false|PASSWORD IS INVALID";
  }
} else {
  // false - no login matching
  echo "false|NO USERNAME FOUND";
}


mysqli_close($connection);
