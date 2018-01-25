// Get the required packages
var colors = require('colors');

// Object constructor to check if the user guesses match the unknown word
var Letter = function(word, letters) {
	this.word = word;
	this.letters = letters;
	this.arr = [];
	this.count = 7;
	// This function displays the placeholder lines when the game first starts
	this.displayLines = function() {
		var lines = '';

		for (var i = 0; i < this.letters.length; i++) {
			this.letters[i] === ' ' ? lines += '  ' : lines += ' _';
		}
		console.log('\n' + lines + '\n');
	}
}

//Object.prototype where the matching process takes place
Letter.prototype.compareLetter = function(userInput) {
	var guessOutput = '';
	var correct = false;

	for (var i = 0; i < this.letters.length; i++) {
		if (userInput.toLowerCase() === this.letters[i]) {
			this.arr[i] = userInput;
			correct = true;
		} else {
			if (this.letters[i] === ' ') {
				this.arr[i] = ' ';
			} else if (this.arr[i] === undefined) {
				this.arr[i] = ' _';
			}
		}
	}

	if(correct)  {
		console.log('\nCORRECT!'.green.bold);
	} else { 
		console.log('\nINCORRECT!'.red.bold);
		this.count--;
		console.log(('You have ' + this.count + ' guesses remaining!').yellow.bold);
	}

	for (var i = 0; i < this.arr.length; i++) {
		guessOutput += this.arr[i];
	}
	console.log('\n' + guessOutput + '\n');
}

module.exports = Letter;

