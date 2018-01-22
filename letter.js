//var array = [];
//var guess = '';

var Letter = function(word) {

	this.letters = word.split('');

	this.array = [];

	this.guessLetter = function(guess) {

		var guessedLetters = '';

		for (var i = 0; i < this.letters.length; i++) {
			if (guess.toLowerCase() === this.letters[i]) {
				this.array[i] = guess;
			} else if (this.letters[i] === ' ') {
				this.array[i] = '  ';
			} else {
				this.array[i] = '_ ';
			}
		}

		for (var i = 0; i < this.letters.length; i++) {
			guessedLetters += this.array[i];
		}

		return guessedLetters;
	}

}

//var arr = new Letter('hello world');
//console.log(arr.underscore());

module.exports = Letter;


// for (var i = 0; i < this.letters.length; i++) {
		// 	this.letters[i] !== " " ? blank += ' _' : blank += '  ';
		// }

		// return blank;




		//this.checkLetters = function(letter) {

	// 	for (var i = 0; i < this.letters.length; i++) {
	// 		letter.toLowerCase() === this.letters[i] ?  guess += letter : guess 
	// 	}

	// }