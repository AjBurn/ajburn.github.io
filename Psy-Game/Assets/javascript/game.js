var alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z'
];

var randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

var wins = 0;

var losses = 0;

var guesses = 10;

var lettersGuessed = [];

var winsText = document.getElementById('wins-text');
var lossesText = document.getElementById('losses-text');
var guessesText = document.getElementById('guesses-left');
var guessedText = document.getElementById("guesses-so-far");
console.log(randomLetter);

document.onkeyup = function(event) {
    var letter = event.key;
    //document event.keycode

	if (!lettersGuessed.includes(letter)) {
		lettersGuessed.push(letter);
		guessedText.textContent = "Your guesses so far: " + lettersGuessed;

		if (letter === randomLetter) {
			alert('You win!');
			wins++;
            winsText.textContent = "Wins: " + wins;
            guesses = 10;
				lettersGuessed = [];
                randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                console.log(randomLetter);
		} else {
			guesses--;
			guessesText.textContent = "Guesses left: " + guesses;
			if (guesses === 0) {
				losses++;
				lossesText.textContent = "Losses: " + losses;
				guesses = 10;
				lettersGuessed = [];
                randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                console.log(randomLetter);
			}
		}
	}
};
