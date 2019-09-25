$(document).ready(function () {

    var currQuestion;
    var currIndex = 0;
    var numCorrectAnswer = 0;
    var numWrongAnswer = 0;
    var numUnanswered = 0;
    var timeLeft = 30;

    var questionTimeOut;
    var answerTimeOut;
    var intervalId;

    var displayingQuestion = false;
    var displayingAnswer = false;
    var counting = false;

    $("#startBtn").on("click", startGame);

    $(document).on("click", ".selection", displayAnswerPage);



    /** This function is to set variables while starting or restarting game */
    function startGame() {
        currIndex = 0;
        numCorrectAnswer = 0;
        numUnanswered = 0;
        numWrongAnswer = 0;
        displayingQuestion = false;
        displayingAnswer = false;
        counting = false;
        displayQuestionPage();
        $("#startBtn").css("visibility", "hidden");
    }

    /** This function is to set the page to ask questions */
    function displayQuestionPage() {
        clearPage();
        //set time out
        startInterval();
        if (displayingAnswer) {
            clearTimeout(answerTimeOut);
            displayingAnswer = false;
        }
        displayingQuestion = true;
        questionTimeOut = setTimeout(displayAnswerPage, 30000);

        //set page content
        currQuestion = questionset[currIndex];
        $("#questionDiv").text(currQuestion.question);
        for (var i = 0; i < currQuestion.selection.length; i++) {
            var btnSelection = $("<button>");
            btnSelection.attr("value", currQuestion.selection[i]);
            btnSelection.addClass("selection");
            btnSelection.text(currQuestion.selection[i]);
            $("#answerDiv").append(btnSelection);
        }
        currIndex++;
    }

    /** This function is to set the page of displaying the results */
    function displayAnswerPage() {
        clearPage();
        stopInterval();
        if (displayingQuestion) {
            clearTimeout(questionTimeOut);
            displayingQuestion = false;
        }
        displayingAnswer = true;

        //time out
        if (timeLeft == 0) {
            numUnanswered++;
            $("#questionDiv").text("Out of Time!")
            var textAns = $("<div>");
            textAns.text("The Correct Answer was: " + currQuestion.answer);
            $("#answerDiv").append(textAns);
        }
        //correct
        else if (this.value === currQuestion.answer) {
            numCorrectAnswer++;
            $("#questionDiv").text("Correct!");
        }
        //wrong
        else {
            numWrongAnswer++;
            $("#questionDiv").text("Nope!");
            var textAns = $("<div>");
            textAns.text("The Correct Answer was: " + currQuestion.answer);
            $("#answerDiv").append(textAns);
        }
        
        var imgDiv = $("<img>");
        imgDiv.attr("src", currQuestion.imgUrl)
        $("#answerDiv").append(imgDiv);

        answerTimeOut = setTimeout(function () {
            clearTimeout(questionTimeOut);
            if (currIndex == questionset.length) {
                displayCompletionPage();
            }
            //complted
            else{
                displayQuestionPage(currIndex);
            }
        }, 3000);
    }

    function displayCompletionPage() {
        clearPage();
        $("#questionDiv").text("All done, heres how you did!");
        var res1 = $("<div>").text("Correct Answers: " + numCorrectAnswer);
        var res2 = $("<div>").text("Incorrect Answers: " + numWrongAnswer);
        var res3 = $("<div>").text(" Unanswered: " + numUnanswered);
        $("#answerDiv").append(res1);
        $("#answerDiv").append(res2);
        $("#answerDiv").append(res3);
        $("#startBtn").text("Start Over?");
        $("#startBtn").css("visibility", "visible");
    }


    /** This function is to clear content of the page */
    function clearPage() {
        $("#questionDiv").empty();
        $("#answerDiv").empty();
    }


    function startInterval() {
        if (!counting) {
            timeLeft = 30;
            intervalId = setInterval(countInterval, 1000);
            counting = true;
        }
    }

    function countInterval() {
        timeLeft--;
        $("#timerDiv").text(timeLeft);
    }

    function stopInterval() {
        counting = false;
        clearInterval(intervalId);
    }
















});