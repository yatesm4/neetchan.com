<?php 
if(!isset($_POST['start'])){die();}

require_once('lang_english.utf8'); ?>

<!DOCTYPE html>
<html>

<head><title><?php print $lang['installing'].' ('.$lang['step'].' 1)';?></title>
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

<form action="step2.php" method="post"  autocomplete="off">
<div class="holder">

<div id="whole_form">

<h2><?php print $lang['step'];?> 1</h2>
<hr />

<div class="left">
<?php print $lang['dbhost'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="dbhost" value="localhost" />
</div><br /><hr />

<div class="left">
<?php print $lang['dbname'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="dbname" value="" />
</div><br /><hr />

<div class="left">
<?php print $lang['dbuser'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="dbuser" value="" />
</div><br /><hr />

<div class="left">
<?php print $lang['dbpass'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="dbpass" value="" />
</div><br /><hr />

<div class="left">
<?php print $lang['dbprfx'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="dbprfx" value="blab" />
</div><br /><hr />

<div style="text-align:center"><?php print $lang['sock_desc'];?></div>
<br /><hr />

<div class="left">
<?php print $lang['dbsock'];?>
</div>
<div class="right">
<input type="text" class="x_accent_bb s250" name="dbsock" value="" />
</div><br /><hr />

<input type="button" class="round4 x_accent_bg" style="width:100%;font-weight:bold;height:50px" value="<?php print $lang['testconn'];?>" onclick="test_conn()" />
</div>


<div id="mysqli_submit" style="display:none">
<hr />
<div style="text-align:center;font-weight:bold"><?php print $lang['dbok'];?></div>
<br /><hr />
<input type="button" class="round4 x_bcolor_bg" style="width:100%;font-weight:bold;height:50px" value="<?php print $lang['next'];?>" onclick="document.forms[0].submit()" />
</div>

</div>
</form>

<script type="text/javascript">

function http_obj(){
if(typeof window.external=='object' && typeof document.all=='object'){
r=new ActiveXObject("Microsoft.XMLHTTP")}
else{r=new XMLHttpRequest()}return r}

function test_conn(x){
f=document.forms[0]
s='dbhost='+f.dbhost.value+'&dbname='+f.dbname.value+'&dbuser='+f.dbuser.value+'&dbpass='+f.dbpass.value+'&dbsock='+f.dbsock.value;
htto=http_obj(); htto.open('post','testcon.php');
htto.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
htto.onreadystatechange=ans; htto.send(s);}

function ans(){
if(htto.readyState==4){
response=htto.responseText.toString()
if(response!='1'){alert(response);return}
if(response=='1'){document.getElementById('whole_form').style.display='none'; document.getElementById('mysqli_submit').style.display='block'}
}}


document.forms[0].reset()
window.onunload=function(){}
</script>
</body>
</html>