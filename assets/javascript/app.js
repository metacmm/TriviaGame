$(document).ready(function(){

var currIndex = 0;
var currSelection = "";
var numCorrrectAnswer = 0;
var numWrongAnswer = 0;
var numUnanswered = questionset.length;
var timeLeft = 30;

var questionTimeOut;
var answerTimeOut;
var intervalId;

var displayingQuestion = false;
var displayingAnswer = false;
var counting = false;

$("#startBtn").on("click", displayQuestionPage);

$(".selection").on("click", displayAnswerPage);

function startInterval(){
    if (!counting){
        intervalId = setInterval(countInterval, 1000);
    }
}

function countInterval(){
    timeLeft--;
    $("#timeDiv").text(timeLeft);
}

function stopInterval(){
    counting = false;
    clearInterval(intervalId);
}

/** This function is to set the page to ask questions */
function displayQuestionPage(){
    clearPage();
    if (displayingAnswer)
    {
        clearTimeout(answerTimeOut);
        displayingAnswer = false;
    }
    currSelection = "";
    displayingQuestion = true;
    questionTimeOut = setTimeout(displayAnswerPage, 30000);
    let currQuestion = questionset[currIndex];
    $("#questionDiv").text(currQuestion.question);
    for(var i = 0; i < currQuestion.selection.length; i++){
        var btnSelection = $("<button>");
        btnSelection.attr("value", currQuestion.selection[i]);
        btnSelection.addClass("selection");
        btnSelection.text(currQuestion.selection[i]);
        $("#answerDiv").append(btnSelection);
    }
    currIndex++;
    startInterval();
}

/** This function is to set the page of displaying the results */
function displayAnswerPage(){
    clearPage();
    stopInterval();
    if (displayingQuestion){
        clearTimeout(questionTimeOut);
        displayingQuestion = false;
    }
    if (currIndex == questionset.length){
        displayCompletionPage();
    }
    else {
        displayingAnswer = true;
        if (currSelection === currQuestion.answer){
        //Display correct page
        }
        else {
        //time out 

        //Wrong selection
        }
        answerTimeOut = setTimeout(function(){
            clearTimeout(questionTimeOut);
            displayQuestionPage(currIndex);
        }, 5000);
    }
    
}

function displayCompletionPage(){
    $("#startBtn").text("Start Over?");
}


/** This function is to clear content of the page */
function clearPage(){
    $("#questionDiv").empty();
    $("#answerDiv").empty();
}


















});