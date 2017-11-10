<?php
require_once 'config.php';
require_once 'incl/main.inc';

dbconnect(); $settings=get_settings(0); $options=get_options(); $lang=get_language(); 

$title=$settings['title']; $txt='';

/* --- */

if(isset($_COOKIE['blab_xuidc'])){
$uid=explode('z',$_COOKIE['blab_xuidc']);
if(isset($uid[1]) && hsh($uid[0].$settings['cookie_salt'])==$uid[1]){$uid=(int)$uid[0];}else{$uid=0;}}

$query='SELECT ban_reason FROM '.$dbss['prfx'].'_ban WHERE ban_ip=\''.$_SERVER['REMOTE_ADDR'].'\' OR ban_id='.$uid.' ORDER BY timestamp ASC';
$result=neutral_query($query);

while($row=neutral_fetch_array($result)){$txt.='<div>';$txt.=htmrem($row['ban_reason']);$txt.='</div>';}

include 'ui/templates/head.pxtm';
print '<body class="blab bgcolor_overal body_extra"><div style="margin:50px">';
print '<div><b>'.$lang['r_ban'].'</b></div>'.$txt;
print '</div></body></html>';
?>