/******************************************************************************/
// Name:          extra.js
// Created:       October 12th, 2017
// Description:
//		extra functions for appframes
/******************************************************************************/

// functions for failure view --------------------------------------------------

function failureView(){
  // display fail screen in case of exceptions and what not in appframe

	var head = "<div id='failure-view' class='ui-window-content appframe-content ui-missing'>";

	var body = "<div class='ui-window-content appframe-content-head'><h3>Failed to load appframe.</h3><hr/><p>We will try to fix this issue as soon as possible.</p><br><br><p>In the meantime, go outside or something.</p></div>";

	var foot = "</div>";

	var view = head + body + foot;

	return view;


}

// functions for code/test view ------------------------------------------------

function codeView(){
	var view = failureView();
	return view;
}

// functions for vault/file-manager view ---------------------------------------

function vaultView(){
	var view = failureView();
	return view;
}
