var imageSet = 0;
var imageSelected = false;
var leftImageCancerous = true;
var clickedLeftImage = false;
var hasFinished = false; //Avoid cheating
var clickedLocalizationBox = false;

// Function called by left image to allow other functions to know what image is being used
function isLeftImage() {
	if (!hasFinished) {
		clickedLeftImage = true;
		selectImage();
	}
}

// Function called by right image to allow other functions to know what image is being used
function isRightImage() {
	if (!hasFinished) {
		clickedLeftImage = false;
		selectImage();
	}
}

//Makes the check answer button visible
function showCheckAnswerBox() {
	var button = document.getElementById("check-answer-button");
	button.style.visibility = "visible";
	document.getElementById("prompt").innerHTML = "Click the 'Check Answer' button to see if you are correct!";
}

function selectImage() {
	if (!imageSelected) { //Image selection
		imageDiv = document.getElementById("leftImage");
		imageDiv.style.border = 'none';
		imageDiv = document.getElementById("rightImage");
		imageDiv.style.border = 'none';

		//Puts the border on the right image
		if (clickedLeftImage)
			imageDiv = document.getElementById("leftImage");
		else
			imageDiv = document.getElementById("rightImage");
		imageDiv.style.border = 'thick solid #f5d633';
		showCheckAnswerBox();
	}
	else { //Localization selection
		showCheckAnswerBox();
		clickedLocalizationBox = false; //missed the box
	}
}

//Used to indicate whether a user clicked the localization box
function clickLocBox() {
	clickedLocalizationBox = true;
	showCheckAnswerBox();
}

function hitCheckAnswer() {
	if (!imageSelected){
		checkLoc(); //Adds the dialogue to the prompt
		checkSelectImage();
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
			localizationBox.onclick = clickLocBox; //User clicked the right spot
		}
		else { //Right Image is cancerous
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
			localizationBox.onclick = clickLocBox; //User clicked the right spot
		}
	}
	else { //localization box things
		if (clickedLocalizationBox)
			hitLocalization();
		else
			checkLoc();
	}
	button = document.getElementById("check-answer-button");
	button.style.visibility = "hidden";
}

// function to highlight image with lung cancer
//Creates localizationBox as an effective transparent button
function checkSelectImage(){
	//Gets rid of all image borders
	imageDiv = document.getElementById("leftImage");
	imageDiv.style.border = 'none';
	imageDiv = document.getElementById("rightImage");
	imageDiv.style.border = 'none';

	//Puts the border on the right image
	if (leftImageCancerous)
		imageDiv = document.getElementById("leftImage");
	else
		imageDiv = document.getElementById("rightImage");
	imageDiv.style.border = 'thick solid #f5d633';

	imageSelected = true;
}

//1st step: Checks if the user clicked the right image
//2nd step: If the user already clicked an image, and then clicks the image again, it must mean that
//	the user did NOT click the localizationBox -- so they did not click the right spot
function checkLoc() {
	if(!imageSelected) {
		document.getElementById("phase").innerHTML = "Training - Localization Phase";
		//Checks what image was clicked, then if it was the cancerous image, then sets the appropriate feedback
		if (leftImage) {
			if(leftImageCancerous)
				document.getElementById("prompt").innerHTML = "<strong>Correct.</strong> Now select the cancerous spot from within the highlighted image.";
			else
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> Now select the cancerous spot from within the highlighted image.";
		}
		else { //Right image
			if(!leftImageCancerous)
				document.getElementById("prompt").innerHTML = "<strong>Correct.</strong> Now select the cancerous spot from within the highlighted image.";
			else
				document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> Now select the cancerous spot from within the highlighted image.";
		}
		checkSelectImage(); //Creates localizationBox
	}
	else { //They clicked the picture instead of the localization box
		localBox = document.getElementById('localizationBox');
		localBox.style.border = 'thick solid #f5d633';
		document.getElementById("prompt").innerHTML = "<strong>Incorrect.</strong> The cancer is now highlighted on the image. Click 'Next' to move on!";

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
		document.getElementById("localizationBox").style.border = 'thick solid #f5d633';
		document.getElementById("prompt").innerHTML =  "<strong>Correct.</strong> The cancer is now highlighted on the image. Click 'Next' to move on!";
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
	clickedLeftImage = false;
	hasFinished = false;
	clickedLocalizationBox = false
	// change text back
	document.getElementById("phase").innerHTML = "Training - Identification Phase";
	document.getElementById("prompt").innerHTML = "Please click on the image you believe contains cancer.<br>";

	if (leftImageCancerous) //Removes highlighted outline
	imageDiv = document.getElementById("leftImage");
	else
		imageDiv = document.getElementById("rightImage");
	imageDiv.style.border = 'none';
	localBox = document.getElementById('localizationBox');
	localBox.remove();

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
