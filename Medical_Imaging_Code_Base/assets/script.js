var imageSelected = false;
// function to highlight image with lung cancer
function selectImage(){
	if(!imageSelected){
		imageDiv = document.getElementById("cancerousImage");
		imageDiv.style.border = 'thick solid #CFFF04';
		document.getElementById("prompt").innerHTML = "The image containing the cancer is highlighted yellow. Please attempt to click on the cancerous spot.";
		imageSelected = true;
	}
	else{
		var localizationBox = document.createElement('div');
		document.getElementById("cancerImageContainer").appendChild(localizationBox);
		localizationBox.style.position = 'absolute';
		localizationBox.style.height = '9%';
		localizationBox.style.width= '9%';
		localizationBox.style.left = '74.79%';
		localizationBox.style.top = '29.79%';
		localizationBox.style.border = 'thick solid #CFFF04';
		document.getElementById("prompt").innerHTML = "The cancer is now highlighted on the image. Click next to move to the next trial!";
		
	}
}

function nextImage(){
	
}