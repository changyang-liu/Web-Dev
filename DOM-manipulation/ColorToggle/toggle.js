var button = document.querySelector("button");

// button.addEventListener("click", function(){
// 	document.body.classList.toggle("purple");
// });

button.addEventListener("click", function(){
	console.log(document.querySelector("body").style.background);
	if(document.querySelector("body").style.background.includes("purple")){
		document.body.style.background = "white";
	} else {
		document.body.style.background = "purple";
	}
});