//var data = require('./data');

// Object constructor to create the current word
var Word = function(word) {

	this.word = word;

	this.correct = function() {
		console.log('Congratulations! You got ' + this.word + ' right.');
	}

	this.wrong = function() {
		console.log('Sorry, you couldn\'t get ' + this.word + ' . Maybe next time...');
	}
	
}

//var currentWord = new Word(data.science[3]);
//console.log(currentWord.word);

module.exports = Word;