/******************************************************************************/
// Name:          profile.js
// Created:       October 12th, 2017
// Description:
//		functions for the profile appframe
/******************************************************************************/

function profileView(userid){
	//--------------------------------------------------------------------------------------
  // create a user profile view
	var body;

	// if no optional = set false
	if (typeof userid === 'undefined') { userid = 'false'; }

	if(userid === 'false'){
		// load current user profile
		loadProfileData();
	  body = profileInfoView();
		console.log("Profile view opened for current user");
	} else {
		// load other user profile
		loadProfileData(userid);
	  body = profileInfoView(userid);
		console.log("Profile view opened for userid: " + userid);
	}
	return body;

}

function profileInfoView(userid){

	// if no optional = set false
	if (typeof userid === 'undefined') { userid = 'false'; }

	// display info about Profile

	var head = "<div class='ui-window-content appframe-content'>";
	var welcome;

	if(userid === 'false'){
		welcome = "<div class='ui-window-content appframe-content-head profile-content' id='profile-content'></div>";
	} else {
		welcome = "<div class='ui-window-content appframe-content-head profile-content' id='" + userid + "-profile-content'></div>";
	}

	var foot = "</div>";

	var view = head + welcome + foot;

	return view;
}

function loadProfileData(userid){
	//--------------------------------------------------------------------------------------

	// if no optional = set false
	if (typeof userid === 'undefined') { userid = 'false'; }

    // get data for today / start

    var dateText;
    var date = new Date();

    // get teh date
    dateText = (date.getMonth() + 1) + "/";
    dateText += date.getDate() + "/";
    dateText += date.getFullYear();

	// check if user is valid
	var user = [];
	var user_data;
	var ip;

	if(userid === 'false'){
		// load current user profile
		$.ajax({
	    		type: 'POST',
	    		url: 'http://neetchan.com/server/get-user-profile.php',
	    		success: function(data) {
	    			console.log("POST:user-profile SUCCESS");
	    			console.log("user-profile:data: " + JSON.stringify(data));

	    			user = data.split('|');
	          var group = user[2];
	          var username = user[1];
						var userid = user[0];

	    			var info = document.getElementById('profile-content');

	    			switch(group){
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

						// userid | name | roleid | ip | first_name | last_name | email | phone | street | zip | city | state | website
						// 0				1			 2				3		 4						5						6				7				8				 9		 10			11			12
						var firstname = user[4] ? user[4] : "First Name";
						var lastname = user[5] ? user[5] : "Last Name";
						var email = user[6] ? user[6] : "email@example.com";
						var phone = user[7] ? user[7] : "XXX-XXX-XXXX";
						var street = user[8] ? user[8] : "Street";
						var zip = user[9] ? user[9] : "Zip";
						var city = user[10] ? user[10] : "City";
						var state = user[11] ? user[11] : "State";
						var website = user[12] ? user[12] : "example.com";

						user[4] ? info.innerHTML = "<h1>Hello, " + firstname + " " + lastname + "</h1><hr/>" : info.innerHTML = "<h1>" + username + "</h1><hr/>";
						//log out button
						info.innerHTML += "<p>Username: " + username + "</p>";
						info.innerHTML += "<p>User Role: " + group + "</p><input type='button' class='btn-logout' value='LOG OUT'><br><br>";
						info.innerHTML += "<p>Today is " + dateText + ". You have no new updates.</p><hr/>";

						var form;
						user[4] ? form = "<h3>" + firstname + "'s Profile</h3>" : form = "<h3>" + username + "'s Profile</h3>" ;
						form += "<form class='user-profile-form'>";
						form += "<input type='hidden' name='userid' value='" + userid + "'>";
						form += "<table class='user-profile-details'>";
						form += "<tr><th>First Name: </th><td><input type='text' class='' name='firstname' placeholder='" + firstname + "' required></td></tr>";
						form += "<tr><th>Last Name: </th><td><input type='text' class='' name='lastname' placeholder='" + lastname + "' required></td></tr>";
						form += "<tr><th>Email: </th><td><input type='text' class='' name='email' placeholder='" + email + "' required></td></tr>";
						form += "<tr><th>Website: </th><td><input type='text' class='' name='website' placeholder='" + website + "' required></td></tr>";
						form += "<tr><th>Phone: </th><td><input type='text' class='' name='phone' placeholder='" + phone + "' required></td></tr>";
						form += "<tr><th>Street: </th><td><input type='text' class='' name='street' placeholder='" + street + "' required></td></tr>";
						form += "<tr><th>Zip: </th><td><input type='text' class='' name='zip' placeholder='" + zip + "' required></td></tr>";
						form += "<tr><th>City: </th><td><input type='text' class='' name='city' placeholder='" + city + "' required></td></tr>";
						form += "<tr><th>State: </th><td><input type='text' class='' name='state' placeholder='" + state + "' required></td></tr>";
						form += "</table><br><br>";
						form += "<input type='button' class='button-save-profile' placeholder='button-save-profile' value='SAVE'>";
						form += "</form>";
						info.innerHTML += form;
	    		},
	    		error: function(data) {
	    			console.log("POST:check-user FAILED");
	    			console.log("check-user:data: " + JSON.stringify(data));
	    		}
	    });
	} else {
		// load other user profile
		var id = userid;
		$.ajax({
	    		type: 'POST',
	    		url: 'http://neetchan.com/server/get-user-profile.php',
					data: { userID : id },
	    		success: function(data) {
	    			console.log("POST:user-profile SUCCESS");
	    			console.log("user-profile:data: " + JSON.stringify(data));
						console.log("Loading Profile for UserID: " + id);

	    			user = data.split('|');
	          var group = user[2];
	          var username = user[1];
						var userid = user[0];

						var element = userid + "-profile-content";

	    			var info = document.getElementById(element);

	    			switch(group){
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

						// userid | name | roleid | ip | first_name | last_name | email | phone | street | zip | city | state | website
						// 0				1			 2				3		 4						5						6				7				8				 9		 10			11			12

						var firstname = user[4] ? user[4] : "First Name";
						var lastname = user[5] ? user[5] : "Last Name";
						var email = user[6] ? user[6] : "email@example.com";
						var phone = user[7] ? user[7] : "XXX-XXX-XXXX";
						var street = user[8] ? user[8] : "Street";
						var zip = user[9] ? user[9] : "Zip";
						var city = user[10] ? user[10] : "City";
						var state = user[11] ? user[11] : "State";
						var website = user[12] ? user[12] : "example.com";

						user[4] ? info.innerHTML = "<h1>" + firstname + " " + lastname + "</h1><hr/>" : info.innerHTML = "<h1>" + username + "</h1><hr/>";
						//log out button
						info.innerHTML += "<p>Username: " + username + "</p>";
						info.innerHTML += "<p>User Role: " + group + "</p><br><br>";
						//TODO add user interactivity !?
						info.innerHTML += "<hr/>";

						var form;
						user[4] ? form = "<h3>" + firstname + "'s Profile</h3>" : form = "<h3>" + username + "'s Profile</h3>" ;
						form += "<table class='user-profile-details other-user-profile'>";
						form += "<tr><th>First Name: </th><td>" + firstname + "</td></tr>";
						form += "<tr><th>Last Name: </th><td>" + lastname + "</td></tr>";
						form += "<tr><th>Email: </th><td>" + email + "</td></tr>";
						form += "<tr><th>Website: </th><td>" + website + "</td></tr>";
						form += "<tr><th>Phone: </th><td>" + phone + "</td></tr>";
						form += "<tr><th>Street: </th><td>" + street + "</td></tr>";
						form += "<tr><th>Zip: </th><td>" + zip + "</td></tr>";
						form += "<tr><th>City: </th><td>" + city + "</td></tr>";
						form += "<tr><th>State: </th><td>" + state + "</td></tr>";
						form += "</table><br><br>";
						info.innerHTML += form;
	    		},
	    		error: function(data) {
	    			console.log("POST:check-user FAILED");
	    			console.log("check-user:data: " + JSON.stringify(data));
	    		}
	    });
	}
}
