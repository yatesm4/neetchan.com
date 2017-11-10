<?php


//-------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: check user (login) in db for access priv
//-------------------------------------
include('connection.php');

$ip = GetIP(); // grab users IP

$result = mysql_query("SELECT * FROM `users` WHERE `ip` = '{$ip}'");

if($result){
	// if db query success
	$user = mysql_fetch_object($result);
	if($user){
		// user match found
		$id = $user->id;
		$name = $user->name;
		$role = $user->role;
		
		echo "true|true|" . $id . ":" . $name . ":" . $role . ":" . $ip;
	} else {
		// no user match found
		
		// check new user requests
		
		$reqs = mysql_query("SELECT * FROM `new_user_reqs` WHERE `ip` = '{$ip}' ORDER BY `timestamp` DESC LIMIT 1");
		
		if($reqs){
			// db query successful
			$req = mysql_fetch_object($reqs);
			if($req){
				// request found
				// found user in new user reqs
				$req_id = $req->requestID;
				$new_name = $req->name;
				$new_role = $req->role;
				$new_timestamp = $req->timestamp;
				$confirmed = $req->confirmed;
		
				echo "true|false|" . $confirmed . ":" . $req_id . ":" . $ip . ":" . $new_name . ":" . $new_role . ":" . $new_timestamp;
			} else {
				// request not found
				echo "false|could not read db->user-results for ip: " . $ip;
				exit;
			}
		} else {
			// db query unsuccessful
			echo "false|could not query db->user-reqs: " . mysql_error() . " ";
			exit;
		}
	}
} else {
	// db query unsuccessful
	echo "false|could not query db->users: " . mysql_error() . " ";
	exit;
}

mysqli_close($connection);
