<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get user profile data
//-------------------------------------
include('connection.php');

$ip = GetIP(); // grab users IP
//$name = $_SESSION['username'];
//$id = $_SESSION['userid'];

if(isset($_SESSION['username'])){
  // user is logged in
  $name = $_SESSION['username'];
  $id = $_SESSION['userid'];
  $role = $_SESSION['roleid'];
  echo "true|".$name."|".$id."|".$role;
} else {
  // user not logged in
  echo "false|USER NOT LOGGED IN";
}
