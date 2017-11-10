/******************************************************************************/
// Name:          start.js
// Created:       October 12th, 2017
// Description:
//		functions for the start appframe
/******************************************************************************/


function welcomeView(){

    //--------------------------------------------------------------------------------------
    // display basic information about neetchan

	var head = "<div class='ui-window-content appframe-content'>";

	var body = "<div class='ui-window-content appframe-content-head'><h3>Welcome to Neetchan.</h3><hr/><p>Neetchan aims to be the future of project management systems. Providing a more user friendly experiencing to make management of even the most complex projects easier.</p><p>Enjoy some radio to keep your workday relaxed.</p></div>";

	// relaxing video will be randomly assigned an embeded youtube video which contains a radio station/mix/playlist
	var relaxing_video;

	// grab random number
	var radio_lottery = Math.round((Math.random()) * 10);

	switch(radio_lottery){
		case 0:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/Plr0oPRuAOs?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 1:
			relaxing_video = "<div class='ui-window-content appframe-content-head'><iframe width='560' height='315' src='https://www.youtube.com/embed/hX3j0sQ7ot8?autoplay=1' frameborder='0' allowfullscreen></iframe></div>";
			break;
		case 2:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/6oOu6sssqOw?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 3:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/J9-cqXA1ZiY?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 4:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/Uij-45d4wIs?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 5:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/eSjSozKL_EA?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 6:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/afxE07fz18I?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 7:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/VmLfeqkhfHI?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 8:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/HD8FHT4R4mI?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 9:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/1GGxzSPP0J0?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		case 10:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/2L9vFNMvIBE?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
		default:
			relaxing_video = '<div class="ui-window-content appframe-content-head"><iframe width="560" height="315" src="https://www.youtube.com/embed/vq9t4zjG8v4?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';
			break;
	}

	var foot = "</div>";

	var view = head + body + relaxing_video + foot;

	return view;


}

function todayInfoView(){

	// display info about 'today'

	var head = "<div class='ui-window-content appframe-content'>";

	var body = "<div class='ui-window-content appframe-content-head welcome-user' id='welcome-user'></div>";

	var foot = "</div>";

	var view = head + body + foot;

	return view;


}

function newNetworkForm(ip){

	// form for new user request / creation

	body = "<h1>Network Request Form</h1><hr/><form class='newNetworkCreateForm'>";

	body += "<p>Network Nickname:</p><input type='text' name='network-name' placeholder='NETWORK NICKNAME' required>" +
			"<p>IP Address:</p><input name='network-ip' value='" + ip + "' disabled><p>Your IP address will be used as the network to be approved.</p>" +
    		"<input type='button' class='btn-new-network-create' name='new-network-create-btn' value='CONFIRM NETWORK REQUEST'>";

	body += "</form>";

	return body;

}

function newUserForm(ip){

	// form for new user request / creation

	body = "<h1>New User Form</h1><hr/><form class='newUserCreateForm'>";

	body += "<p>Name:</p><input type='text' name='user-name' placeholder='FIRST & LAST NAME' required>" +
			"<p>IP Address:</p><input name='user-ip' value='" + ip + "' disabled><p>Your IP address will be used to associate your location with your account.</p>" +
    		"<p>User Role:</p><select class='select-user-role' name='user-role' required></select><br><br>" +
    		"<input type='button' class='btn-new-user-create' name='new-user-create-btn' value='REQUEST USER CONFIRMATION'>";

	body += "</form>";

	return body;

}

function loadStartData(){
	//--------------------------------------------------------------------------------------
  // get data for today / start
  var logged_in = false;
	var username;
	var userid;

	$.ajax({
				type: 'POST',
				url: 'http://neetchan.com/server/check-network.php',
				success: function(data) {
					console.log("POST:check-network SUCCESS");
					console.log("check-network:data: " + JSON.stringify(data));
					network = data.split('|');

					var dateText;
					var date = new Date();

					// get teh date
					dateText = (date.getMonth() + 1) + "/";
					dateText += date.getDate() + "/";
					dateText += date.getFullYear();

					var info = document.getElementById('welcome-user');

					if(network[0] === 'false'){
						// user doesnt exist

						// input model: false| error_code: ip_address

						ip = network[1].split(':');
						ip = ip[1].trim();

						console.log('Network IP: ' + ip);
						console.log('Network Status: ' + network[0] + '|Network Does Not Exist');

						info.innerHTML = "<h1>Network Not Found</h1><hr/><p>Unfortunately, we could not find an approved network associated with your IP address:</p><p>" + ip + "</p><p>Please, try again later or contact an administrator.</p>";
						info.innerHTML += "<h3>Alternatively:</h3>";
						info.innerHTML += "<p>You can fill out the following network request form and wait to be confirmed by an administrator.</p><br>";
						var form = newNetworkForm(ip);
						info.innerHTML += form;
						//populateSelectUserRole();

					} else {
						// network exists

						console.log('Network Exists: ' + network[1] + '.');

						// input model: true|true:false|network_data

						if(network[1] === 'false'){
							// no network exists, but a network request exists
							console.log('Network Request Found.');
							// true|false|user_data
							network_data = network[2].split(':');
							// confirmed : req_id : ip : name : role : timestamp

							// check if confirmed or not
							if(!network_data[0] === 0){
								// network is confirmed
								// however no actual network exists yet
								console.log('ERROR: Network is confirmed; however, no actual network exists yet.');
								info.innerHTML = "<h1>Welcome Back</h1><hr/><p>Hello" + network_data[3] + ", today is " + dateText + ".</p><p>Your network request has been confirmed by an administrator; however, a new network has yet to be made. Please be patient while an administrator creates your new network.</p><hr/>";
								info.innerHTML += "<p>Network Request IP: " + network_data[2] + "</p><p>Requested: " + network_data[4] + network_data[5] + network_data[6] +"</p>";
							} else {
								// network request hasnt been confirmed yet
								console.log('Network request has not been confirmed yet. Please wait for admin confirmation.');
								info.innerHTML = "<h1>Welcome Back</h1><hr/><p>Hello, today is " + dateText + ". Your network request has not been confirmed yet. Please be patient until an administrator confirms your network request.</p><hr/>";
								info.innerHTML += "<p>Network Request IP: " + network_data[2] + "</p><p>Requested: " + network_data[4] + network_data[5] + network_data[6] +"</p>";
							}
						} else {
							// network exists


							// TODO
							//
							//	MANY A THING

							//  SAVE IN LOCAL STORAGE OR SESSION STORAGE?

							// true|true| id : name : role : ip
							network_data = network[2].split(':');

							console.log('Network exists in the networks table: ' + network[2] + '.');
							console.log('Saving to session storage...');

							var signal = sessionStorage.getItem('network-in');

							if(signal){

								// DO SOMETHING HERE

								// if logged in
								info.innerHTML = "<h1>" + network_data[1] + " is an Approved Network.</h1><hr/><p>Please login to your NeetChan user account.</p><p>Network IP: " + network_data[1] + "</p><p>Network Name: " + network_data[2] + "</p><br>";
							} else {
								// not logged in
								sessionStorage.setItem('network-in', true);
								console.log('network-in session storage var set to true.');
								info.innerHTML = "<h1>Welcome, " + network_data[1] + "</h1><hr/><p>This network has been approved. You may now login to your NeetChan user account.</p><p>Network IP: " + network_data[1] + "</p><p>Network Name: " + network_data[2] + "</p><br>";
							}

							// TODO check if user is logged in !?
							$.ajax({
						    		type: 'POST',
						    		url: 'http://neetchan.com/server/check-login-status.php',
						    		success: function(data) {
						    			console.log("POST:loginStatus SUCCESS");
						    			console.log("loginStatus:data: " + JSON.stringify(data));

											var info = document.getElementById('welcome-user');

											var dateText;
											var date = new Date();

											// get teh date
											dateText = (date.getMonth() + 1) + "/";
											dateText += date.getDate() + "/";
											dateText += date.getFullYear();

											// check if user is valid
											var network = [];
											var network_data;
											var ip;

						    			// split the incoming data by '|'
						    			var status = data.split('|');

						          if(status[0] == "true"){
						            //user is logged in
						            logged_in = true;
												username = status[1];
												userid = status[2];
												console.log("Username: " + username);
												info.innerHTML += "<h1>Welcome back, " + username + "</h1><hr/><br>";
												info.innerHTML += "<p>You are currently logged in as <a href='#'>" + username + "</a>.</p>";
												info.innerHTML += "<p>Is this correct? </p><input type='button' class='btn-logout' value='LOG OUT'>";
						          } else {
						            //user isn't logged in
												// dislay log in form
												info.innerHTML += "<br><h1>User Login</h1><hr/><br>";
												var login_form = "<form class='user-login-form' name='user-login-form'><h3>Enter Your Login Details or Create an Account</h3><br>";

												login_form += "USERNAME:    <input type='text' maxlength='20' name='username' required><br><br>";
												login_form += "PASSWORD:    <input type='password' maxlength='20' name='password' required><br>";
												login_form += "<p>Passwords must be at least 8 characters in length (max of 20), contain at least one uppercase and lowercase letter, one number, and one special character.</p>";
												login_form+= "<input type='button' class='btn-login' name='btn-login' value='LOGIN'>&emsp;<input type='button' class='btn-create-acc' name='btn-create-acc' value='CREATE ACCOUNT'><br><br>";

												login_form += "</form>";

												info.innerHTML += login_form;
						          }

						    		},
						    		error: function(data) {
						    			console.log("POST:loginStatus FAILED");
						    			console.log("loginStatus:data NOT FOUND: " + JSON.stringify(data));
						          var info = document.getElementById('welcome-user');
											info.innerHTML += "<br><h1>User Login</h1><hr/><br>";
											var login_form = "<form class='user-login-form' name='user-login-form'><h3>Enter Your Login Details or Create an Account</h3><br>";

											login_form += "USERNAME:    <input type='text' maxlength='20' name='username' required><br><br>";
											login_form += "PASSWORD:    <input type='password' maxlength='20' name='password' required><br><br>";
											login_form+= "<input type='button' class='btn-login' name='btn-login' value='LOGIN'>&emsp;<input type='button' class='btn-create-acc' name='btn-create-acc' value='CREATE ACCOUNT'><br><br>";

											login_form += "</form>";

											info.innerHTML += login_form;
						    		}
						    });

						}

						// DO SOMETHING HERE ?
					}

				},
				error: function(data) {
					console.log("POST:check-network FAILED");
					console.log("check-network:data: " + JSON.stringify(data));
				}
		});
}

function startView(){

	//--------------------------------------------------------------------------------------
    // create start view comprised of different start-info functions

	loadStartData();

	var welcome = welcomeView();
	var today = todayInfoView();
	var body = welcome + today;
	console.log("Welcome to neetchan.");
	return body;
}

function neetchanView(){

	var view = welcomeView();

	return view;

}
