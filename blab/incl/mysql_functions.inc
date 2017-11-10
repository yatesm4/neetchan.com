<?php

function neutral_escape($a,$b,$c){
if(strlen($a)>$b){$a=substr($a,0,$b);}
if($c=='int'){$a=(int)$a;}
else{
if(get_magic_quotes_gpc()){$a=stripslashes($a);}
if($c!='txt'){
$a=str_replace("\r",'',$a);
$a=str_replace("\n",' ',$a);}
$a=str_replace("\0",'',$a);
$a=mysql_real_escape_string($a);
$a=trim($a);}return $a;}

function neutral_dbconnect(){
global $dbss;
if(isset($dbss['cset'])){$sql_charset=$dbss['cset'];}else{$sql_charset='utf8';}
mysql_connect($dbss['host'],$dbss['user'],$dbss['pass']) or process_error('Cannot connect to database.');
mysql_select_db($dbss['name']) or process_error(mysql_error());
if(function_exists('mysql_set_charset')){mysql_set_charset($sql_charset);}else{mysql_query("SET NAMES $sql_charset");}}

function neutral_dbpconnect(){
global $dbss;
if(isset($dbss['cset'])){$sql_charset=$dbss['cset'];}else{$sql_charset='utf8';}
mysql_pconnect($dbss['host'],$dbss['user'],$dbss['pass']) or process_error('Cannot connect to database.');
mysql_select_db($dbss['name']) or process_error(mysql_error());
if(function_exists('mysql_set_charset')){mysql_set_charset($sql_charset);}else{mysql_query("SET NAMES $sql_charset");}}

function neutral_query($q){
global $queries;$queries+=1;
$r=mysql_query($q) or process_error(mysql_error());
return $r;}

function neutral_fetch_array($q){
$r=mysql_fetch_array($q);return $r;}

function neutral_num_rows($q){
$r=mysql_num_rows($q);return $r;}

function neutral_data_seek($q){
mysql_data_seek($q,0);}

function neutral_affected_rows(){
$r=mysql_affected_rows();return $r;}

?>