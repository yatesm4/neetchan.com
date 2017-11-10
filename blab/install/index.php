<?php require_once('lang_english.utf8'); ?>

<!DOCTYPE html>
<html>

<head><title><?php print $lang['installing'];?></title>
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
if(!@function_exists('mysqli_query')){?>
<div class="holder x_accent_bg round4" style="text-align:center;padding:50px">
<?php print $lang['mysqli_nps'];?>
</div></body></html>
<?php die();}?>

<div class="holder" style="margin-top:50px">
<hr />

<div style="text-align:center">
<?php print $lang['tests_ok'];?>
</div>
<br /><hr />

<form action="step1.php" method="post">
<input type="hidden" name="start" value="1" />
<input type="submit" class="round4 x_bcolor_bg" style="width:100%;font-weight:bold;height:50px" value="<?php print $lang['next'];?>" />
</form>

</div>
</body>
</html>