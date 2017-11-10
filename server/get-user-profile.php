<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: get user profile data
//-------------------------------------
include('connection.php');

if(isset($_POST['userID'])){
	$id = $_POST['userID'];
} else {
	$id = $_SESSION['userid'];
	$ip = GetIP(); // grab users IP
	$name = $_SESSION['username'];
}

$result = mysql_query("	SELECT *
												FROM `users`
												WHERE `id` = '{$id}'
											");

$usermeta = mysql_query("	SELECT *
													FROM `user_meta` AS `um`
													WHERE `userID` = '{$id}' AND `timestamp` = (	SELECT MAX(timestamp)
																																				FROM user_meta um2
																																				WHERE um2.userID = um.userID
																																		 )
													GROUP BY `metaKey`
													ORDER BY `timestamp`
												");

if($result){
	// if db query success
	$user = mysql_fetch_object($result);
	if($user){
		if(isset($_POST['userID'])){
			$name = $user->name;
		}
		$role = $user->role;
		echo $id . "|" . $name . "|" . $role . "|" . $ip;
		while($row = mysql_fetch_assoc($usermeta)){
			echo "|";
			echo $row['metaValue'];
		}
	} else {

			echo "could not query db->user-reqs: " . mysql_error() . " ";
			exit;
	}
} else {
	// db query unsuccessful
	echo "could not query db->users: " . mysql_error() . " ";
	exit;
}

mysqli_close($connection);
