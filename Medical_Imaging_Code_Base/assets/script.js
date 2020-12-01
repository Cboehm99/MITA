var imageSet = 0;
var imageSelected = false;
var leftImageCancerous = true;
var leftImage = false; //true if left image is clicked
var hasFinished = false; //Avoid cheating

// Function called by left image to allow other functions to know what image is being used
function isLeftImage() {
	if (!hasFinished) {
		leftImage = true;
		checkIfCorrectAnswer();
	}
}

// Function called by right image to allow other functions to know what image is being used
function isRightImage() {
	if (!hasFinished) {
		leftImage = false;
		checkIfCorrectAnswer();
	}
}

// function to highlight image with lung cancer
//Creates localizationBox as an effective transparent button
function selectImage(){
	if (leftImageCancerous)
		imageDiv = document.getElementById("leftImage");
	else
		imageDiv = document.getElementById("rightImage");
	imageDiv.style.border = 'thick solid #CFFF04';
	imageSelected = true;
	var localizationBox = document.createElement('div');
	if(leftImageCancerous){
		// hard coded styling will need to be changed if we want to pull from db
		document.getElementById("leftImageContainer").appendChild(localizationBox);
		localizationBox.style.display = 'block';
		localizationBox.style.position = 'absolute';
		localizationBox.style.height = '9%';
		localizationBox.style.width= '9%';
		localizationBox.style.left = '74.79%';
		localizationBox.style.top = '29.79%';
		localizationBox.style.border = 'transparent'; //Invisible
		localizationBox.id = 'localizationBox';
		localizationBox.onclick = hitLocalization; //User clicked the right spot
	}
	else {
		// hard coded styling will need to be changed if we want to pull from db
		document.getElementById("rightImageContainer").appendChild(localizationBox);
		localizationBox.style.display = 'block';
		localizationBox.style.position = 'absolute';
		localizationBox.style.height = '9%';
		localizationBox.style.width= '9%';
		localizationBox.style.left = '59.12%';
		localizationBox.style.top = '20%';
		localizationBox.style.border = 'transparent'; //Invisible
		localizationBox.id = 'localizationBox';
		localizationBox.onclick = hitLocalization; //User clicked the right spot
	}

	imageSelected = true;
}

//1st step: Checks if the user clicked the right image
//2nd step: If the user already clicked an image, and then clicks the image again, it must mean that
//	the user did NOT click the localizationBox -- so they did not click the right spot
function checkIfCorrectAnswer() {
	if(!imageSelected) {
		document.getElementById("phase").innerHTML = "Training - Localization Phase";
		//Checks what image was clicked, then if it was the cancerous image, then sets the appropriate feedback
		if (leftImage) {
			if(leftImageCancerous)
				document.getElementById("prompt").innerHTML = "<strong>Correct.</strong> The image containing the cancer is highlighted yellow. Please look for and click on the cancerous spot.";
			else
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The image containing the cancer is highlighted yellow. Please look for and click on the cancerous spot.";
		}
		else { //Right image
			if(!leftImageCancerous)
				document.getElementById("prompt").innerHTML = "<strong>Correct.</strong> The image containing the cancer is highlighted yellow. Please look for and click on the cancerous spot.";
			else
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The image containing the cancer is highlighted yellow. Please look for andclick on the cancerous spot.";
		}
		selectImage(); //Creates localizationBox
	}
	else { //They clicked the picture instead of the localization box
		localBox = document.getElementById('localizationBox');
		localBox.style.border = 'thick solid #CFFF04';
		if (leftImage) {
			if(leftImageCancerous){
				document.getElementById("prompt").innerHTML = "<strong>Correct.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			}
			else {
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";

			}
		}
		else { //Right image
			if(!leftImageCancerous) //right image is cancerous
				document.getElementById("prompt").innerHTML = "<strong>Correct.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			else {
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			}
		}

		// show next button
		var next_button = document.getElementById("next-button");
		next_button.style.visibility= "visible";

		//Ends Round
		hasFinished = true;
	}
}

//Function that is called when the localizationBox is clicked, so the user clicked correctly
function hitLocalization() {
	if(!hasFinished) {//Doesn't allow the user to change their answer by skipping rest of function
		localizationBox.style.border = 'thick solid #CFFF04';
		if (leftImage) {
			if(leftImageCancerous){
				document.getElementById("prompt").innerHTML =  "<strong>Correct.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			}
			else {
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			}
		}
		else { //Right image
			if(!leftImageCancerous) { //correct image
				document.getElementById("prompt").innerHTML =  "<strong>Correct.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			}
			else {
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The cancer is now highlighted on the image. Click 'Next' to move to the next trial.";
			}
		}
		// show next button
		var next_button = document.getElementById("next-button");
		next_button.style.visibility= "visible";

		//Ends Round
		hasFinished = true;
	}
}

//Called by the next button
//Resets the image for the next round, currently is capable of flipping between 2 configurations
function nextImage(){
	// rehide next button
	var next_button = document.getElementById("next-button");
	next_button.style.visibility = "hidden";

	imageSelected = false;
	// change text back
	document.getElementById("phase").innerHTML = "Training - Identification Phase";
	document.getElementById("prompt").innerHTML = "Please click on the image you believe contains cancer.<br><br>";

	if (leftImageCancerous) //Removes highlighted outline
	imageDiv = document.getElementById("leftImage");
	else
		imageDiv = document.getElementById("rightImage");
	imageDiv.style.border = 'none';
	localBox = document.getElementById('localizationBox');
	localBox.remove();
	leftImage = false;
	hasFinished = false;
	leftImageCancerous = !leftImageCancerous; //flips what image is cancerous due to hardcoding setup
	document.getElementById("textFeedbackL").innerHTML = "";
	document.getElementById("textFeedbackR").innerHTML = "";
	if(!imageSet){
		imageDiv = document.getElementById("leftImage");
		imageDiv.src = "/normalChest2.jpg";
		imageDivII = document.getElementById("rightImage");
		imageDivII.src = "/cancerChest2.jpg";
		imageSet = 1;
	}
	else{
		imageDiv = document.getElementById("leftImage");
		imageDiv.src = "/cancerChest1.jpg";
		imageDivII = document.getElementById("rightImage");
		imageDivII.src = "/normalChest1.jpg";
		imageSet = 0;
	}
}

function passwordCheck() {
	var confirm = document.getElementById("confirm").value;
	var password = document.getElementById("ogpassword").value;
	var passwordMatch = document.getElementById("passwordMatchMessage");

	if(confirm === ""){

	}
	else if(confirm === password) {
		passwordMatch.style.visibility = "hidden";
		document.getElementById('submitPassword').disabled = false;

	} else {
		passwordMatch.style.visibility = "visible";
		document.getElementById('submitPassword').disabled = true;
	}

}
