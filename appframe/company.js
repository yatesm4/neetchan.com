/******************************************************************************/
// Name:          company.js
// Created:       October 12th, 2017
// Description:
//		functions for the company appframe
/******************************************************************************/

function populateSelectUserRole(optional_arg){
	// if no optional = set false
	if (typeof optional_arg === 'undefined') { optional_arg = 'false'; }

	// optional_arg is for an optional view in getUsersInfo to display users based on group
	// the optional_arg in this case sets the select to automatically be set to the last
	// selected role-group

	// populate selects for user role with roles from db

	var select = document.getElementsByClassName("select-user-role");
	roles = new Array();
	role = new Array();

	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-roles.php',
    		success: function(data) {
    			console.log("POST:roleData SUCCESS");
    			// split the incoming data by '|', and make each result an element in the projects array
    			console.log("roleData:data: " + JSON.stringify(data));
    			roles = data.split('|');

    			// TODO
    			//	ADD VIEW ALL USERS OPTION TO SELECT
    			//	FOR NOW AFTER YOU SELECT A GROUP
    			//	YOU CANT VIEW ALL USERS AGAIN :(

    			for(var i=0;i<(roles.length - 1);i++){
    				role = roles[i].split(':');

    				if(role[0] == optional_arg){
    					$('.select-user-role').append($('<option>', {
    						value: role[0],
    						text: role[1],
    						selected: true
    					}));
    				} else {
    					$('.select-user-role').append($('<option>', {
    						value: role[0],
    						text: role[1]
    					}));
    				}
    			}


    		},
    		error: function(data) {
    			console.log("POST:roleData FAILED");
    			console.log("roleData:data NOT FOUND: " + JSON.stringify(data));
    		}
    });

}







function getNetworkReqs(optional_arg){

	console.log('Loading new network requests....');
	// if no optional = set false
	if (typeof optional_arg === 'undefined') { optional_arg = 'false'; }


	// retrieve network info from the db for display (primarily in the company view)
	if(optional_arg == 'false'){
		// if default load
		$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-network-reqs.php',
    		success: function(data) {
    			console.log("POST:network-reqs SUCCESS");
    			// split the incoming data by '|', and make each result an element in the projects array
    			console.log("network-reqs:data: " + JSON.stringify(data));
    			var networks = data.split('|');

    			var network = [];
    			views = document.getElementsByClassName("network-reqs-list-display");

    			for(var i=0;i<views.length;i++){
    				// applying view to every div with matching class makes it update all divs open

    				views[i].innerHTML = "<h3>Pending Confirmation: " + (networks.length - 1) +"</h3>";

    				for(var j=0;j<(networks.length - 1);j++){
    					// get each element of the users array and break it into traits by splitting at ':'
    					network = networks[j].split(':');

    					views[i].innerHTML += "<h4>" + network[1] + "</h4>";
    					views[i].innerHTML += "<p>Request ID: " + network[0] + "</p>";
    					views[i].innerHTML += "<p>IP Address: " + network[2] + "</p>";
    					views[i].innerHTML += "<p>Requested:</p><p>" + network[4] + ":" + network[5] + ":" + network[6] + "</p>";
    					views[i].innerHTML += "<form class='confirmNetworkReqForm'><input type='hidden' value='" + network[0] + "' name='requestID'><input type='button' class='btn-confirm-netreq' name='btn-confirm-netreq' value='CONFIRM NETWORK REQUEST'></form><br><br>";
    				}
    				views[i].innerHTML += "<hr />";
    			}
    		},
    		error: function(data) {
    			console.log("POST:network-reqs FAILED");
    			console.log("network-reqs:data NOT FOUND: " + JSON.stringify(data));
    		}
    	});
	} else {
		// if load users by group
		// (meaning optional_arg is true)
    $.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-network-reqs.php',
    		success: function(data) {
    			console.log("POST:network-reqs SUCCESS");
    			// split the incoming data by '|', and make each result an element in the projects array
    			console.log("network-reqs:data: " + JSON.stringify(data));
    			var networks = data.split('|');

    			var network = [];
    			views = document.getElementsByClassName("network-reqs-list-display");

    			for(var i=0;i<views.length;i++){
    				// applying view to every div with matching class makes it update all divs open

    				views[i].innerHTML = "<h3>Pending Confirmation: " + (networks.length - 1) +"</h3>";

    				for(var j=0;j<(networks.length - 1);j++){
    					// get each element of the users array and break it into traits by splitting at ':'
    					network = networks[j].split(':');

    					views[i].innerHTML += "<h4>" + network[1] + "</h4>";
    					views[i].innerHTML += "<p>Request ID: " + network[0] + "</p>";
    					views[i].innerHTML += "<p>IP Address: " + network[2] + "</p>";
    					views[i].innerHTML += "<p>Requested:</p><p>" + network[4] + ":" + network[5] + ":" + network[6] + "</p>";
    					views[i].innerHTML += "<form class='confirmNetworkReqForm'><input type='hidden' value='" + network[0] + "' name='requestID'><input type='button' class='btn-confirm-netreq' name='btn-confirm-netreq' value='CONFIRM NETWORK REQUEST'></form><br><br>";
    				}
    				views[i].innerHTML += "<hr />";
    			}
    		},
    		error: function(data) {
    			console.log("POST:network-reqs FAILED");
    			console.log("network-reqs:data NOT FOUND: " + JSON.stringify(data));
    		}
    	});
	}


}

function getUsersInfo(optional_arg){
	// if no optional = set false
	if (typeof optional_arg === 'undefined') { optional_arg = 'false'; }


	// TODO
	//	REWRITE THIS FUNCTION TO NOT USE HEAVY AMOUNTS OF DUPLICATE CODE
	//	LIKE COME ON MATT THIS IS JUST LAZINESS AT ITS CORE



	// retrieve user info from the db for display (primarily in the company view)
	if(optional_arg == 'false'){
		// if default load
		$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-users.php',
    		success: function(data) {
    			console.log("POST:usersData SUCCESS");
    			// split the incoming data by '|', and make each result an element in the projects array
    			console.log("usersData:data: " + JSON.stringify(data));
    			var users = data.split('|');

    			user = new Array();
    			views = document.getElementsByClassName("users-list-display");

    			populateSelectUserRole();

    			for(var i=0;i<views.length;i++){
    				// applying view to every div with matching class makes it update all divs open

    				views[i].innerHTML = "<h3>Users: " + (users.length - 1) +"</h3><hr />";

						views[i].innerHTML += "<p>Filter Group:</p><select class='select-user-role view-users-by-group' name='select-users-by-group'></select>";

    				for(var j=0;j<(users.length - 1);j++){
    					// get each element of the users array and break it into traits by splitting at ':'
    					user = users[j].split(':');

    					var group = user[2];

    					console.log(group);
    					// define user group based on [2] trait
    					switch(user[2]){
    						case '0':
    							//admin
    							group = "Admin";
    							break;
    						case '1':
    							// manager
    							group = "Manager";
    							break;
    						case '2':
    							// developer
    							group = "Developer";
    							break;
    						case '3':
    							// designer
    							group = "Designer";
    							break;
    						case '4':
    							// tester
    							group = "Tester";
    							break;
    						default:
    							// NA
    							group = "N/A";
    							break;
    					}

    					views[i].innerHTML += "<h4><a href='#' class='user-list-a' data-uid='" + user[0] + "'>" + user[1] + "</a></h4>";
    					views[i].innerHTML += "<p>Role: <strong>" + group + "</strong></p>";
    				}
    				views[i].innerHTML += "<hr />";
    			}
    		},
    		error: function(data) {
    			console.log("POST:usersData FAILED");
    			console.log("usersData:data NOT FOUND: " + JSON.stringify(data));
    		}
    	});
	} else {
		// if load users by group
		// (meaning optional_arg is true)
		$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-users-by-group.php',
    		data: 'group=' + optional_arg,
    		success: function(data) {
    			console.log("POST:usersByGroupData SUCCESS");
    			// split the incoming data by '|', and make each result an element in the projects array
    			console.log("usersByGroupData:data: " + JSON.stringify(data));
    			var users = data.split('|');

    			user = new Array();
    			views = document.getElementsByClassName("users-list-display");

    			populateSelectUserRole(optional_arg);

    			for(var i=0;i<views.length;i++){
    				// applying view to every div with matching class makes it update all divs open

    				views[i].innerHTML = "<h3>Users: " + (users.length - 1) +"</h3><hr />";

    				views[i].innerHTML += "<p>Filter Group:</p><select class='select-user-role view-users-by-group' name='select-users-by-group'></select>";

    				for(var j=0;j<(users.length - 1);j++){
    					// get each element of the users array and break it into traits by splitting at ':'
    					user = users[j].split(':');

    					var group = user[2];

    					// define user group based on [2] trait
    					switch(user[2]){
    						case '0':
    							//admin
    							group = "Admin";
    							break;
    						case '1':
    							// manager
    							group = "Manager";
    							break;
    						case '2':
    							// developer
    							group = "Developer";
    							break;
    						case '3':
    							// designer
    							group = "Designer";
    							break;
    						case '4':
    							// tester
    							group = "Tester";
    							break;
    						default:
    							// NA
    							group = "N/A";
    							break;
    					}

    					views[i].innerHTML += "<h4>" + user[1] + "</h4>";
    					views[i].innerHTML += "<p>ID: <strong>" + user[0] + "</strong> | Role: <strong>" + group +"</strong></p>";
    				}
    				views[i].innerHTML += "<hr />";
    			}
    		},
    		error: function(data) {
    			console.log("POST:usersByGroupData FAILED");
    			console.log("usersByGroupData:data NOT FOUND: " + JSON.stringify(data));
    		}
    });
	}
}

function displayUsers(){
	// function call to display the data from getUsersInfo() - (primarly to be called in companyInfoView())


	// get user data
	getUsersInfo();

	var view = "<div class='ui-window-content appframe-content-body users-list-display'></div>";

	return view;
}

function getCompanyProjectsInfo(){
	// script to hold the ajax call to retrieve data for the view
	projects = new Array();
	project = new Array();
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-projects.php',
    		success: function(data) {
    			console.log("POST:viewProjects SUCCESS");
    			// split the incoming project data by '|', and make each result an element in the projects array
    			projects = data.split('|');
    			console.log("viewProjects:data: " + projects);

    			// grab the container element in the projects app frame
    			views = document.getElementsByClassName("company-projects-display");

    			//add each project in the array to the app frame
    			for (var j=0; j < views.length; j++){
    				views[j].innerHTML += "<h3>Projects Count: " + (projects.length - 1) +"</h3><hr />";
    				views[j].innerHTML += "<h4>Most Recent Projects:</h4>";
    				for(var p=0;p<3;p++){
    					if(projects[p]){
    						project = projects[p].split(':');
    						views[j].innerHTML += "<strong><a href='#' class='project-view-a' data-uid='" + project[1] +"'><p>" + project[0] + "</p></a></strong>";
    					} else {
    						views[j].innerHTML += "<p>No Project Data</p>";
    					}
    				}
    				views[j].innerHTML += "<hr />";
    			}
    		},
    		error: function(data) {
    			console.log("POST:viewProjects FAILED");
    			console.log("viewProjects:data NOT FOUND: " + JSON.stringify(data));
    		}
    });
}

function companyProjects(){
	// function call to display quick info about projects in the company db

	// get project data
	getCompanyProjectsInfo();

	var view = "<div class='ui-window-content appframe-content-body appframe-content-body-right company-projects-display'></div>";

	return view;


}

function createUserForm(){
	var form = "<div class='ui-window-content appframe-content-head'><h1>Create User</h1><hr/></div><div class='ui-window-content appframe-content-body create-user-form'>";
	form += "<form class='userCreateForm'><p>Enter user account information below.</p><input type='text' name='username' placeholder='USERNAME' required><br><br>" +
					"<input type='password' name='password' placeholder='PASSWORD' required><br><br>" +
					"<select class='select-user-role' name='user-role' required></select><br><br><br>" +
					"<input type='button' class='button-user-create' name='create-user-button' value='CREATE USER'></form></div>";
	return form;
}

function companyView(role){

	// basic company info view
	var head = "<div class='ui-window-content appframe-content'>";

	var body = "<div class='ui-window-content appframe-content-head'><h1>Neetchan Company Profile</h1><hr/></div>";

  var netreqs = "<div class='ui-window-content appframe-content-body network-reqs-list-display'></div>";

	var netreqs_head = "<div class='ui-window-content appframe-content-head'><h1>Network Requests</h1><hr/></div>";

	var body_seg_2 = displayUsers();

	var body_seg_3 = companyProjects();

	var foot = "</div>";

	var view = head + body + body_seg_2 + body_seg_3 + foot;

	if(role == 0){
		console.log("Loading admin company view.");
		view += head + createUserForm() + foot + head + netreqs_head + netreqs + foot;
		getNetworkReqs();
	}
	console.log('View-Projects View loaded.');
	console.log('Company View loaded.');
	return view;
}
