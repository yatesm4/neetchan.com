<?php


//---------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: save user profile details
//---------------------------------------
include('connection.php');

// grab current user creds
$ip = GetIP();
$name = $_SESSION['username'];
$id = $_SESSION['userid'];

// grab form data
$formid = $_POST['userid'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$street = $_POST['street'];
$zip = $_POST['zip'];
$city = $_POST['city'];
$state = $_POST['state'];
$website = $_POST['website'];
$info = array($firstname, $lastname, $email, $phone, $street, $zip, $city, $state, $website);
$keys = array("first_name", "last_name", "email", "phone", "street", "zip", "city", "state", "website");

for($i=0;$i<count($info);$i++){
	$insert = mysql_insert('user_meta', array(
									'userID'   => $formid,
									'metaKey' => $keys[$i],
									'metaValue' => $info[$i]
								));
}

if($insert){
	echo "true";
} else {
	echo "could not query db->users: " . mysql_error() . " ";
}

mysqli_close($connection);
