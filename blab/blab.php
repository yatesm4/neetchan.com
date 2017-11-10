<?php
require_once 'config.php';
require_once 'incl/main.inc';

dbconnect(); $settings=get_settings(0); $options=get_options(); $lang=get_language(); 

$query='DELETE FROM '.$dbss['prfx']."_ban WHERE timestamp<$timestamp";
neutral_query($query);

unset($user);
if(isset($_COOKIE['blab_xuidc'])){

$uid=explode('z',$_COOKIE['blab_xuidc']);

if(isset($uid[1]) && hsh($uid[0].$settings['cookie_salt'])==$uid[1]){
$uid=(int)$uid[0];

$query='SELECT * FROM '.$dbss['prfx']."_users WHERE usr_id=$uid";
$result=neutral_query($query);

if(neutral_num_rows($result)>0){
$ext_user=neutral_fetch_array($result);

$user=array();
$user['id']=(int)$ext_user['usr_id'];
$user['name']=$ext_user['usr_name'];
}}}

if(!isset($user['id']) || !$user['name']){redirect('login.php');die();}

$ajx_name=$user['name']; $ajx_name=trim($ajx_name);
$ajx_name=abc123($ajx_name,'*');

$lhash=hsh($user['id'].'hash_check');
$uhash=hsh($user['id'].$ajx_name.'blab'); 
$js_vars='uid='.$user['id'].';uname=\''.$ajx_name.'\';uhash=\''.$uhash.'\';';

if(isset($settings['iplog_on'])){
$iplname=neutral_escape($user['name'],64,'str');
$ipaddrs=$_SERVER['REMOTE_ADDR'];
$query='SELECT * FROM '.$dbss['prfx'].'_iplog WHERE usr_id='.$user['id'].' AND ipaddr=\''.$ipaddrs.'\'';
$result=neutral_query($query);

if(neutral_num_rows($result)<1){
$query='INSERT INTO '.$dbss['prfx'].'_iplog VALUES('.$user['id'].',\''.$iplname.'\',\''.$ipaddrs.'\','.$timestamp.')';
neutral_query($query);}
else{
$query='UPDATE '.$dbss['prfx'].'_iplog SET timestamp='.$timestamp.' WHERE usr_id='.$user['id'].' AND ipaddr=\''.$ipaddrs.'\'';
neutral_query($query);}
}

include 'ui/emocodes.php';

$title=$settings['title'];
include 'ui/templates/head.pxtm';
include 'ui/templates/blab.pxtm';

?>