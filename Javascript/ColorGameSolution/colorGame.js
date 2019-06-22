var colors = randomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor(colors);
var colorDisplay = document.querySelector("#colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");

var resetBtn = document.querySelector("#reset");
var easyBtn = document.querySelector("#easy");
var hardBtn = document.querySelector("#hard");

var numSquares = 6;

resetBtn.addEventListener("click", function(){
	resetBtn.textContent = "New Colors";
	colors = randomColors(numSquares);
	pickedColor = pickColor(colors);
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "#232323";
})

easyBtn.addEventListener("click", function(){
	numSquares = 3;
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	colors = randomColors(numSquares);
	pickedColor = pickColor(colors);
	for(var i = 0; i < squares.length; i++){
		if(i < 3){
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
})

hardBtn.addEventListener("click", function(){
	numSquares = 6;
	hardBtn.classList.add("selected");
	easyBtn.classList.remove("selected");
	colors = randomColors(numSquares);
	pickedColor = pickColor(colors);
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
})

for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		if(this.style.backgroundColor === pickedColor){
			message.textContent = "Correct!";
			changeColors(pickedColor);
			h1.style.backgroundColor = pickedColor;
			resetBtn.textContent = "Play Again?"
		}else{
			console.log(this.style.backgroundColor);
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again";
		}
	})
}

function changeColors(pickedColor){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
}

function randomColors(num){
	var arr = [];
	for(var i = 0; i < num; i++){
		arr[i] = getRandomColor();
	}
	return arr;
}

function getRandomColor(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + String(red) + ", " + String(green) + ", " + String(blue) + ")";
}

function pickColor(array){
	index = Math.floor(Math.random() * array.length);
	console.log(index);
	return array[index];
}

colorDisplay.textContent = pickedColor;