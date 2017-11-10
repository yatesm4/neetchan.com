/******************************************************************************/
// Name:          lounge.js
// Created:       October 12th, 2017
// Description:
//		functions for the lounge appframe
/******************************************************************************/


function loungeView(){

	// iframe to hold the blab chat client
	var view = '<iframe class="lounge-chat" src="http://neetchan.com/blab/login.php"></iframe>';
	var showAdminView = '<hr/><input type="button" class="show-admin-chat-panel" name="show-admin-chat-panel" value="SHOW ADMIN PANEL"><br><br>';
	var adminPanel = '<iframe class="admin-chat-panel" src="http://neetchan.com/blab/admin.php"></iframe>';
	return view + showAdminView + adminPanel;
}
