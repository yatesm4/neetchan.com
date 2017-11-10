<?php

function time_to_run(){
$time=microtime();
$time=explode(' ',$time);
return $time[1]+$time[0];}
$start_time=time_to_run();

// -----

function process_error($s){
global $error_log;
if(is_writeable($error_log)){
$s="\n".date('Y-m-d H:i:s').' '.$s;
$fd=fopen($error_log,"a");
$fout=fwrite($fd,$s);fclose($fd);}
die('SQL error... Please check your error log file for details...');}

// -----

function htmrem($a){
$a=str_replace('<','&lt;',$a);
$a=str_replace('>','&gt;',$a);
$a=str_replace('"','&quot;',$a);
$a=str_replace('|','&#124;',$a);
$a=str_replace('~','&#126;',$a);
return $a;}

// -----

function abc123($n,$s){
$n=trim($n);
$n=preg_replace('/[^\p{L}\p{N} ]/u',$s,$n);
$n=preg_replace('/([\s])\1+/',' ',$n);
return $n;}

// -----

function makeurl($match){
global $anonymto;
if(!isset($anonymto) || $anonymto<1){$anonymto='';}else{$anonymto='\'http://anonym.to/?\'+';}
$completeUrl=$match[1]?$match[0]:"http://{$match[0]}";
$txto=$match[2].$match[3].$match[4];
$txtr=substr($txto,0,25); if(strlen($txto)>25){$txtr.='...';}
return '<span class="link_color text_underline" onclick="window.open('.$anonymto.'\'' . $completeUrl . '\')">'.$txtr .'</span>';}

function url2link($t){
// based on UrlLinker -> http://www.kwi.dk/projects/php/UrlLinker/
$rexPr='(https?://)?';
$rexDo='((?:[-a-zA-Z0-9]{1,63}\.)+[-a-zA-Z0-9]{2,63}|(?:[0-9]{1,3}\.){3}[0-9]{1,3})';
$rexPo='(:[0-9]{1,5})?';
$rexPa='(/[!$-/0-9:;=@_\':;!a-zA-Z\x7f-\xff]*?)?';
$rexQu='(\?[!$-/0-9:;=@_\':;!a-zA-Z\x7f-\xff]+?)?';
$rexFr='(#[!$-/0-9:;=@_\':;!a-zA-Z\x7f-\xff]+?)?';
return preg_replace_callback("&\\b$rexPr$rexDo$rexPo$rexPa$rexQu$rexFr(?=[?.!,;:\"]?(\s|$))&",'makeurl',$t);}

function emo2image($t){
include 'ui/emocodes.php';
for($i=0;$i<count($emoticons);$i++){
$row=explode(' ',$emoticons[$i]);
$t=str_replace($row[0],"<span class=\"chat_area_emoticon $row[1]\"></span>",$t);}
return $t;}

// -----


function hsh($a){
global $salt;
$a=md5(md5($a).$salt);
return $a;}

// -----

function dbconnect(){global $dbss;if($dbss['pcon']>0){neutral_dbpconnect();}else{neutral_dbconnect();}}

// -----

function get_language(){
global $options;
include 'lang/languages.inc';

$set_lang='lang/'.$lang_files[$options[0]];
if(!is_file($set_lang)){$set_lang='lang/'.$lang_files[0];}

include $set_lang;return $lang;}

// ----

function get_settings($f){
global $dbss;$settings=array(); 
if($f>0){$f='';}else{$f=' WHERE set_fast=0';}
$query='SELECT set_id,set_value FROM '.$dbss['prfx'].'_settings'.$f;
$result=neutral_query($query);
while($row=neutral_fetch_array($result)){$settings[$row['set_id']]=$row['set_value'];}
return $settings;}

// ----

function redirect($u){
header('location:'.$u);
}

// ----

function send_mail($a,$b,$c,$d){
$d="From: $d\r\n";
$d.="Content-type: text/plain; charset=\"utf-8\"\r\n";
$d.="Content-Transfer-Encoding: 8bit\r\n";
$e=mail($a,$b,$c,$d); return $e;}

// ----

function get_options(){
global $settings;$options=array();
if(isset($_COOKIE['blab_options'])){$options=explode('z',$_COOKIE['blab_options']);}

if(!isset($options[10])){

$options[0]=$settings['default_language'];
$options[1]=0; // void, timezone
$options[2]=$settings['default_timeform'];
$options[3]=$settings['default_effects'];
$options[4]=$settings['default_sound1'];
$options[5]=$settings['default_sound2'];
$options[6]=$settings['default_sound3'];
$options[7]=$settings['default_sound4'];
$options[8]=0;    // bold
$options[9]=0;    // italic
$options[10]=999; // color
}

if(stristr($_SERVER['HTTP_USER_AGENT'],'MSIE')){
$iev=explode('MSIE',$_SERVER['HTTP_USER_AGENT']);
$iev=(int)$iev[1];if($iev<9){$options[3]=0;}}

for($i=0;$i<11;$i++){$options[$i]=(int)$options[$i];}
return $options;}

/* --- */

if(!isset($paint_prefix)){$paint_prefix='p';} $paint_match='/\/'.$paint_prefix.'([0-9]+)/';
$random=mt_rand(1,999999); $timestamp=time(); $queries=0; 
unset($settings,$options);

require_once 'incl/'.$dbss['type'].'_functions.inc';

if(!headers_sent()){
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Content-type: text/html; charset=UTF-8");}

?>