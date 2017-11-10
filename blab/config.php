<?php

/* PLEASE DO NOT ALLOW EVEN ONE BLANK SPACE/LINE IN THIS FILE OUTSIDE '<?php' AND '?>' */

$salt='5OR1VYrCI4Bx5xeX6Mnw';              // Salt. A salt consists of random chars used as one of the inputs of a one-way function (MD5 hash). DO NOT CHANGE!

/* ------ BLAB! DATABASE SETTINGS ------  */


$dbss=array();
$dbss['type']='mysqli';      // Database type, *lowercase* (options: mysql, mysqli)
$dbss['host']='localhost';      // Database host (in most cases 'localhost', on Windows systems - use '127.0.0.1' instead of 'localhost' to avoid a php/ipv6 bug)
$dbss['user']='blabChat';      // Database user
$dbss['pass']='ju$1r31aX!';      // Database password
$dbss['name']='neetchan';      // Database name. Note that the installation script cannot create a database for you!
$dbss['sock']='';      // Database socket
$dbss['prfx']='blab';      // Table prefix for BLAB! tables, default 'blab'
$dbss['pcon']=0;             // [0 or 1] Establishes a persistent connection to the SQL server. If you are not sure leave it 0.
$dbss['cset']='utf8';        // utf8 or utf8mb4 [utf8 is default, if your database is converted to utf8mb4 to support emoji then set utf8mb4]


/* ------- ADDITIONAL SETTINGS ------- */


$error_log='errors.txt';           // CHMODed to 777 file to store sql errors if any ( it is recommended to rename this file )
$latest_mssg=20;                   // Messages to display when users enter the chat, recommended value: 5-50.
$bwords=0;     // Bad words array: $bwords=array('fuck','bitch','etc');  $bwords=0; -> off. Turn it off to save CPU resources. 
$topic='/topic';                   // Topic. If found, the posted text appears with larger letters and clears the screen.
$paint_prefix='p';                 // Paint prefix. Mind that it's to be set in "preg_replace" function. To be safe use letters only.
$anonymto=0;                       // Links are converted to anonym.to links [0 or 1]

?>