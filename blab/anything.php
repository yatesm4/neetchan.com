<?php

require_once 'config.php';
require_once 'incl/main.inc';
include 'lang/english_admin.utf8';

dbconnect();$settings=get_settings(0);

$title=$lang['acp_rst0'];
include 'admin/head.pxtm';

if(isset($_POST['acpkey_reset'])){

$pass='';$alphabet='abcdefghijklmnopqrstuvwxyz1234567890';
for($i=0;$i<8;$i++){$pass.=$alphabet[(mt_rand(0,(strlen($alphabet)-1)))];}
$acp_key=hsh($pass);

$query='UPDATE '.$dbss['prfx']."_settings SET set_value='0' WHERE set_id='wrong_acp'";
neutral_query($query);

$query='UPDATE '.$dbss['prfx']."_settings SET set_value='$acp_key' WHERE set_id='acp_key'";
neutral_query($query);
print '<body><div style="text-align:center"><div class="mainbox" style="margin-top:150px;text-align:center;padding:20px">'.$lang['acp_rst2'].' <h2>'.$pass.'</h2>';
print '<br /><br /><b><a href="admin.php">'.$lang['next'].'</a></b></div></div></body></html>';
die();}

?>

<body>
<form action="#" method="post">
<div style="text-align:center">
<div class="mainbox" style="margin-top:150px;text-align:center;padding:20px">
<?php print $lang['acp_rst1'];?>&nbsp;
<input type="hidden" name="acpkey_reset" value="1" />
<input class="btn" type="submit" value="<?php print $lang['acp_rst0'];?>" />
</div></div></form>
</body></html>