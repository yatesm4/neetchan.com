<pre><?php

require_once 'config.php';
require_once 'incl/main.inc';

dbconnect();$settings=get_settings(0);

$hist_msg=$settings['mssg_history']*3600;$hist_msg=$timestamp-$hist_msg;

// -----

$query='DELETE FROM '.$dbss['prfx']."_iplog WHERE timestamp<$hist_msg";
neutral_query($query);

// -----

$query='DELETE FROM '.$dbss['prfx']."_lines WHERE timestamp<$hist_msg";
neutral_query($query);

$affr=neutral_affected_rows();
print 'messages deleted: '.$affr."\n";

// -----

$query='SELECT p_id FROM '.$dbss['prfx']."_paintings WHERE timestamp<$hist_msg AND usr_id>0";
$result=neutral_query($query);
while($row=neutral_fetch_array($result)){@unlink('./paintings/'.$row['p_id'].'.png');}

$query='DELETE FROM '.$dbss['prfx']."_paintings WHERE timestamp<$hist_msg AND usr_id>0";
neutral_query($query);

$affr=neutral_affected_rows();
print 'paintings deleted: '.$affr."\n";

// -----

if($settings['del_gbuddies']!='0'){
$query='DELETE FROM '.$dbss['prfx']."_users WHERE usr_mail=''";
neutral_query($query);

$affr=neutral_affected_rows();
print 'guest names deleted: '.$affr."\n";}

// -----

if($settings['optimize_tbl']!='0'){

$dbt=array('lines','users');

while(list($key,$val)=each($dbt)){
$val=$dbss['prfx'].'_'.$val;
$query='OPTIMIZE TABLE '.$val;
neutral_query($query);}

print 'DB optimized';}

// -----


$total_time=time_to_run();$total_time=substr(($total_time-$start_time),0,5);
print "\n---------------------\n".'done / ' .$total_time.' sec';

?></pre>