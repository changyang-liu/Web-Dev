var scoreSelector = document.querySelector("input");
var showMax = document.querySelector("#max");
var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var showP1Score = document.querySelector("#score1");
var showP2Score = document.querySelector("#score2");

var maxScore = null;
var p1Score = 0;
var p2Score = 0;

scoreSelector.value = 0;

resetButton.addEventListener("click", function(){
    p1Score = 0;
    p2Score = 0;
    showP1Score.textContent = p1Score;
    showP2Score.textContent = p2Score;
    showP1Score.style.color = "black";
    showP2Score.style.color = "black";
    p2Button.disabled = false;
    p1Button.disabled = false;
})

scoreSelector.addEventListener("click", function(){
    maxScore = scoreSelector.value;
    showMax.textContent = maxScore;
})

p1Button.addEventListener("click", function () {
    if(maxScore == null){
        alert("Please enter number of points")
    }else{
        p1Score += 1;
        showP1Score.textContent = p1Score;
        if (p1Score >= maxScore) {
            showP1Score.style.color = "green";
            p2Button.disabled = true;
            p1Button.disabled = true;
        }
    }
})

p2Button.addEventListener("click", function () {
    if (maxScore == null) {
        alert("Please enter number of points")
    }else{
        p2Score += 1;
        showP2Score.textContent = p2Score;
        if (p2Score >= maxScore) {
            showP2Score.style.color = "green";
            p2Button.disabled = true;
            p1Button.disabled = true;
        }
    }
})







