<?php

if(!isset($settings['int_version']) || $settings['int_version']<84){
print 'You cannot upgrade your database from a version prior to 8.4';
die();}

$updt=array();

// 9.0/9.1 begin

if($settings['int_version']<91){
	
$updt[]='UPDATE '.$dbss['prfx']."_settings SET set_value='td,p,div,input,select,textarea{font-size:[15];font-family:[3];text-align:left}
input,select,textarea{color:#[13];background-color:#[14];padding:2px;border-width:0px;box-sizing:border-box}
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
.oo{font-weight:bold;line-height:15px;white-space:nowrap;color:#[4];margin-left:8px}' WHERE set_id='style_template'";
}

// 9.0/9.1 end

for($i=0;$i<count($updt);$i++){neutral_query($updt[$i]);}

// update version
$query='UPDATE '.$dbss['prfx']."_settings SET set_value='$int_version' WHERE set_id='int_version'";
neutral_query($query);

?>