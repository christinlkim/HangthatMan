var hangmanGame = {

  wordsToPick: {
    brunch: {
      picture: "brunch.jpg"
    },
    yoga: {
      picture: "yoga.jpg"
    },
    pumpkinspice: {
      picture: "pumpkinspice.jpg"
    },
    tequila: {
      picture: "tequila.jpg"
    },
    toms: {
      picture: "toms.jpg"
    }
  },

  //Variables
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  setupGame: function () {
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    this.lettersOfTheWord = this.wordInPlay.split("");

    this.rebuildWordView();

    this.processUpdateTotalGuesses();
  },

  updatePage: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    else {
      this.updateGuesses(letter);

      this.updateMatchedLetters(letter);

      this.rebuildWordView();

      if (this.updateWins() === true) {
        this.restartGame();
      }
    }

  },

  updateGuesses: function(letter) {
    if((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      this.guessedLetters.push(letter);

      this.guessesLeft--;

      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML =
      this.guessedLetters.join(", ");
    }
  },

  processUpdateTotalGuesses: function() {
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  updateMatchedLetters: function(letter) {
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        //Push the newly guessed letter into the matchedLetters array.
        this.matchedLetters.push(letter);
      }
    }
  },

  rebuildWordView: function() {

    var wordView = "";

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
      wordView += this.lettersOfTheWord[i];
    }
    else {
      wordView += "&nbsp;_&nbsp;";
    }
  }

  document.querySelector("#current-word").innerHTML = wordView;
},

restartGame: function() {
  document.querySelector("#guessed-letters").innerHTML = "";
  this.wordInPlay = null;
  this.lettersOfTheWord = [];
  this.matchedLetters = [];
  this.guessedLetters = [];
  this.guessesLeft = 0;
  this.totalGuesses = 0;
  this.letterGuessed = null;
  this.setupGame();
  this.rebuildWordView();
},

updateWins: function() {
  var win;

if (this.matchedLetters.length === 0) {
  win = false;
}
//Otherwise, we set win to true
else {
  win = true;
}

for (var i =0; i < this.lettersOfTheWord.length; i++) {
  if(this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
    win = false;
  }
}

if (win) {

  this.wins = this.wins + 1;

  document.querySelector("#wins").innerHTML = this.wins;

  document.querySelector("#bb-image-section").innerHTML =
  "<img class='bb-image-section' src='images/" +
  this.wordsToPick[this.wordInPlay].picture + "' alt='" + "'>'";

  return true;
}
return false;
}
};

hangmanGame.setupGame();

document.onkeyup = function(event) {
  hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  hangmanGame.updatePage(hangmanGame.letterGuessed);
};
