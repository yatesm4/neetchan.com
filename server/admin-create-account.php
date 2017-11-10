<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: create user and sign in
//-------------------------------------
include('connection.php');


//--------------------------------------------------------------------------------

$name = $_POST['username'];
$pass = $_POST['password'];
$role= $_POST['user-role'];
$ip = GetIP();
$hash = get_hash($pass);

$result = mysql_query("SELECT * FROM `users` WHERE `name` = '{$name}'");
$record = mysql_fetch_object($result);

if($record){
  //username exists already
  echo "false|username exists";
} else {
  //username does not already exists
  if(ctype_alnum($name)){
    //username is valid
    if(validate_password($pass)){
      //password is valid
      $insert = mysql_insert('users', array(
    									'ip'   => $ip,
    									'name' => $name,
                      'pass' => $hash,
    									'role' => $role
                    ));
      if($insert){
        //insert success
        $userid = mysql_insert_id();
    	  echo "true";

      } else {
        //insert failed
        echo "false|DB FAILED";
      }
    } else {
      //password is not valid
      echo ":false|PASSWORD IS NOT VALID";
    }
  } else {
    //username is not valid
    echo "false|USERNAME IS NOT VALID";
  }
}

mysqli_close($connection);

?>
