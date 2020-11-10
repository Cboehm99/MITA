var imageSelected = false;
// function to highlight image with lung cancer
function selectImage(){
	if(!imageSelected){
		imageDiv = document.getElementById("cancerousImage");
		imageDiv.style.border = 'thick solid #CFFF04';
		document.getElementById("prompt").innerHTML = "The image containing the cancer is highlighted yellow. Please attempt to click on the cancer from within this image";
		imageSelected = true;
	}
	else{
		var localizationBox = document.createElement('div');
		document.getElementById("cancerImageContainer").appendChild(localizationBox);
		localizationBox.style.position = 'absolute';
		localizationBox.style.height = '0.73%';
		localizationBox.style.width= '0.73%';
		localizationBox.style.left = '79.79%';
		localizationBox.style.top = '33.79%';
		localizationBox.style.border = 'thick solid #CFFF04';
		document.getElementById("prompt").innerHTML = "The cancer is now highlighted on the image. Click next to move to the next trial!";
		
	}
}

function nextImage(){
	
}