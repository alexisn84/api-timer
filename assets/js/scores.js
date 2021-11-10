//js for highscores html

//show scores/initials
var showScore = function() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    //list scores high to low
    highscores.sort(function(a,b) {
        return b.score - a.score;
    });
console.log(highscores);

    //li for each score
    highscores.forEach(function(score) {
    var elementLi = document.createElement("li");
    elementLi.textContent = score.initials + "-" + score.score;

    //print to page
    var print = document.getElementById("highscores");
    print.appendChild(elementLi);
});
}

//clear scores 
var clearScores = function() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearScores;

//run code when page loads
showScore();