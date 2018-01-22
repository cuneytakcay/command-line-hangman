var inquirer = require('inquirer');
var Word = require('./word');
var Letter = require('./letter');
var data = require('./data');
var colors = require('colors');

var guess = 7;
var dataCategory = null;

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
		print(colors.green.bold, 'Hello ' + response.player + ', welcome to Hangman!');
		console.log();
		setTimeout(selectCategory, 1000);
	});
}

function selectCategory() {
	inquirer
	.prompt([
		{
			type: 'list',
			message: 'Select the category you want to play',
			choices: ['Science', 'Food', 'Music', 'TV', 'Movie'],
			name: 'category'	
		},
		{
			type: 'confirm',
	    	message: 'You have ' + guess + ' guesses to find the word. Are you ready?',
	    	name: 'confirm',
	    	default: true
		}
	])
	.then(function(response) {
		console.log();
		print(colors.green.bold, response.category + ' category word');
		console.log();
		startGame(response.category);
	});
}

function startGame(category) {

	switch(category) {
		case 'Science':
			playGame(data.science);
			break;
		case 'Food':
			playGame(data.food);
			break;
		case 'Music':
			playGame(data.music);
			break;
		case 'TV':
			playGame(data.tv);
			break;
		case 'Movie':
			playGame(data.movie);
			break;
	}

}

function playGame(dataCategory) {

	var rnd = Math.floor(Math.random() * dataCategory.length); 
	var currentWord = new Word(dataCategory[rnd]);
	var letters = new Letter(currentWord.word);

	console.log(letters.guessLetter(''));
	console.log();
	progress();

	function progress() {


	inquirer
		.prompt([
			{
				type: 'input',
				message: 'Guess a letter',
				name: 'letter',
				validate: function(value) {
					var done = this.async();
					var alphabet = ('abcdefghijklmnopqrstuvwxyz');
					if (alphabet.search(value) < 0 || value.length < 1) { 
						done('You need to provide a letter!'); 
						return; 
					}
					done(null, true);
				}
			}
		])
		.then(function(response) {
			//console.log(rnd); // discard
			//console.log(dataCategory); // discard
			//console.log(currentWord.word); // discard
			console.log();
			console.log(letters.guessLetter(response.letter));
			//console.log(dataCategory.splice(rnd, 1)); // discard
			//console.log(dataCategory); // discard
			console.log();
			progress();
		});
	}
}

enterGame();

function print(color, text) {
	console.log(color(text));
}
