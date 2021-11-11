//src="./assets/js/questions.js"
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var optionsEl = document.querySelector("#options");
var answerKeyEl = document.querySelector("#answerKey");
var initialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");

var timerId;
var timer = 6 * 10;
var questionIndex = 0



//load page functions
function startQuiz() {
    var xmasEl = document.getElementById("xmas");
    xmasEl.setAttribute("class", "cover");
    console.log(xmasEl);

    //show questions
    questionsEl.removeAttribute("class");

    //timer functions
    timerId = setInterval(timerStart, 1000);
    timerEl.textContent = timer;
    
    retrieveQuestions();
    
}


//get questions from array, 2nd js 
var retrieveQuestions = function () {

    //bring first question
    var firstQuestion = questions[questionIndex];

    //show current question
    var titleEl = document.getElementById("nextQuestion");
    titleEl.textContent = firstQuestion.title;
    titleEl.style.fontSize = "300%";

    //clear out previous question choice
    optionsEl.innerHTML = "";

    //go thru questions
    firstQuestion.choices.forEach((choice, i) => {
        
        //button for each question
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "choices");
        optionButton.setAttribute("value", choice);
        optionButton.style.color = "blue";
        optionButton.style.fontSize = "125%";
        optionButton.style.backgroundColor = "white";
        optionButton.style.border = "2px solid slategray";
        optionButton.style.padding = "10px";
        

        optionButton.textContent = i + 1 + ". " + choice;

        //add event listener
        optionButton.onclick = questionBtn;

        //show answer options
        optionsEl.appendChild(optionButton);
        
    });
}

var questionBtn = function() {
    //check if right/wrong answer
    if(this.value !== questions[questionIndex].answer) {
        //deduct time for wrong answer
        timer -= 5;

        if (timer < 0) {
            timer = 0;
        }

        //changes to time if wrong
        timerEl.textContent = timer;
        answerKeyEl.textContent = "🧦Incorrect🧦";
        answerKeyEl.style.color = "red";
        answerKeyEl.style.fontSize = "200%";
        }
        else {
            answerKeyEl.textContent = "❄️Correct❄️";
            answerKeyEl.style.color = "blue";
            answerKeyEl.style.fontSize = "200%";
        }
        //show correct/incorrect
        answerKeyEl.setAttribute("class", "answer-show");
        setTimeout(function() {
            answerKeyEl.setAttribute("class", "answer-hide");
            }, 1000);

        //next question
        questionIndex++;

        //make sure time is still avail
        if (questionIndex === questions.length) {
            stopQuiz();
        } else {
            retrieveQuestions();
        }
    }

var stopQuiz = function() {
    //stop timer
    clearInterval(timerId);

    //end of quiz
    var resultEl = document.getElementById("results");
    resultEl.removeAttribute("class");

    var scoreEl = document.getElementById("score");
    scoreEl.textContent = timer;

    //hide the last question
    questionsEl.setAttribute("class", "cover");
    answerKeyEl.setAttribute("class", "cover");
}

var timerStart = function () {
    timer--;
    timerEl.textContent = timer;

    //if time runs out
    if (timer <= 0) {
        stopQuiz();
    }
}

//save score
var saveScore = function () {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        //local storage
        var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        //add new score using object for current user
        var addScore = {
            score: timer,
            initials: initials
        };

        highScores.push(addScore);

        //add to local storage
       //highScores.push(addScore);
        window.localStorage.setItem("highscores", JSON.stringify(highScores));

        //change to new browser
        window.location.href = "highscores.html";
    }
}


//button click to start quiz
startBtn.onclick = startQuiz;

//save initials click
submitBtn.onclick = saveScore;

//console.log('my name');
//initialsEl.event = event;