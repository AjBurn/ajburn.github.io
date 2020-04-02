var quiz = [
    {
       name: "In America, Ice Cream is a Popular Treat",
       answer: "true",
       wronganswer: "false",
    },
    {
        name: "Baskin Robbins Originally Had 36 Flavors of Ice Cream",
        answer: "false",
        wronganswer: "true",
     },
     {
        name: "Vanilla is the Most Popular Flavor of Ice Cream",
        answer: "false",
        wronganswer: "true",
     },
     {
        name: "China Was the Birthplace of Ice Cream",
        answer: "true",
        wronganswer: "false",
     },
     {
        name: "There Are Over 1000 Different Kinds of Ice Cream",
        answer: "true",
        wronganswer: "false",
     }
];

var rightAnswer = 0;

var wrongAnswer = 0;

var startingQuestion = 0;

var answers = 0;

$(".start-btn").click(function(){
    $('.quiz').show();
    $('.start-btn').hide();
    $('.timeout').hide();
    var counter = 10;
    var newDiv = $('<div>');
    newDiv.addClass("text-center time pb-3");
    newDiv.html("Time Remaining: " + counter);
    $('.container').append(newDiv);
    myTimer = setInterval(myTime, 1000);
    function myTime() {
        counter--;
        newDiv.html("Time Remaining: " + counter);
        if (counter < 1) {
           resetGame("time");
        }
    }

    writeQuestion(startingQuestion);
});

$(document).on("click", "#answer", function(){
    var userChose = $(this).attr("value");
    var question = $(this).attr("question-num");
    console.log("Correct answer should be: " + quiz[question].answer);
    answers++;
    console.log(answers);

    if (userChose === quiz[question].answer) {
        rightAnswer++;
        console.log(rightAnswer);
    } else {
        wrongAnswer++;
        console.log(wrongAnswer);
    }
    if (rightAnswer == 5) {
        $('.timeout').show();
        $('.timeout-message').html("You answered all questions correctly!");
    }
    //Find a way to reset the game.
    if (answers == 5) {
        $('.timeout').show();
       $('.timeout-message').html("<div>You got " + rightAnswer + " right.</div><div>You got " + wrongAnswer + " wrong</div>");

       setTimeout(function(){
           resetGame("completed");
       }, 2000);
    }

    var nextQuestion  = Number(question) + 1;
    console.log(nextQuestion);
    writeQuestion(nextQuestion);

    
});
// Ran out of time, or answered all questions

// completed all five correctly and then timeout time
function resetGame(type){
    rightAnswer = 0;
    wrongAnswer = 0;
    startingQuestion = 0;
    nextQuestion = 0;
    answers = 0;
    
    $('.quiz').hide();
    $('.time').empty();

    if(type=== "time"){
        $('.timeout').show();
        $('.timeout-message').show();
        $('.timeout-message').html("You ran out of time");
        $('.try-btn').show();


    } else {
        $('.new-game').show();
        $('.timeout-message').hide();
    }
    // Show how many right, and how many wrong, etc
    clearInterval(myTimer);
}

//Code a button that allows you to restart the game when time has run out.

/*
$(document).on("click", "#try-btn", function(){
    
    resetGame("time");
    $('.timeout').hide();
    $('#try-btn').hide();
    $('.quiz').show();
});*/


function writeQuestion(question) {
    if (question != quiz.length){
        $('.quiz').empty();
        var ques = quiz[question];
        var newDiv = $('<div>');
        newDiv.addClass("h3 text-light text-center m-5 quest1 card bg-dark");
        $(newDiv).append(ques.name);
        var trueBtn = $('<button>');
        trueBtn.addClass("btn btn-primary mt-5 mx-3");
        trueBtn.html("True");
        trueBtn.attr("type", "button");
        trueBtn.attr("id", "answer");
        trueBtn.attr("question-num", question);
        trueBtn.attr("value", "true");
        var falseBtn = $('<button>');
        falseBtn.addClass("btn btn-danger my-5 mx-3")
        falseBtn.html("False");
        falseBtn.attr("type", "button");
        falseBtn.attr("question-num", question);
        falseBtn.attr("id", "answer");
        falseBtn.attr("value", "false");
        $(newDiv).append(trueBtn);
        $(newDiv).append(falseBtn);
        
        $('.quiz').append(newDiv);
    }
}