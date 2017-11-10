/******************************************************************************/
// Name:          projects.js
// Created:       October 12th, 2017
// Description:
//		functions for the projects appframe
/******************************************************************************/

function createTask(project_key){
	// load user data for task assignment
	var users = [];
	var user = [];
	var label, group;
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-users.php',
    		success: function(data) {
    			console.log("POST:usersData->createTaskForm SUCCESS");
    			console.log("usersData->createTaskForm:data: " + JSON.stringify(data));

    			// split the incoming users data by '|', and make each result an element in the projects array
    			users = data.split('|');

    			// TODO add select that is populated with all the project groups in the db
    			for(var i=0;i<(users.length - 1);i++){
    				user = users[i].split(':');

    				group = user[2];

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

    				label = user[1] + " | " + group;
    				$('.task-assignee').append($('<option>', {
    					value: user[0],
    					text: label
    				}));
    			}
    		},
    		error: function(data) {
    			console.log("POST:groupsData FAILED");
    			console.log("groupsData:data NOT FOUND: " + JSON.stringify(data));
    		}
    });


	// view form for creating tasks per project key
	var head = "<div id='" + project_key + "-task-head' class='ui-window-content appframe-content-body appframe-content-body-right'><input type='button' class='btn-show-create-task' name='show-create-task' value='CREATE TASK'><hr/></div>";
	var body = "<div id='" + project_key + "-create-task-view' class='ui-window-content appframe-content-body appframe-content-body-right project-task-view'>";

	//--------------------------

	// add create-task form here

	body += "<form class='taskCreateForm' name='task-create'>";

	body += "<div class='ui-window-content appframe-content-body task-content-body'>" +
			"<p>Create a new task for the " + project_key + " project?</p>" +
			"<input type='hidden' name='task-project-id' value='" + project_key + "'>" +
			"<input type='text' name='task-name' placeholder='TASK NAME' required><br>" +
			"<p>Task Assignee</p><select id='task-assignee' class='task-assignee' name='task-assignee' required></select><br><br>" +
			"<textarea maxlength='140' rows='4' cols='25' name='task-desc' required>TASK DESCRIPTION</textarea>" +
			"<p>Task Start:</p><input type='text' name='task-start' class='datepicker' required>" +
			"<p>Task End:</p><input type='text' name='task-end' class='datepicker' required>" +
			"<p>Estimated Time:</p><input type='number' name='task-time' value='0' min='0' required> Hours" +
			"<p>Task Type</p><select id='task-type' class='task-type' name='task-type' required><option value='general'>General Task</option><option value='feature'>New Feature</option><option value='graphics'>Graphics</option><option value='bug'>Bug</option><option value='epic'>Epic</option><option value='incident'>Incident</option><option value='service'>Service Request</option><option value='support'>Support</option><option value='maintenance'>Maintenance</option><option value='change'>Change</option><option value='research'>Research and Development</option><option value='admin'>Administration</option></select>" +
			"<p>Task Priority</p><select id='task-priority' class='task-priority' name='task-priority' required><option value='low'>Low Priority</option><option value='medium'>Medium Priority</option><option value='high'>High Priority</option><option value='critical'>Critical Priority</option></select><br><br>" +

			"<input type='button' class='task-create-button' name='create' value='SUBMIT TASK'>" +
			"<br><br></div>";

	body += "</form></div>";

	return head + body;
}

function viewProjectTasksData(project_key){
	// load data for task view

	var task_view = project_key + "-task-view";
	var project_tasks;

	// load task info here ...
    $.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-project-tasks.php',
    		data: 'key=' + project_key,
    		success: function(data, project_key) {
    			console.log("POST:projectTasks SUCCESS");
    			// split the incoming project data by '|', and make each result an element in the projects array
    			console.log("projectTasks:data: " + JSON.stringify(data));

    			// grab the container element in the projects app frame by using
    			// Ids which are a combo of the project-key + id-ending (ex. project_key + 'meta-view')
    			views = document.getElementsByClassName(task_view);

    			project_tasks = data.split('|');

    			//add each task in the array to the app frame
    			for (var j=0; j < views.length; j++){
    				// clear the view and refresh the data view
    				views[j].innerHTML = "";
    				console.log('applying data to view: ' + views[j] + '...');
    				for(var i=0;i<(project_tasks.length - 1);i++){
    					task = project_tasks[i].split(':');
    					views[j].innerHTML += "<a data-uid='" + task[0] +"' class='task-view-a' href='#'><h3>" + task[1] + "</h3></a>";
    					views[j].innerHTML += "<p><strong>" + task[2] + "</strong></p>";
    					views[j].innerHTML += "<p>Type: <strong>" + task[4].toUpperCase() + "</strong><br>Priority: <strong>"+ task[3].toUpperCase() + "</strong><br>Created By: <strong><a data-uid='" + task[6] + "' class='task-created-by' href='#'>" + task[6] + "</a></strong></p>";
    					views[j].innerHTML += "<p>Assigned To: <strong><a data-uid='" + task[7] + "' class='task-assigned-to' href='#'>" + task[7] + "</a></strong></p>";
    					views[j].innerHTML += "<hr />";
    				}
    			}

    		},
    		error: function(data) {
    			console.log("POST:projectTasks FAILED");
    			console.log("projectTasks:data NOT FOUND: " + JSON.stringify(data));
    		}
    });

}

function viewProjectTasks(project_key){

    var head = "<div id='" + project_key + "-task-head' class='ui-window-content appframe-content-head'><h3>Tasks</h3><hr/></div>";
	var body = "<div id='" + project_key + "-tasks-view' class='ui-window-content appframe-content-body project-task-view " + project_key + "-task-view'></div>";

	return head + body;
}


function projectTasks(project_key){
	// display project tasks and task data
	viewProjectTasksData(project_key);
	// get data and have it update screen
	var body = viewProjectTasks(project_key);
	return body;
}

function projectMetaView(project_key){
	// view for independent project information

	// assign site_key and Id combo
	var meta_head = project_key + "-content-head";
	var meta_view = project_key + "-meta-view";

	var taskCount;

	dateCreated = new Array();

	//load information here ...
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-project.php',
    		data: 'key=' + project_key,
    		success: function(data, project_key) {
    			console.log("POST:projectMeta SUCCESS");
    			// split the incoming project data by '|', and make each result an element in the projects array
    			console.log("projectMeta:data: " + JSON.stringify(data));
    			var project_meta = data.split('|');

    			// meta: id . name . key . desc . group . timestamp . userID . taskCount



    			// grab the container element in the projects app frame by using
    			// Ids which are a combo of the project-key + id-ending (ex. project_key + 'meta-view')
    			title = document.getElementById(meta_head);
    			view = document.getElementById(meta_view);



    			dateCreated = project_meta[5].split(" ");
    			// do maths on project start date compared to todays date
    			var parts = project_meta[8].split('/');

    			var start_date = new Date(parts[2], parts[0]-1,parts[1]);
    			var today = Date.now();


    			// append strong element to each value in the task_meta array
    			for(var i=0;i<project_meta.length;i++){
    				project_meta[i] = "<strong>" + project_meta[i] + "</strong>";
    			}


    			// display basic info about project
    			title.innerHTML = "<h1>" + project_meta[1] + "</h1><hr />";
    			view.innerHTML += "<h3>ID: " + project_meta[0] + " | Key: " + project_meta[2] + "</h3><p>" + project_meta[3] + "</p><hr /><p>Project Type: " + project_meta[4] + "</p><p>Created: <strong>" + dateCreated[0] + "</strong> | <strong>" + dateCreated[1] + "</strong></p>";
    			view.innerHTML += "<p>Created By: " + project_meta[6] + "</p><br>";

    			if(start_date.getTime() > today){
    				// project start date is in the future (after today)
    				view.innerHTML += "<p>Project Start: " + project_meta[8] + "</p><p>Days Until Start: " + project_meta[12] + " <strong>Days</strong></p><p>Project End: " + project_meta[9] + "</p><p>Days Estimated: " + project_meta[10] + " <strong>Days</strong></p><p>Task Hours: " + project_meta[11] + "<strong> Hours</strong></p>";
    			} else {
    				// today has reached project start date
    				view.innerHTML += "<p>Project Start: " + project_meta[8] + "</p><p>Project End: " + project_meta[9] + "</p><p>Days Estimated: " + project_meta[10] + " <strong>Days</strong></p><p>Task Hours: " + project_meta[11] + " <strong>Hours</strong></p>";
    			}

    			taskCount = project_meta[7];

    			view.innerHTML += "<br><br>";
    		},
    		error: function(data) {
    			console.log("POST:viewProjects FAILED");
    			console.log("viewProjects:data NOT FOUND: " + JSON.stringify(data));
    		}
    });

	//--------------------------------------------------------------------------------------
    // display data in appframe

	var head = "<div class='ui-window-content appframe-content'>";

	var body = "<div id='" + project_key + "-content-head' class='ui-window-content appframe-content-head'><h3>Project Name</h3><hr/></div><div id='" + project_key + "-meta-view' class='ui-window-content appframe-content-body project-info-view'></div>";

	var tasks = projectTasks(project_key);
	var task_form = createTask(project_key);

	var foot = "</div>";

	var view = head + body + task_form + tasks + foot;

	console.log('Project Meta View loaded.');

	return view;
}


function viewProjectsData(){
	// script to hold the ajax call to retrieve data for the view
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-projects.php',
    		success: function(data) {
    			console.log("POST:viewProjects SUCCESS");
    			// split the incoming project data by '|', and make each result an element in the projects array
    			projects = data.split('|');
    			console.log("viewProjects:data: " + projects);

    			// grab the container element in the projects app frame
    			views = document.getElementsByClassName("project-list-view");

    			//add each project in the array to the app frame
    			for (var j=0; j < views.length; j++){
    				// clear the view and refresh the data view
    				views[j].innerHTML = "";
    				console.log('applying data to view: ' + views[j] + '...');
    				for(var i=0;i<(projects.length - 1);i++){
    					project = projects[i].split(':');

    					// name : key : desc : group : task_count : start_time : end_time : timestamp : username (10 is the element for username including timestamp splits)

    					views[j].innerHTML += "<a data-uid='" + project[1] +"' class='project-view-a' href='#'><h3>" + project[0] + "</h3></a>";
    					views[j].innerHTML += "<p><strong>" + project[2] + "</strong></p>";
    					views[j].innerHTML += "<p>Created By: <strong>" + project[10] + "</strong></p>";
    					views[j].innerHTML += "<p>Project Start: <strong>" + project[5] + "</strong> | Project End: <strong>" + project[6] + "</strong></p>";
    					views[j].innerHTML += "<p><strong>"+ project[1] + "</strong> | <strong>" + project[3] + "</strong> | Tasks: <a data-uid='" + project[1] + "' class='project-tasks-hint' href='#'><strong>" + project[4] + "</strong></a></p>";
    					views[j].innerHTML += "<hr />";
    				}
    			}
    		},
    		error: function(data) {
    			console.log("POST:viewProjects FAILED");
    			console.log("viewProjects:data NOT FOUND: " + JSON.stringify(data));
    		}
    });
    console.log('Project Data Updated. ');
}

function viewProjectsView(){

	//create blank array to hold all projects, and each project individually
	projects = new Array();
	project = new Array();

	// call function to get project data
	viewProjectsData();

    //--------------------------------------------------------------------------------------
    // display data in appframe

	var head = "<div class='ui-window-content appframe-content'>";

	var body = "<div class='ui-window-content appframe-content-head project-content-head'><h3>All Projects</h3><hr/></div><div id='project-list-view' class='ui-window-content appframe-content-body project-list-view'></div>";

	var foot = "</div>";

	var view = head + body + foot;

	console.log('View-Projects View loaded.');

	return view;


}

function selectProjectGroupsData(){
	// get group data for linking projects to groups
	var groups = [];
	var group = [];
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-groups.php',
    		success: function(data) {
    			console.log("POST:groupsData SUCCESS");
    			console.log("groupsData:data: " + JSON.stringify(data));

    			// split the incoming project data by '|', and make each result an element in the projects array
    			groups = data.split('|');

    			// TODO add select that is populated with all the project groups in the db
    			for(var i=0;i<(groups.length - 1);i++){
    				group = groups[i].split(':');
    				$('.project-groups').append($('<option>', {
    					value: group[0],
    					text: group[1]
    				}));
    			}
    		},
    		error: function(data) {
    			console.log("POST:groupsData FAILED");
    			console.log("groupsData:data NOT FOUND: " + JSON.stringify(data));
    		}
    });
}

function comingSoonForm(){

	var head = "<div class='ui-window-content appframe-content coming-soon-form-container' name='coming-soon-form-container'>";

	head += '<div id="cssmenu">' +
	        	'<ul>' +
     			'<li data-uid="[1]" class="project-nav-item"><a href="#"><span><i class="fa fa-fw fa-pencil"></i> Create Project</span></a></li>' +
     			'<li data-uid="[2]" class="project-nav-item"><a href="#"><span><i class="fa fa-fw fa-calculator"></i> Estimation Worksheet</span></a></li>' +
     			'<li data-uid="[3]" class="project-nav-item active"><a href="#"><span><i class="fa fa-fw fa-bug"></i> Coming Soon</span></a></li>' +
     			'</ul>' +
		'</div>';

	var bodyHead = "<div class='ui-window-content appframe-content-head project-content-head'><h3>Coming Soon</h3><hr/></div>";

	var bodyLeft = 	"<div class='ui-window-content appframe-content-body project-content-body'>" +
			   		"<p>Stick around to see what this holds in the future!</p><br><br>" +
			   		"</div>";

	var body = bodyHead + bodyLeft;

	var foot = "</div>";

	var form = head + body + foot;

	return form;
}

function estimatorForm(){

	var head = "<div class='ui-window-content appframe-content estimator-form-container' name='estimator-form-container'>";

	head += '<div id="cssmenu">' +
	        	'<ul>' +
     			'<li data-uid="[1]" class="project-nav-item"><a href="#"><span><i class="fa fa-fw fa-pencil"></i> Create Project</span></a></li>' +
     			'<li data-uid="[2]" class="project-nav-item active"><a href="#"><span><i class="fa fa-fw fa-calculator"></i> Estimation Worksheet</span></a></li>' +
     			'<li data-uid="[3]" class="project-nav-item"><a href="#"><span><i class="fa fa-fw fa-bug"></i> Coming Soon</span></a></li>' +
     			'</ul>' +
		'</div>';

	head += "<form class='estimator-form' name='estimation-create'>";

	var bodyHead = "<div class='ui-window-content appframe-content-head project-content-head'><h3>Estimate a Project (under construction)</h3><hr/></div>";

	var bodyLeft = 	"<div class='ui-window-content appframe-content-body project-content-body'>" +
			   		"<p>Project Name:</p><input type='text' name='project-name' placeholder='PROJECT NAME' required>" +
			   		"<p>Project Group:</p><select id='project-groups' class='project-groups' name='project-group' required></select>" +
			   		"<p>Project Description:</p><textarea maxlength='65' rows='4' cols='25' name='project-desc' required>PROJECT DESCRIPTION</textarea>" +
			   		"<p>Project Key:</p><input maxlength='8' type='text' name='project-key' placeholder='PROJECT KEY' required><br>" +
			   		"ex. A project named 'Social Media Tracker' could have a key of 'SMT'.<br><br>" +
			   		"</div>";

	var bodyRight = "<div class='ui-window-content appframe-content-body project-content-body appframe-content-body-right'>" +
					"<p>Project Start Date:</p><input class='datepicker' name='project-start-date' type='text' required>" +
					"<p>Project Due Date:</p><input class='datepicker' name='project-due-date' type='text' required><br><br>" +
				 	"<input type='button' class='project-create-button' name='send' value='SUBMIT PROJECT'>" +
				 	"</div>";

	var body = bodyHead + bodyLeft + bodyRight;

	var foot = "</form></div>";

	var estimatorForm = head + body + foot;

	selectProjectGroupsData();
	return estimatorForm;
}

function createProjectForm(){

	var head = "<div class='ui-window-content appframe-content create-project-form-container' name='create-project-form-container'>";

	head += '<div id="cssmenu">' +
	        	'<ul>' +
     			'<li data-uid="[1]" class="project-nav-item active"><a href="#"><span><i class="fa fa-fw fa-pencil"></i> Create Project</span></a></li>' +
     			'<li data-uid="[2]" class="project-nav-item"><a href="#"><span><i class="fa fa-fw fa-calculator"></i> Estimation Worksheet</span></a></li>' +
     			'<li data-uid="[3]" class="project-nav-item"><a href="#"><span><i class="fa fa-fw fa-bug"></i> Coming Soon</span></a></li>' +
     			'</ul>' +
		'</div>';

	head += "<form class='projectCreateForm' name='project-create'>";

	var bodyHead = "<div class='ui-window-content appframe-content-head project-content-head'><h3>Create a Project</h3><hr/></div>";

	var bodyLeft = 	"<div class='ui-window-content appframe-content-body project-content-body'>" +
			   		"<p>Project Name:</p><input type='text' name='project-name' placeholder='PROJECT NAME' required>" +
			   		"<p>Project Group:</p><select id='project-groups' class='project-groups' name='project-group' required></select>" +
			   		"<p>Project Description:</p><textarea maxlength='65' rows='4' cols='25' name='project-desc' required>PROJECT DESCRIPTION</textarea>" +
			   		"<p>Project Key:</p><input maxlength='8' type='text' name='project-key' placeholder='PROJECT KEY' required><br>" +
			   		"ex. A project named 'Social Media Tracker' could have a key of 'SMT'.<br><br>" +
			   		"</div>";

	var bodyRight = "<div class='ui-window-content appframe-content-body project-content-body appframe-content-body-right'>" +
					"<p>Project Start Date:</p><input class='datepicker' name='project-start-date' type='text' required>" +
					"<p>Project Due Date:</p><input class='datepicker' name='project-due-date' type='text' required><br><br>" +
				 	"<input type='button' class='project-create-button' name='send' value='SUBMIT PROJECT'>" +
				 	"</div>";

	var body = bodyHead + bodyLeft + bodyRight;

	var foot = "</form></div>";

	var projectForm = head + body + foot;

	selectProjectGroupsData();
	return projectForm;
}

function projectFormView(){

	console.log('creating projects view...');

	// 'create project' form
	var createProject = createProjectForm();

	// 'estimation worksheet' form
	var estimator = estimatorForm();

	// 'coming soon' form
	var soon = comingSoonForm();

	var projectFormView = createProject + estimator + soon;

	console.log('Project Form View loaded.');

	return projectFormView;
}

function projectsView(optional_arg){

	// if no optional = set false
	if (typeof optional_arg === 'undefined') { optional_arg = 'false'; }

	var view;
	// if theres no optional arg, run the normal projects view
	if(optional_arg === 'false') {
		var formView = projectFormView();

		var projList = viewProjectsView();

		view = formView + projList;
	} else {
		// if there is an optional arg, run the projects meta view, pass the optional arg for project information
		view = projectMetaView(optional_arg);
	}

	console.log('Projects View loaded.')

	return view;

}
