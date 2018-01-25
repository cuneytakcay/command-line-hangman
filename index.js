// Get the required packages and object constructors
var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var colors = require('colors');

// Provide your name to enter the game
function enterGame() {
	inquirer
	.prompt([
		{
			type: 'input',
			message: 'Enter your name to play:',
			name: 'player'	
		}
	])
	.then(function(response) {
		console.log(('Hello ' + response.player + ', welcome to Hangman!\n').green.bold);
		setTimeout(startGame, 1000); 
	});
}

// Game starts with this function
function startGame() {
	console.log('\nHere is your word to guess. Notice you cannot make more than 7 wrong guesses. Good luck.\n'.yellow.bold)
	
	// An instance of Word object created here
	var word = new Word();
	// Word object instance sends the selected word to the Letter object constructor
	word.createLetter();

	// progress() function takes the guess parameters
	function progress() {
		inquirer
			.prompt([
				{
					type: 'input',
					message: 'Guess a letter',
					name: 'letter',
					// Validates the user guess inputs, only accepts letters
					validate: function(value) {
						var done = this.async();
						var alphabet = ('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
						if (alphabet.search(value) < 0 || value.length < 1) { 
							done('You need to provide a letter!'); 
							return; 
						}
						done(null, true);
					}
				}
			])
			.then(function(response) {
				// Checks the user input if it matches to the unknown word
				// Decides for the next step
				word.checkLetter(response.letter);
				if(word.gameOver) {
					askToContinue();
				} else if (word.win) {
					console.log('CONGRATULATIONS!'.rainbow.bold);
					setTimeout(startGame, 1000);
				} else {
					// Provide the recursion by recalling this function
					progress();
				} 
			});
	}

	// Call progress() function
	progress();

	// Asks the user to play again or not when lost the game
	function askToContinue() {
		inquirer
			.prompt([
				{
					type: 'confirm',
					message: 'Do you want to play again?',
					name: 'confirm',
					default: true
				}
			])
			.then(function(response) {
				if (response.confirm === true) {
					startGame();
				} 
			});
	}
}

enterGame();
