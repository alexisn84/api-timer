src="./assets/js/questions.js"
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var optionsEl = document.querySelector("#options");

var timerId;
var timer = 6 * 10;
var questionArray = 0



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
//button click to start quiz
startBtn.onclick = startQuiz;

//get questions from array, 2nd js 
var retrieveQuestions = function () {

    //bring first question
    var firstQuestion = questions [questionArray];

    //show current question
    var titleEl = document.getElementById("nextQuestion");
    titleEl.textContent = firstQuestion.title;

    //clear out previous question choice
    optionsEl.innerHTML = "";

    //go thru questions
    firstQuestion.questionArray.forEach(option => {
        
        //button for each question
        var optionButton = document.createElement("button");
        option.setAttribute("class", "option");
        option.setAttribute("value", option);

        option.textContent = i + 1 + ". " + option;

        //add event listener
        option.onclick = questionBtn;

        //show answer options
        optionsEl.appendChild(option);
        
    });
}

var questionBtn = function() {
    //check if right/wrong answer
    if(this.value !== questions[questionArray].answer) {
        //deduct time for wrong answer
        timer -= 5;

        if (timer < 0) {
            timer = 0;
        }
    }
}

var timerStart = function () {
    timer--;
    timerEl.textContent = timer;

    //if time runs out
    if (timer <= 0) {
        stopQuiz();
    }
}

