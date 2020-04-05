var quiz = [
	{
		name        : 'In America, Ice Cream is a Popular Treat',
		answer      : 'true',
		wronganswer : 'false'
	},
	{
		name        : 'Baskin Robbins Originally Had 36 Flavors of Ice Cream',
		answer      : 'false',
		wronganswer : 'true'
	},
	{
		name        : 'Vanilla is the Most Popular Flavor of Ice Cream',
		answer      : 'false',
		wronganswer : 'true'
	},
	{
		name        : 'China Was the Birthplace of Ice Cream',
		answer      : 'true',
		wronganswer : 'false'
	},
	{
		name        : 'There Are Over 1000 Different Kinds of Ice Cream',
		answer      : 'true',
		wronganswer : 'false'
	}
];

var rightAnswer = 0;

var wrongAnswer = 0;

var unanswered = 0;

var startingQuestion = 0;

var answers = 0;

var counter = 10;

function myTime() {
	counter--;
	$('.time').html('Time Remaining: ' + counter);
	if (counter < 1) {
		if (answers == 4) {
            resetGame();
		} else {
			clearInterval(myTimer);
			answers++;
			unanswered++;
			startingQuestion++;
			writeQuestion(startingQuestion);
		}
	}
}

$('.start-btn').click(function() {
	$('.quiz').show();
	$('.start-btn').hide();
	$('.timeout').hide();
	$('#timer1').html('Time Remaining: ' + counter);
	writeQuestion(startingQuestion);
});

$(document).on('click', '#answer', function() {
	clearInterval(myTimer);
	var userChose = $(this).attr('value');
	var question = $(this).attr('question-num');
	console.log('Correct answer should be: ' + quiz[question].answer);
	answers++;
	console.log(answers);

	if (userChose === quiz[question].answer) {
		rightAnswer++;
		console.log(rightAnswer);
		//call function to display correct answer to user here
	} else if (userChose === quiz[question].wronganswer) {
		wrongAnswer++;
		console.log(wrongAnswer);
		//call function to display correct answer to user here
	}
	//this could be moved to reset game function
	if (answers == 5 ) {
		$('.timeout').show();
		$('.timeout-message').html(
			'<div>You got ' +
				rightAnswer +
				' right!</div><div>You got ' +
				wrongAnswer +
				' wrong.</div><div>' +
				unanswered +
				' questions were left unanswered.</div>'
		);

		setTimeout(function() {
			resetGame();
		}, 2000);
	}

	startingQuestion++;
	writeQuestion(startingQuestion);
	console.log(startingQuestion);
});

function resetGame(type) {
	clearInterval(myTimer);

	rightAnswer = 0;
	wrongAnswer = 0;
	unanswered = 0;
	startingQuestion = 0;
	answers = 0;

	$('.quiz').hide();
	$('.time').empty();
	$('.start-btn').show();
}

function writeQuestion(question) {
	if (question != quiz.length) {
		counter = 10;
		myTimer = setInterval(myTime, 1000);
		$('.quiz').empty();
		var ques = quiz[question];
		var newDiv = $('<div>');
		newDiv.addClass('h3 text-light text-center m-5 quest1 card bg-dark');
		$(newDiv).append(ques.name);
		var trueBtn = $('<button>');
		trueBtn.addClass('btn btn-primary mt-5 mx-3');
		trueBtn.html('True');
		trueBtn.attr('type', 'button');
		trueBtn.attr('id', 'answer');
		trueBtn.attr('question-num', question);
		trueBtn.attr('value', 'true');
		var falseBtn = $('<button>');
		falseBtn.addClass('btn btn-danger my-5 mx-3');
		falseBtn.html('False');
		falseBtn.attr('type', 'button');
		falseBtn.attr('question-num', question);
		falseBtn.attr('id', 'answer');
		falseBtn.attr('value', 'false');
		$(newDiv).append(trueBtn);
		$(newDiv).append(falseBtn);

		$('.quiz').append(newDiv);
	}
}
