<?php

//------------------------------------------------------------------------------
//By: Matt Yates
//Date: 08-18-2017
//
//Description: connection functions
//------------------------------------------------------------------------------

// set session info ------------------------------------------------------------

// server should keep session data for AT LEAST 1 hour
ini_set('session.gc_maxlifetime', 3600);

// each client should remember their session id for EXACTLY 1 hour
session_set_cookie_params(3600);

session_start();

// set database vars -----------------------------------------------------------

$db_name = "REMOVED";
$db_user = "REMOVED";
$db_pass = "REMOVED";
$server = "REMOVED";

// connect to database ---------------------------------------------------------

$connection = mysql_connect($localhost, $db_user, $db_pass, $db_name);

if($connection){
} else {
	echo "connection failed: " . mysql_error() . " ";
}

$db = mysql_select_db('neetchan', $connection);

if($db){
	// connection complete
} else {
	echo "db connection failed: " . mysql_error() . " ";
}

// database functions ----------------------------------------------------------

// function for inserting into db
function mysql_insert($table, $inserts){
	$values = array_map('mysql_real_escape_string', array_values($inserts));
	$keys = array_keys($inserts);

	return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode ('\',\'', $values).'\')');
}

// credential functions --------------------------------------------------------

// function for getting hash for password
function get_hash($password){
	$hash_options = [
		'cost' => 11,
		'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
	];
	$hash = password_hash($password, PASSWORD_BCRYPT, $hash_options);
	return $hash;
}

// function for validating a password against a case
function validate_password($pass){
    $requirements = array();

    //uppercase
    $requirements['uppercase']['pattern'] = '/[A-Z]/';
    $requirements['uppercase']['error'] = 'Your password must contain at least one uppercase letter.';

    //lowercase
    $requirements['lowercase']['pattern'] = '/[a-z]/';
    $requirements['lowercase']['error'] = 'Your password must contain at least one lowercase letter.';

    //requires a number
    $requirements['number']['pattern'] = '/[0-9]/';
    $requirements['number']['error'] = 'Your password must contain at least one number.';

    //special characters
    $requirements['special_character']['pattern'] = '/[!@#$%^&*()\\-_=+{};\:,<\.>]/';
    $requirements['special_character']['error'] = 'Your password must contain at least one special character.';

    //length
    $requirements['length']['pattern'] = '/^.{8,}/';
    $requirements['length']['error'] = 'Your password must be at least 8 characters in length total.';



    $is_valid = false; //our flag to return as true once all tests have passed.
    $errors = false;

    //validate all requirements
    foreach($requirements as $idx => $req):
        if(preg_match($req['pattern'], $pass, $matches)):
            $is_valid = true;
        else:
            $errors[] = $req['error'];
            $is_valid = false;
        endif;
    endforeach;

    //if we had errors above
    if($errors):
        $is_valid = false;
        foreach($errors as $error):
            echo $error;
        endforeach;

    endif;
    return $is_valid;
}

// function for grabbing users id based off ip address ---- DEAD FUNCTION ----
function GetUserID($ip){
	$result = mysql_query("SELECT `id` FROM `users` WHERE `ip` = '{$ip}'");
	$user = mysql_fetch_object($result);
	$id = $user->id;
	return $id;
}


// function to Grab IP address for saving in log
function GetIP()
{
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key)
    {
        if (array_key_exists($key, $_SERVER) === true)
        {
            foreach (array_map('trim', explode(',', $_SERVER[$key])) as $ip)
            {
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false)
                {
                    return $ip;
                }
            }
        }
    }
}
