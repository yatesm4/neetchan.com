/******************************************************************************/
// Name:          task.js
// Created:       October 12th, 2017
// Description:
//		functions for the task appframe
/******************************************************************************/

function tasksView(optional_arg){
	// if no optional = set false
	if (typeof optional_arg === 'undefined') { optional_arg = 'false'; }

	// optional_arg is for an optional view in tasksView to display a meta task info appframe
	var view;

	if(optional_arg === 'false'){
		// no optional arg passed, load normal view
		loadTasksData();
		var head = "<div class='ui-window-content appframe-content'>";
		var body = "<div class='ui-window-content appframe-content-head'><h1>My Tasks</h1><hr/></div><div class='ui-window-content appframe-content-body tasks-view'></div>";
		var foot = "</div>";
		view = head + body + foot;
	} else {
		// optional arg passed
		// load meta view?
		view = tasksMetaView(optional_arg);
	}
	return view;
}

function loadTasksData(){
	// load task data and apply it to tasks appframe
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-tasks.php',
    		success: function(data) {
    			console.log("POST:tasksData SUCCESS");
    			console.log("tasksData:data: " + JSON.stringify(data));
					// split the incoming tasks data by '|', and make each result an element in the tasks array
					var tasks = data.split("{|}");
					var task = [];
					var views = document.getElementsByClassName('tasks-view');
					for(var i=0;i<views.length;i++){
						// views[i].innerHTML = current view
						for(var j=0;j<(tasks.length-1);j++){
							// tasks[i] = current task
							var task = tasks[j].split("|");
							// taskid | projectid | taskKey | name | desc | type | priority | Created By
							//	0					1						2					3			4				5					6				7


							views[i].innerHTML += "<a data-uid='" + task[0] +"' class='task-view-a' href='#'><h3>" + task[3] + "</h3></a>";
							views[i].innerHTML += "<p><strong>" + task[4] + "</strong></p>";
							views[i].innerHTML += "<p>Type: <strong>" + task[5].toUpperCase() + "</strong><br>Priority: <strong>"+ task[6].toUpperCase() + "</strong><br>Created By: <strong><a data-uid='" + task[7] + "' class='task-created-by' href='#'>" + task[7] + "</a></strong></p>";
							views[i].innerHTML += "<hr />"

						}
					}


    		},
    		error: function(data) {
    			console.log("POST:tasksData FAILED");
    			console.log("tasksData:data NOT FOUND: " + JSON.stringify(data));
    		}
    });
}

function logWorkForm(task_id){
	// form for logging work within a task

	var form = "<div class='ui-window-content appframe-content-body log-work-form appframe-content-body-right'>";
	form += "<h3>Log Work</h3><hr/>";
	form += "<form class='log-work-form'>";
	form += "<input type='hidden' name='task-id' value='" + task_id + "'>"
	form += "<p>Date:</p><input class='datepicker' name='log-date' type='text' required>";
	form += "<p>Hours Worked:</p><input name='log-hours' min='1' pattern='\d*' type='number' required>";
	form += "<p>Description</p>";
	form += "<textarea maxlength='300' rows='8' cols='25' name='log-desc' placeholder='Describe your progress on the task for the work log...' required></textarea><br><br>";
	form += "<input type='button' class='submit-log-button' name='submit-log' value='SUBMIT LOG'>";
	form += "</form>";
	form += "</div>";

	return form;
}

function viewTaskLogsData(task_id){
	// load data for task view

	var log_view = task_id + "-log-view";
	var task_logs;

	// load log info here ...
    $.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-task-logs.php',
    		data: 'key=' + task_id,
    		success: function(data, project_key) {
    			console.log("POST:taskLogs SUCCESS");
    			// split the incoming project data by '|', and make each result an element in the projects array
    			console.log("taskLogs:data: " + JSON.stringify(data));

    			// grab the container element in the tasks app frame by using
    			// Ids which are a combo of the project-key + id-ending (ex. project_key + 'meta-view')
    			views = document.getElementsByClassName(log_view);

    			task_logs = data.split('{|}');

    			//add each task in the array to the app frame
    			for (var j=0; j < views.length; j++){
    				// clear the view and refresh the data view
    				views[j].innerHTML = "";
    				console.log('applying data to view: ' + views[j] + '...');
    				for(var i=0;i<(task_logs.length - 1);i++){
    					log = task_logs[i].split('|');
    					views[j].innerHTML += "<a data-uid='" + log[0] +"' class='log-view-a' href='#'><h3>" + log[4] + " | " + log[3] + " Hours</h3></a>";
    					views[j].innerHTML += "<p><strong>" + log[2] + "</strong></p>"; // description
    					views[j].innerHTML += "<hr />";
    				}
    			}

    		},
    		error: function(data) {
    			console.log("POST:taskLogs FAILED");
    			console.log("taskLogs:data NOT FOUND: " + JSON.stringify(data));
    		}
    });

}

function viewTaskLogs(task_id){

  var head = "<div id='" + task_id + "-task-head' class='ui-window-content appframe-content-head'><h3>Work Logs</h3><hr/></div>";
	var body = "<div id='" + task_id + "-tasks-view' class='ui-window-content appframe-content-body task-log-view " + task_id + "-log-view'></div>";

	return head + body;
}


function taskLogs(task_id){
	// display project tasks and task data
	viewTaskLogsData(task_id);
	// get data and have it update screen
	var body = viewTaskLogs(task_id);
	return body;
}

function tasksMetaView(task_id){
	// view for independent project information

	// assign site_key and Id combo
	var meta_head = task_id + "-content-head";
	var meta_view = task_id + "-meta-view";

	var taskCount;

	var dateCreated = [];
	var time;

	//load information here ...
	$.ajax({
    		type: 'POST',
    		url: 'http://neetchan.com/server/get-task.php',
    		data: 'id=' + task_id,
    		success: function(data, task_id) {
    			console.log("POST:taskMeta SUCCESS");
    			// split the incoming project data by '|', and make each result an element in the projects array
    			console.log("taskMeta:data: " + JSON.stringify(data));
    			var task_meta = data.split('|');

    			// input model: id 0 | name 1 | taskKey 2 | projectID 3 | userID 4 | desc 5 | timestamp 6 | lastModified 7 | type 8 | priority 9 | status 10 | start 11 | end 12 | estimated time 13 | logged time 14 | userID of last task_time update 15 | days until start/end 16 | days estimated total 17| true if task start, false if not 18


				dateCreated = task_meta[6].split(" ");
    			date = dateCreated[0];
    			time = dateCreated[1];

    			if(task_meta[18] == "no"){
    				var signal = "no";
    				//project hasnt start
    			} else {
    				// project started
    				var signal = "yes";
    				var daysLeftPercentage = ((task_meta[16] / task_meta[17]) * 100);
    				var percent = (100.0 - daysLeftPercentage).toFixed(2);
    			}

    			// append strong element to each value in the task_meta array
    			for(var i=0;i<task_meta.length;i++){
    				task_meta[i] = "<strong>" + task_meta[i] + "</strong>";
    			}

    			// grab the container element in the tasks app frame by using
    			// Ids which are a combo of the project-key + id-ending (ex. task_id + 'meta-view')
    			title = document.getElementById(meta_head);
    			view = document.getElementById(meta_view);



    			// display basic info about project
    			title.innerHTML = "<h1>" + task_meta[1] + "</h1><hr />";
    			view.innerHTML = "<h3>ID: " + task_meta[0] + " | Key: " + task_meta[2] + "</h3><p>" + task_meta[5] + "</p>";

    			view.innerHTML += "<hr /><p>Created: <strong>" + date + " | " + time + "</strong></p><p>Created By: " + task_meta[4] + "</p><p>Last Modified: " + task_meta[7] + "</p>";
    			view.innerHTML += "<p>Task Type: " + task_meta[8].toUpperCase() + "</p><p>Priority: " + task_meta[9].toUpperCase() + "</p><p>Status: " + task_meta[10].toUpperCase() + "</p><br>";

    			// do maths on project start date compared to todays date

    			var parts = date.split('/');

    			var start_date = new Date(parts[2], parts[0]-1,parts[1]);
    			var today = Date.now();


    			if(signal == "no"){
    				// project start date is in the future (after today)
    				view.innerHTML += "<p>Task Start: " + task_meta[11] + "</p><p>Days Until Start: " + task_meta[16] + " <strong>Days</strong></p><p>Project End: " + task_meta[12] + "</p><p>Hours Estimated: " + task_meta[13] + " <strong> Hours</strong></p><p>Logged Hours: " + task_meta[14] + " <strong>Hours</strong></p>";
    			} else {
    				// today has reached project start date
    				view.innerHTML += "<p>Task Start: " + task_meta[11] + "</p><p>Task End: " + task_meta[12] + "</p><p>Days Until End: " + task_meta[16] + " <strong>Days</strong><p><p>Days Completed: <strong>" + percent + "%</strong></p>Hours Estimated: " + task_meta[13] + " <strong> Hours</strong></p><p>Logged Hours: " + task_meta[14] + " <strong>Hours</strong></p>";
    			}
    			view.innerHTML += "<hr/><br><br>";

    		},
    		error: function(data) {
    			console.log("POST:taskMeta FAILED");
    			console.log("taskMeta:data NOT FOUND: " + JSON.stringify(data));
    		}
    });

	//--------------------------------------------------------------------------------------
    // display data in appframe

	var head = "<div class='ui-window-content appframe-content'>";

	var body = "<div id='" + task_id + "-content-head' class='ui-window-content appframe-content-head'><h3>Task Name</h3><hr/></div><div id='" + task_id + "-meta-view' class='ui-window-content appframe-content-body task-meta-view'></div>";

	var foot = "</div>";

	var view = head + body + logWorkForm(task_id) + taskLogs(task_id) + foot;

	console.log('Task Meta View loaded.');

	return view;
}
