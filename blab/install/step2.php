<?php 

if(!isset($_POST['dbhost']) || !isset($_POST['dbname']) || !isset($_POST['dbuser']) || !isset($_POST['dbpass'])){die();}

require_once('lang_english.utf8'); ?>

<!DOCTYPE html>
<html>

<head><title><?php print $lang['installing'].' ('.$lang['step'].' 2)';?></title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" type="text/css" href="style.css" />
</head>

<body class="x_global x_overal">

<?php
if(is_file('../config.php') && filesize('../config.php')>0){?>
<div class="holder x_accent_bg round4" style="text-align:center;padding:50px">
<?php print $lang['config_set'];?>
</div></body></html>
<?php die();}?>

<?php
if(!is_file('../config.php') || !is_writeable('../config.php')){?>
<div class="holder x_accent_bg round4" style="text-align:center;padding:50px">
<?php print $lang['config_chm'];?>
</div></body></html>
<?php die();}?>

<?php

// setting config.php

function rand_str($l){
$l=(int)$l;if($l<5){$l=5;}
$str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$len = strlen($str); $randstr = '';
for ($i = 0; $i < $l; $i++) {$randstr.=$str[rand(0,$len-1)];}
return $randstr;}

$rnsalt=rand_str(20);

if(isset($_POST['dbhost'])){$dbhost=$_POST['dbhost'];}else{$dbhost='localhost';}
if(isset($_POST['dbname'])){$dbname=$_POST['dbname'];}else{$dbname='';}
if(isset($_POST['dbuser'])){$dbuser=$_POST['dbuser'];}else{$dbuser='';}
if(isset($_POST['dbpass'])){$dbpass=$_POST['dbpass'];}else{$dbpass='';}
if(isset($_POST['dbprfx'])){$dbprfx=trim($_POST['dbprfx']);}else{$dbprfx='blab';}
if(isset($_POST['dbsock'])){$dbsock=trim($_POST['dbsock']);}else{$dbsock='';}

$config=@file('phpconfig',FILE_IGNORE_NEW_LINES);
$config=implode("\n",$config);
$config=str_replace('DBHOST',$dbhost,$config);
$config=str_replace('DBNAME',$dbname,$config);
$config=str_replace('DBUSER',$dbuser,$config);
$config=str_replace('DBPASS',$dbpass,$config);
$config=str_replace('PREFIX',$dbprfx,$config);
$config=str_replace('DBSOCK',$dbsock,$config);
$config=str_replace('RNSALT',$rnsalt,$config);

$handle=fopen('../config.php','w');fwrite($handle,$config);fclose($handle);

require_once('../config.php');
require_once('../incl/mysqli_functions.inc');
require_once('../version.php');

function process_error($x){print $x;die();}

$cslt=rand_str(16);
$timestamp=time();
$url_path=$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
$url_path=str_replace('install/step2.php','',$url_path);
$url_path='http://'.$url_path;
$def_mail='noreply@'.$_SERVER['SERVER_NAME'];

$option_myisam=' ENGINE=MYISAM CHARACTER SET utf8 COLLATE utf8_general_ci';
$option_myheap=' ENGINE=MEMORY CHARACTER SET utf8 COLLATE utf8_general_ci';
$auto_increment='integer NOT NULL auto_increment PRIMARY KEY';

// db install goes here

$install=array();
neutral_dbconnect();

/* ---- */

/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_lines(
line_id '.$auto_increment.',
from_id integer NOT NULL,
from_name varchar(64) NOT NULL,
timestamp integer NOT NULL,
line_txt text NOT NULL)'.$option_myisam;

/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_online(
usr_id integer NOT NULL,
usr_name varchar(64) NOT NULL,
usr_ip varchar(50) NOT NULL,
rtime integer NOT NULL)'.$option_myheap;

/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_ban(
ban_id integer NOT NULL,
ban_name varchar(64) NOT NULL,
ban_ip varchar(50) NOT NULL,
timestamp integer NOT NULL,
ban_reason varchar(255) NOT NULL)'.$option_myheap;

/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_iplog(
usr_id integer NOT NULL,
usr_name varchar(255) NOT NULL,
ipaddr varchar(50) NOT NULL,
timestamp integer NOT NULL)'.$option_myisam;


/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_users(
usr_id '.$auto_increment.',
usr_name varchar(64) NOT NULL,
usr_pass char(32) NOT NULL,
usr_mail varchar(64) NOT NULL,
usr_join_date integer NOT NULL,
usr_status varchar(8) NOT NULL)'.$option_myisam;

/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_paintings(
p_id '.$auto_increment.',
p_srx text NOT NULL,
p_sry text NOT NULL,
p_src text NOT NULL,
p_bgc char(6) NOT NULL,
p_views integer NOT NULL,
timestamp integer NOT NULL,
usr_id integer NOT NULL,
usr_name varchar(255) NOT NULL)'.$option_myisam;

/* ---- */

$install[]='CREATE TABLE '.$dbss['prfx'].'_settings(
set_id varchar(16) NOT NULL PRIMARY KEY,
set_value text NOT NULL,
set_fast smallint NOT NULL)'.$option_myisam;

$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('acp_timezone','0',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_timeform','0',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_language','3',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_effects','2',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_sound1','4',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_sound2','6',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_sound3','9',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_sound4','7',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('title','BlaB!',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('guests','1',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('register','1',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('activation','0',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('url','$url_path',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('default_mail','$def_mail',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('ajax_delay','500',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('ajax_update','6',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('post_length','128',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('post_interv','2000',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('admin_lang','0',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('wrong_acp','0',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('acp_key','xxxxx',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('admin_css','2',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('notebook','...',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('meta_desc','',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('meta_keyw','',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('del_gbuddies','1',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('mssg_history','17520',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('optimize_tbl','1',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('acp_attempts','180',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('acp_lhours','2',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('show_topic','1',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('cookie_salt','$cslt',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('iplog_on','1',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('legal_msg','',0)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('int_version','$int_version',1)";

$fp='../incl/faq_example.txt';
if(is_file($fp)){$faq=file($fp); $faq=implode('',$faq);$faq=neutral_escape($faq,9000,'txt');}else{$faq='';}
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('faq_page','$faq',1)";

$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('style_template','
td,p,div,input,select,textarea{font-size:[15];font-family:[3];text-align:left}
input,select,textarea{color:#[13];background-color:#[14];padding:2px;border-width:0;box-sizing:border-box}
.bgcolor_overal{color:#[1];background-color:#[2]}
.bgcolor_panel_bars{color:#[9];background-color:#[10]}
.bgcolor_panel_content{color:#[11];background-color:#[12]}
.bgcolor_bottom_bar{color:#[7];background-color:#[8]}
.title1{font-size:[17];font-weight:bold;text-transform:uppercase}
.title2{font-size:[18];font-weight:bold;text-transform:uppercase}
.text_small{font-size:[16]}
.panels_extra{[19]}
.boxes_extra{[20]}
.bottombar_extra{[22]}
.textbox_extra{[23]}
.body_extra{[24]}
.link_color{color:#[4];cursor:pointer}
.oo{font-weight:bold;line-height:15px;white-space:nowrap;color:#[4];margin-left:8px}
',1)";

$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('style_delivery','
td,p,div,input,select,textarea{font-size:13px;font-family:sans-serif;text-align:left}
input,select,textarea{color:#000000;background-color:#FFFFFF;padding:2px;border-width:0;box-sizing:border-box}
.bgcolor_overal{color:#000000;background-color:#DEE4EA}
.bgcolor_panel_bars{color:#FFFFFF;background-color:#9CA5AF}
.bgcolor_panel_content{color:#000000;background-color:#CCD2DB}
.bgcolor_bottom_bar{color:#000000;background-color:#CED7DE}
.title1{font-size:15px;font-weight:bold;text-transform:uppercase}
.title2{font-size:13px;font-weight:bold;text-transform:uppercase}
.text_small{font-size:12px}
.panels_extra{border-radius:6px;box-shadow:2px 2px 2px #666}
.boxes_extra{border-left:1px solid #eee;border-top:1px solid #eee;box-shadow:2px 2px 2px #666;border-radius:4px}
.bottombar_extra{padding:2px;box-shadow:0 -2px 2px #666}
.textbox_extra{border-radius:2px;border-width:0;box-shadow:1px 1px 2px #666}
.body_extra{}
.link_color{color:#317CAA;cursor:pointer}
.oo{font-weight:bold;line-height:15px;white-space:nowrap;color:#317CAA;background-repeat:no-repeat;cursor:pointer;margin-left:8px}
',0)";

$fp='../incl/styles.dat';
if(is_file($fp)){$style=file($fp);
if(isset($style[12])){
for($i=0;$i<13;$i++){$style[$i]=trim($style[$i]);}
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_1d','$style[0]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_2d','$style[1]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_3d','$style[2]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_4d','$style[3]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_5d','$style[4]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_6d','$style[5]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_7d','$style[6]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_8d','$style[7]',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_settings VALUES('slot_9d','$style[8]',1)";
}}

$install[]='CREATE TABLE '.$dbss['prfx'].'_style(
sid smallint NOT NULL,
value text NOT NULL,
desktop smallint NOT NULL)'.$option_myisam;

$install[]='DELETE FROM '.$dbss['prfx'].'_style';

$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(1,'000000',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(2,'DEE4EA',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(3,'sans-serif',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(4,'317CAA',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(5,'',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(6,'',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(7,'000000',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(8,'CED7DE',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(9,'FFFFFF',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(10,'9CA5AF',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(11,'000000',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(12,'CCD2DB',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(13,'000000',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(14,'FFFFFF',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(15,'13px',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(16,'12px',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(17,'15px',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(18,'13px',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(19,'border-radius:6px;box-shadow:2px 2px 2px #666',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(20,'border-left:1px solid #eee;border-top:1px solid #eee;box-shadow:2px 2px 2px #666;border-radius:4px',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(21,'',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(22,'padding:2px;box-shadow:0 -2px 2px #666',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(23,'border-radius:2px;border-width:0;box-shadow:1px 1px 2px #666',1)";
$install[]='INSERT INTO '.$dbss['prfx']."_style VALUES(24,'',1)";

for($i=0;$i<count($install);$i++){neutral_query($install[$i]);}

// end db install
?>

<div class="holder">
<h2><?php print $lang['step'];?> 2</h2>
<hr />

<form action="done.php" method="post" autocomplete="off">

<div class="left">
<?php print $lang['acp_key'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="acpkey1" value="" maxlength="64" onfocus="input_style_back(this)" />
</div><br /><hr />

<div class="left">
<?php print $lang['acp_key_r'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="acpkey2" value="" maxlength="64" onfocus="input_style_back(this)" />
</div><br /><hr />


<input type="button" class="round4 x_bcolor_bg" style="width:100%;font-weight:bold;height:50px" value="<?php print $lang['next'];?>" onclick="check_form()" />
</form>
</div>

<script type="text/javascript">
function check_form(){
f=document.forms[0];s='x_accent_bg s250';
a1=f.acpkey1; a2=f.acpkey2;
if(f.acpkey1.value.trim().length<3){f.acpkey1.className=s;return false}
if(f.acpkey1.value!=f.acpkey2.value){f.acpkey2.className=s;return false}
document.forms[0].submit()}

function input_style_back(x){x.className='x_accent_bb s250'}

document.forms[0].reset()
window.onunload=function(){}
</script>
</body>
</html>