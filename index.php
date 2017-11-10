<?php

//-------------------------------------
//By: Matt Yates
//Date: 08-16-2017
//
//Description: collection of view functions
//-------------------------------------

// server should keep session data for AT LEAST 1 hour
ini_set('session.gc_maxlifetime', 3600);

// each client should remember their session id for EXACTLY 1 hour
session_set_cookie_params(3600);

session_start();

//view parts for appframes


// function to be called for menubar display


function navBar(){

	echo '<div id="cssmenu">
	        	<ul>
     			<li data-uid="[1]" class="nav-item active"><a href="#"><span><i class="fa fa-fw fa-mouse-pointer"></i> Neetchan</span></a></li>
     			<li data-uid="[2]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-building"></i> Company</span></a></li>
     			<li data-uid="[8]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-user"></i> Profile</span></a></li>
     			<li data-uid="[3]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-cogs"></i> Projects</span></a></li>
     			<li data-uid="[4]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-cog"></i> Tasks</span></a></li>
     			<li data-uid="[5]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-terminal"></i> Test</span></a></li>
     			<li data-uid="[6]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-folder-open"></i> Vault</span></a></li>
     			<li data-uid="[7]" class="nav-item"><a href="#"><span><i class="fa fa-fw fa-commenting"></i> Lounge</span></a></li>
     			</ul>
		</div>';

}

?>

<html>

    <head>

      <title>neetchan</title>
      <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300" type="text/css" />
      <link rel="stylesheet" href="css/styles.css" type="text/css" />
      <script src="//code.jquery.com/jquery-1.12.4.js"></script>
  		<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  		<script src="http://neetchan.com/jquery.ui.touch-punch.min.js"></script>
  		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
			<script src="http://neetchan.com/appframe/extra.js"></script>
			<script src="http://neetchan.com/appframe/lounge.js"></script>
			<script src="http://neetchan.com/appframe/start.js"></script>
			<script src="http://neetchan.com/appframe/profile.js"></script>
			<script src="http://neetchan.com/appframe/company.js"></script>
			<script src="http://neetchan.com/appframe/task.js"></script>
			<script src="http://neetchan.com/appframe/projects.js"></script>
			<script src="http://neetchan.com/appframe/appframe.js"></script>
			<script src="http://neetchan.com/appframe/functions.js"></script>
      <script src="http://neetchan.com/pikaday.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
      <link href="https://fonts.googleapis.com/css?family=Saira" rel="stylesheet">

    </head>



    <body>

	<div class="body-wrapper"> <!-- START PAGE HERE -->

	 <!-- STOP TOP NAV HERE -->
	<?php

	navBar();


	?>


		<div class="page main">

			<div class="content-wrapper">

				<div id="content" class="content"> <!-- START CONTENT HERE -->

				</div> <!-- END CONTENT HERE -->

			</div>

		</div>





	</div> <!-- END PAGE HERE -->

    </body>

</html>
