<?php 

if(!isset($_POST['acpkey1'])){print '</body></html>';die();}

require_once('../config.php');
require_once('lang_english.utf8');
require_once('../incl/mysqli_functions.inc');

neutral_dbconnect();
function process_error($x){print $x;die();}
function hsh($a){global $salt;$a=md5(md5($a).$salt);return $a;}

$acpkey=hsh($_POST['acpkey1']);

neutral_query('UPDATE '.$dbss['prfx']."_settings SET set_value='$acpkey' WHERE set_id='acp_key'");

?>

<!DOCTYPE html>
<html>

<head><title>...</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="stylesheet" type="text/css" href="style.css" />
</head>

<body class="x_global x_overal">
<div class="holder" style="margin-top:100px;font-weight:bold;text-align:center">
<hr />
<?php print $lang['inst_ok'];?>
<br /><br /><hr />
</div>
</body>
</html>