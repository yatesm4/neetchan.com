/******************************************************************************/
// Name:          functions.js
// Created:       August 18th, 2017
// Description:
//      general tool functions, as well as most of the document.ready functions
//      (event listeners, button clicks, etc) - thats most of what you'll find
//      in this script. it was originally combined with appframe-functions.js
//      but was moved for organization purposes.
/******************************************************************************/


// tool functions

function findHighestZIndex()
{
  var maxZ = Math.max.apply(null,
    $.map($('body *'), function(e,n) {
      if ($(e).css('position') != 'static')
        return parseInt($(e).css('z-index')) || 1;
  }));
  return maxZ;
}


// things to run on page load
// ie. event listeners

$(document).ready(function(){

	appZ = 1;

	// apply start view on page load
	var start = appframe(0);
	$(".content").append(start);


	//appendTo: ".ui-window"
	$(".draggable").draggable({
		stack: ".draggable",
		containment: "body"
	});

	// load event listeners and such

	// on clickin a nav item from the top menu, load a window via key
	$('.nav-item')
		.click(function(){
			var key = $(this).data("uid"); // get key from data-uid per nav-item
			var app = appframe(key); // get frame html
			$(".content").append(app); // append to view

			// draggable is a jquery plugin for dragging divs around
			$(".draggable").draggable({
				stack: ".draggable",
				containment: "body",
			});
			console.log('app frame running...');
	});

	// project app frame menu logic
	$(document).on('click', '.project-nav-item', function(){
		var key = $(this).data("uid"); // get form key to load
		console.log(key);
		$(this).parent().parent().parent().toggle(); // hide calling form
		if(key == 1){
			// load 'create project' form
			$('.create-project-form-container').toggle();
			console.log('opening create project form container...');
		} else if (key == 2){
			// load 'estimation worksheet' form
			$('.estimator-form-container').toggle();
			console.log('opening estimator form container...');
		} else if (key == 3){
			$('.coming-soon-form-container').toggle();
			console.log('opening coming soon form container...');
			// coming soon
		}
	});

  $(document).on('click', '.user-list-a', function(){

		console.log('User clicked... loading profile...');
		var userid = $(this).data("uid"); // get userid from view
		var app = appframe(8, userid); // call appframe function and pass userid for profile view
		$(".content").append(app); // append to view

		// draggable is a jquery plugin for dragging divs around
		$(".draggable").draggable({
			stack: ".draggable",
			containment: "body",
		});

		console.log('project meta:app frame running...');
	});

	$(document).on('click', '.project-view-a', function(){

		// the project key is sent to the appframe from the links data-uid,
		// from there its used to create a unique container to hold project information
		// and also send an ajax request to server for info based on the project key

		// having a project key as an optional_arg when calling the appframe and other
		// functions also serves as a way to flag the functions to not load default
		// data and instead load meta/optional data instead

		console.log('Project clicked... loading meta...');
		var key = $(this).data("uid"); // get website key from project view
		var app = appframe(3, key); // call appframe function and pass key for project meta view
		$(".content").append(app); // append to view

		// draggable is a jquery plugin for dragging divs around
		$(".draggable").draggable({
			stack: ".draggable",
			containment: "body",
		});

		console.log('project meta:app frame running...');
	});

	$(document).on('click', '.task-view-a', function(){

		// the task_id is sent to the appframe from the links data-uid,
		// from there its used to create a unique container to hold task information
		// and also send an ajax request to server for info based on the task_id

		console.log('Task clicked... loading meta...');
		var key = $(this).data("uid"); // get task_id from task link's data-uid
		var app = appframe(4, key); // call appframe function and pass key for task meta view
		$(".content").append(app); // append to view

		// draggable is a jquery plugin for dragging divs around
		$(".draggable").draggable({
			stack: ".draggable",
			containment: "body",
		});

		console.log('task meta:app frame running...');
	});

	// on clicking an exit button on an appframe window
	$(document).on('click', '.window-nav', function(){
		console.log('close clicked...');
		$(this).parent().parent().parent().parent().remove(); // get the ui-window parent of the calling element
	});

  // on clicking the 'create user' button within the company appframe
	$(document).on('click', '.btn-login', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/login.php',
    		data: $('.user-login-form').serialize(),
    		success: function(data) {
    			console.log("POST:login-connection SUCCESS");
    			console.log("login-connection:data: " + JSON.stringify(data));
    			//process login information after serverside check
          var result = data.split("|");
          if(result[0] == "true"){
            console.log("Login successful.");
            sessionStorage.setItem('logged-in', true);
            console.log("Session vars set for login account.");
            // clear screen
            var content = document.getElementById("content");
            if(content) content.innerHTML = " ";
            // login and show user profile page
            var profile = appframe(8);
            $(".content").append(profile);
          } else {
            // login FAILED
            alert("LOGIN FAILED");
          }
    		},
    		error: function(data) {
    			console.log("POST:login-connection FAILED");
    			console.log("login-connection:data: " + JSON.stringify(data));
    		}
    	});
	});

  // on clicking the 'create user' button within the company appframe
	$(document).on('click', '.btn-logout', function(e){
    sessionStorage.removeItem('logged-in');
    $.ajax({
      type: 'POST',
      url: 'http://neetchan.com/logout.php',
      success: function(data) {
        console.log("POST:logout-connection SUCCESS");
        console.log("Logout successful.");
        // clear screen
        var content = document.getElementById("content");
        if(content) content.innerHTML = " ";
        // login and show user profile page
        var start = appframe(0);
        $(".content").append(start);
      },
      error: function(data) {
        console.log("POST:login-connection FAILED");
        alert("LOGOUT FAILED");
      }
    });

	});

  // on clicking the 'create user' button within the company appframe
	$(document).on('click', '.btn-create-acc', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/create-account.php',
    		data: $('.user-login-form').serialize(),
    		success: function(data) {
    			console.log("POST:create-acccount-connection SUCCESS");
    			console.log("create-account-connection:data: " + JSON.stringify(data));
    			//process create account information after serverside check
          var result = data.split("|");
          console.log(result[0]);
          if(result[0] == "true"){
            console.log("Create account successful.");
            sessionStorage.setItem('logged-in', true);
            console.log("Session vars set for login account.");
            // clear screen
            var content = document.getElementById("content");
            if(content) content.innerHTML = " ";
            // login and show user profile page
            var profile = appframe(8);
            $(".content").append(profile);
          } else {
            // TODO something here
            alert(result[1]);
            var content = document.getElementById("content");
            if(content) content.innerHTML = " ";
          }
    		},
    		error: function(data) {
    			console.log("POST:create-account-connection FAILED");
    			console.log("create-account-connection:data: " + JSON.stringify(data));
    		}
    	});
	});


	// on clicking the 'create project' button within the projects appframe
	$(document).on('click', '.project-create-button', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/submit-project.php',
    		data: $('.projectCreateForm').serialize(),
    		success: function(data) {
    			console.log("POST:submit-project SUCCESS");
    			console.log("submit-project:data: " + JSON.stringify(data));
    			//refresh view data to reflect new project and reset form fields
    			$('.projectCreateForm').trigger("reset");
    			setTimeout(viewProjectsData(), 3000);
    			console.log("Project View Data refreshed.");
    		},
    		error: function(data) {
    			console.log("POST:submit-project FAILED");
    			console.log("submit-project:data: " + JSON.stringify(data));
    		}
    	});
	});

	// on clicking the 'create task' button to display the create task form (project meta appframe)
	$(document).on('click', '.btn-show-create-task', function(e){
    	$('.taskCreateForm').toggle("slow");
	});

	$(document).on('click', '.show-admin-chat-panel', function(e){
		$('.admin-chat-panel').toggle("slow");
	})

	// on clicking the 'create task' button within the create task form (project meta appframe)
	$(document).on('click', '.task-create-button', function(e){
    	e.preventDefault();
    	var returnVal, echoString, project_key;
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/submit-task.php',
    		data: $('.taskCreateForm').serialize(),
    		success: function(data) {
    			console.log("POST:submit-task SUCCESS");
    			console.log("submit-task:data: " + JSON.stringify(data));
    			returnVal = data.split('|');
    			echoString = returnVal[0];
    			project_key = returnVal[1];
    			//refresh view data to reflect new task
    			viewTasksData(project_key);
    			console.log("Project Task View Data refreshed.");
    		},
    		error: function(data) {
    			console.log("POST:submit-task FAILED");
    			console.log("submit-task:data: " + JSON.stringify(data));
    		}
    	});
	});

	// on clicking the 'confirm user request' button (new user) within the company appframe
	$(document).on('click', '.btn-confirm-req', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/confirm-new-user-request.php',
    		data: $('.confirmUserReqForm').serialize(),
    		success: function(data) {
    			console.log("POST:confirmUserReq SUCCESS");
    			console.log("confirmUserReq:data: " + JSON.stringify(data));
    			getNewUserReqs();

    		},
    		error: function(data) {
    			console.log("POST:confirmUserReq FAILED");
    			console.log("confirmUserReq:data: " + JSON.stringify(data));
    		}
    	});
	});

  // on clicking the 'confirm user request' button (new user) within the company appframe
	$(document).on('click', '.btn-confirm-netreq', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/confirm-network-request.php',
    		data: $('.confirmNetworkReqForm').serialize(),
    		success: function(data) {
    			console.log("POST:confirmNetworkReq SUCCESS");
    			console.log("confirmNetworkReq:data: " + JSON.stringify(data));
    			getNetworkReqs();

    		},
    		error: function(data) {
    			console.log("POST:confirmNetworkReq FAILED");
    			console.log("confirmNetworkReq:data: " + JSON.stringify(data));
    		}
    	});
	});

	// on clicking the 'request user confirmation' button (new user) within the welcome appframe
	$(document).on('click', '.btn-new-user-create', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/submit-new-user-request.php',
    		data: $('.newUserCreateForm').serialize(),
    		success: function(data) {
    			console.log("POST:new-user-create SUCCESS");
    			console.log("new-user-create:data: " + JSON.stringify(data));

    			var info = document.getElementById('welcome-user');

    			info.innerHTML = "<h1>User Request Submitted</h1><hr/><p>Either an administrator will approve your request shortly, or you will be denied.</p>";

    		},
    		error: function(data) {
    			console.log("POST:new-user-create FAILED");
    			console.log("new-user-create:data: " + JSON.stringify(data));
    		}
    	});
	});

  // create new network button on welcome screen
  $(document).on('click', '.btn-new-network-create', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/submit-new-network-request.php',
    		data: $('.newNetworkCreateForm').serialize(),
    		success: function(data) {
    			console.log("POST:network-create SUCCESS");
    			console.log("network-create:data: " + JSON.stringify(data));

    			var info = document.getElementById('welcome-user');

    			info.innerHTML = "<h1>Network Request Submitted</h1><hr/><p>Either an administrator will approve your request shortly, or you will be denied.</p>";

    		},
    		error: function(data) {
    			console.log("POST:network-create FAILED");
    			console.log("network-create:data: " + JSON.stringify(data));

          var info = document.getElementById('welcome-user');

    			info.innerHTML = "<h1>Network Request Failed</h1><hr/><p>Please try again or contact an administrator.</p>";
    		}
    	});
	});

  // on clicking the 'save' button within user profile appframe
	$(document).on('click', '.button-save-profile', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/save-user-profile.php',
    		data: $('.user-profile-form').serialize(),
    		success: function(data) {
    			console.log("POST:save-profile SUCCESS");
    			console.log("save-profile:data: " + JSON.stringify(data));
    			//refresh view data to reflect new project
    			//setTimeout(getUsersInfo(), 3000);
    		},
    		error: function(data) {
    			console.log("POST:save-profile FAILED");
    			console.log("save-profile:data: " + JSON.stringify(data));
    		}
    	});
	});

	// on clicking the 'create user' button within the company appframe
	$(document).on('click', '.button-user-create', function(e){
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/admin-create-account.php',
    		data: $('.userCreateForm').serialize(),
    		success: function(data) {
    			console.log("POST:create-user SUCCESS");
    			console.log("create-user:data: " + JSON.stringify(data));
    			//refresh view data to reflect new project
    			setTimeout(getUsersInfo(), 3000);
    			console.log("User View Data refreshed.");
    		},
    		error: function(data) {
    			console.log("POST:submit-user FAILED");
    			console.log("submit-user:data: " + JSON.stringify(data));
    		}
    	});
	});

	$(document).on('change', '.view-users-by-group', function(){
		// on select change in users view (within company appframe)
		// change view to show users in the selected role/group
		var key = $(this).find(":selected").val();
		getUsersInfo(key);
		console.log("Updated Users View Data.");
	});

	//--------------------------------------------------------------------------------------------------------
	//
	//			PROJECT AND TASK DATEPICKER EVENT LISTENER FUNCTIONS

	$("body").on("focus", ".datepicker", function() {
    	var $context = $(this).parents('.entry_day_plan');
    	$($(this), $context).datepicker({
        	showOtherMonths: true,
        	selectOtherMonths: true,
        	dateFormat: "mm/dd/yy",
        	minDate: 0,
        	onSelect: function(selectedDate) {}
    	});
	});

});
