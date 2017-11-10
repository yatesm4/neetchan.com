<?php 

if(!isset($_POST['dbhost']) || !isset($_POST['dbname']) || !isset($_POST['dbuser']) || !isset($_POST['dbpass']) || !isset($_POST['dbsock'])){print '0';die();}

function process_error($x){print $x;die();}

$dbss=array();
$dbss['host']=$_POST['dbhost'];
$dbss['name']=$_POST['dbname'];
$dbss['user']=$_POST['dbuser'];
$dbss['pass']=$_POST['dbpass'];
$dbss['sock']=trim($_POST['dbsock']);
$dbss['cset']='utf8';

require_once '../incl/mysqli_functions.inc';

@neutral_dbconnect(); print 1;

?>