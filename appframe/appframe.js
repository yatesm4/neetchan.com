/******************************************************************************/
// Name:          appframe.js
// Created:       October 12th, 2017
// Description:
//		functions for the appframe
/******************************************************************************/

function appframe(key, optional_arg, optional_arg_2){

	// if there isn't an optional arg passed, set to default
	if (typeof optional_arg === 'undefined') { optional_arg = 'false'; console.log('No optional arg passed to appframe.'); }
	if (typeof optional_arg_2 === 'undefined') { optional_arg_2 = 'false'; console.log('No optional arg2 passed to appframe.'); }
	//optional args are used to open meta appframes (info, extensions of information, etc)
	//optional args 2 represent key info to be passed with optional args (project keys, etc)

	//generate window id
	var num = Math.floor(Math.random() * 12) + 1;
	var view_count = 0;
	var views = document.getElementsByClassName("ui-window-content");
	for(var i=0;i<views.length;i++){
		view_count++;
	}
	var window_id = (num + view_count) * (2 + key);
	console.log("WindowID generated: " + window_id);

  var signal = false;
	// load user login information
  $.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/check-login-status.php',
    		success: function(data) {
    			console.log("loginStatus:data: " + JSON.stringify(data));

					var view;

    			// split the incoming data by '|'
    			var status = data.split('|');

					if(status[0] == "true"){
						//user is logged in
						var logged_in = true;
						var username = status[1];
						var userid = status[2];
						var role = status[3];
						console.log("Loading Appframe for Username: " + username);
						if(optional_arg === 'false'){
				  		if(key == 1){
				  			view = neetchanView();
				  		}else if(key == 2){
				  			view = companyView(role);
				  		}else if (key == 3){
				  			view = projectsView();
				  		}else if (key == 4){
				  			view = tasksView();
				  		}else if (key == 5){
				  			view = codeView();
				  		}else if (key == 6){
				  			view = vaultView();
				  		}else if (key == 7){
				  			view = loungeView();
				  		}else if (key == 8){
				  			view = profileView();
				  		}else if (key == 0){
				  			view = startView();
				  		}
				  	} else {
				  		if(key == 1){
				  			view = neetchanView();
				  		}else if(key == 2){
				  			view = companyView(role);
				  		}else if (key == 3){
				  			view = projectsView(optional_arg);
				  		}else if (key == 4){
				  			view = tasksView(optional_arg);
				  		}else if (key == 5){
				  			view = codeView();
				  		}else if (key == 6){
				  			view = vaultView();
				  		}else if (key == 7){
				  			view = loungeView();
				  		}else if (key == 8){
				  			view = profileView(optional_arg);
				  		} else {
				  			view = failureView();
				  		}
				  	}
          } else {
            //user isn't logged in
            view = startView();
          }

					var window = document.getElementById(window_id);
					window.innerHTML = view;

    		},
    		error: function(data) {
    			console.log("POST:loginStatus FAILED");
    			console.log("loginStatus:data NOT FOUND: " + JSON.stringify(data));
          view = failureView();
    		}
    });
  //var signal = true;

	// appframe template window for displaying/accessing app information

	console.log('creating app frame...');

	var head = '<div id="ui-window" class="ui-window draggable" style="z-index: ' + appZ + ';"><div class="ui-window-container"><div id="cssmenu" name="nav-window" class="ui-window-nav"><ul><li class="window-nav"><a href="#"><span><i class="fa fa-caret-square-o-down"></i> Exit</span></a></li></ul></div><div class="ui-window-content">';

	// appframes are broken up into html pieces that are all called later on for a return=>append to view

	console.log('app frame key value: ' + key + '...');


	var bottom = '</div></div></div>';

	return head + '<div id="' + window_id + '" class="ui-window-content ' + window_id + '"></div>' + bottom;

	// return a container div that holds the view=>html for the appframe
}
