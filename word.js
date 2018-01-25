// Get the required packages and object constructors
var Letter = require('./letter');
var colors = require('colors');
// Word array to provide unknown words to guess
var dataBank = [
	'the office', 'arrested development', 'will and grace', 'malcolm in the middle', 'stranger things',
	'the fall', 'cast away on the moon', 'my sassy girl', 'fight club', 'dancer in the dark',
	'no country for old man', 'enter the dragon', 'kill bill', 'matrix', 'old boy', 'girl interrupted'
];
// Object constructor to pick a random word from the data bank
var Word = function() {
	this.rnd = Math.floor(Math.random() * dataBank.length);
	this.word = dataBank[this.rnd];
	this.split = this.word.split('');
	this.gameOver = false;
	this.win = false;

	// this function is for removing the used words from the data; however, I don't have time to use it now. 
	// I will work on this part later.
	// this.removeWord = function() {
	// 	dataBank.splice(this.rnd, 1);
	// }

	// this function creates an instance of the Letter object where the letter to word comparison is made
	this.createLetter = function() {
		this.letter = new Letter(this.word, this.split);
		this.letter.displayLines();
	}
}
// Object.prototype to interact with the Letter object to check if the gueesed letters match
Word.prototype.checkLetter = function(letter) {
	if (this.letter.count > 1) {
		this.letter.compareLetter(letter);
		if (this.letter.arr.join('') === this.letter.letters.join('')) {
			this.win = true;
		}
	} else {
		console.log('\nGAME OVER!\n\n'.red.bold);
		this.gameOver = true;
	}
}

module.exports = Word;


