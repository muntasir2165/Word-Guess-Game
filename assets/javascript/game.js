// generate an array of letters in the English alphabet for reference
var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

// global movie collection variable which will be populated with all the movies from The Movie Database (TMDb) API call
var movieArray = [];

var hasGameStarted = false;

// the page in the result set that the API call is expected to return
// initialized to 0
var page = 0;

// object to store the state of the game
var gameState = {};

$(document).ready(function() {
	document.onkeyup = function(event) {
    	// console.log(event);
    	// console.log(event.code);
		//if the space bar button is pressed, start the game
		if(!hasGameStarted && event.code === "Space") {
			console.log("YeeeH");
			startOrStopGame();
			
			//developer api key
			var api_key = "87df092609d5d6015362ba701dc095d2";

			//search movies where English is the spoken language
			var with_original_language = "en";

			// generate a random year within the last ten years to search for movies released that year
			var currentYear = new Date().getFullYear();
			var tenthYearFromNow = currentYear - 10;
			var randomYear = Math.floor(Math.random() * (currentYear - tenthYearFromNow + 1)) + tenthYearFromNow;

			// search The Movie Database (TMDb) for a list of movies for a random year (selected above) within the last ten years
			var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&with_original_language=" + with_original_language + "&primary_release_year=" + randomYear + "&page=" + (++page);
			console.log("The request url is: " + url);
			$.ajax({
				url: url,
				success: function(result) {
					var movieDataArray = result["results"];
					//intialize the movieArray variable to be an empty array if it wasn't empty already
					movieArray = [];
					movieDataArray.forEach(function(movieData){
					var movie = {};
					movie.movieName = movieData["original_title"].toUpperCase();
					movie.description = movieData["overview"];
					movieArray.push(movie);
					});
					// console.log(movieArray);
					// movieArray = movieArray.splice(0, 2);
					// var count = 0;
					// movieArray.forEach(function(movie){
					// 	console.log(count++)
					// 	console.log(movie);
					// });

					playSet();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("Sorry, invalid request.");
					console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
				}
			});
		}
	};
});

// start game and set game parameters
// OR
// stop game and reset game parameters
function startOrStopGame() {
	var startingInstructionsStyle = "";
	if (!hasGameStarted) {
		hasGameStarted = true;
		startingInstructionsStyle = "visibility: hidden";
		gameState = {"wins": 0,
			"remainingGuesses": 9,
			"losses": 0,
			"guessedLetters": [],
			"chosenMovie": {}};
		provideGameFeedback("general", "");	
	} else {
		hasGameStarted = false;
		startingInstructionsStyle = "visibility: visible";
		var feedback = "Player statistics for the last set of games: " + gameState.wins + " wins and " + gameState.losses + " losses";
		provideGameFeedback("general", feedback);	
		// gameState = {"wins": "",
		// 	"remainingGuesses": "",
		// 	"losses": "",
		// 	"guessedLetters": [],
		// 	"chosenMovie": {}};
	}
	// show/hide the starting instructions
	var startingInstructions = document.getElementById("starting-instructions");
	startingInstructions.style = startingInstructionsStyle;
}
function playSet() {
	// console.log(movieArray);
	// console.log(movieArray.length);
	if (movieArray.length > 0) {
	console.log("New Game Started!");		
		// updateGameState();
		// updateWordState();
		initializeGameState();
		playGame();
	} else {
		provideGameFeedback("general", "Game Over");
		// setTimeout(startOrStopGame(), 1000);
		startOrStopGame();
	};
}

function playGame() {
	document.onkeyup = function(event) {
		// console.log(event);
		if (hasGameStarted) {
			if (event.code !== "Space" && alphabetArray.indexOf(event.key.toUpperCase()) > -1 ) {
				provideGameFeedback("general", "");
				updateGame(event.key.toUpperCase());
			} else {
				provideGameFeedback("general", "Please only input letters from the English alphabet");
			}
		}
	}
}

// initialize game state
function initializeGameState() {
	// randomly choose a movie for the game
	// console.log("hi2");
	// console.log(movieArray);
	// console.log("hi2");
	gameState.chosenMovie = chooseMovie(movieArray);
	// console.log the chosen movie name (for debugging and perhaps cheating purposes!)
	console.log("The movie title is: " + gameState.chosenMovie.movieName);
	gameState.remainingGuesses = 9;
	gameState.guessedLetters = [];
	updateGame();
}

function updateGame(guessedLetter) {
	var wins = document.getElementById("wins");
	var losses = document.getElementById("losses");
	var remainingGuesses = document.getElementById("remaining-guesses");
	var movieNameDisplayContainer = document.getElementById("movie-name");
	var wronglyGuessedLettersContainer = document.getElementById("letters-guessed");
	var movieNameArray  = gameState.chosenMovie.movieName.split("");
	var movieNameToDisplay = "";
	var wronglyGuessedLettersToDisplay = "";

	// if guessedLetter is falsey, the game just started and no
	// letter has been guessed yet
	if (!guessedLetter) {
		wins.innerHTML = gameState.wins;
		losses.innerHTML = gameState.losses;
		remainingGuesses.innerHTML = gameState.remainingGuesses;
		movieNameArray.forEach(function(character){
			if (alphabetArray.indexOf(character) <= -1) {
				movieNameToDisplay += character;
			} else {
			movieNameToDisplay += "*";
			}	
		});

	} else {
		if (movieNameArray.indexOf(guessedLetter) <= -1 && gameState.guessedLetters.indexOf(guessedLetter) <= -1) {
			// 1) if the guessed letter is NOT part of the movie title
			// AND 
			// 2) if the letter has NOT been guessed yet then
			// penalize the player
			gameState.remainingGuesses--;
			// update the array of guessed letters with the newly
			// guessed letter
			gameState.guessedLetters.push(guessedLetter);
		} else if (movieNameArray.indexOf(guessedLetter) > -1 && gameState.guessedLetters.indexOf(guessedLetter) <= -1) {
			// 1) if the guessed letter is part of the movie title 
			// AND 
			// 2) if the letter was NOT guessed previously then
			// update the array of guessed letters with the newly
			// guessed letter
			gameState.guessedLetters.push(guessedLetter);
		} else if (gameState.guessedLetters.indexOf(guessedLetter) > -1) {
			// if the letter was guessed previously (regardless of
			// whether the letter is part of the movie or not) then
			// let the player know and do nothing else
			provideGameFeedback("duplicate", guessedLetter);
		}
		// construct the movie name to display with correctly guessed
		// letters, non-alphabetic characters and "*" for letters yet
		// to be guessed
		movieNameArray.forEach(function(character){
			// if the character in the movie name is not an
			// alphabet or has been guessed, display it
			if (alphabetArray.indexOf(character) <= -1 || gameState.guessedLetters.indexOf(character) > -1) {
				movieNameToDisplay += character;
			} else {
				movieNameToDisplay += "*";
			}	
		});
	}

	// construct the wronly guessed letters to display that are not
	// part of the movie name
	gameState.guessedLetters.forEach(function(letter){
		if (movieNameArray.indexOf(letter) <= -1) {
			wronglyGuessedLettersToDisplay += letter + " ";
		}
	});
	// update the div containing the wrongly guessed letters
	wronglyGuessedLettersContainer.innerHTML = wronglyGuessedLettersToDisplay;

	// update the div containing the correctly guessed letters in the
	// movie name
	movieNameDisplayContainer.innerHTML = movieNameToDisplay;

	// check if all the letters have been guessed without running
	// out of the guess limit and the game is won
	// OR
	// the player is out of guesses and the game is lost
	if (movieNameToDisplay.indexOf("*") <= -1 && gameState.remainingGuesses >= 1) {
		gameState.wins++;
		provideGameFeedback("win");
		setTimeout(playSet(), 1000);
	} else if (movieNameToDisplay.indexOf("*") > -1 && gameState.remainingGuesses <= 0) {
		gameState.losses++;
		provideGameFeedback("loss");
		// playSet();
		setTimeout(playSet(), 5000);
	}

	wins.innerHTML = gameState.wins;
	losses.innerHTML = gameState.losses;
	remainingGuesses.innerHTML = gameState.remainingGuesses;
}

// acceptable string parameter values for the provideGameFeedback function:
	// "win": the player won the game
	// "loss": the player lost the game
	// "duplicate": the player has already guessed the passed in letter ( signified by data)
	// "general": provide a general feedback with data
function provideGameFeedback(status, data) {
	var gameFeedbackContainer = document.getElementById("game-feedback");
	var feedback = "";
	switch (status) {
		case "win":
			feedback = "You have successfully guessed the movie name: " + gameState.chosenMovie.movieName;
			break;
		case "loss":
			feedback = "You failed to correctly guess the movie name: " + gameState.chosenMovie.movieName;
			break;
		case "duplicate":
			if (data) {
				feedback = "You have already guessed the letter: " + data;
				break;
			}
		case "general":
			feedback = data;
			break;
	}
	gameFeedbackContainer.innerHTML = feedback;
}

// helper function to randomly select a movie from the movieArray,
// remove it from the array and then return it
function chooseMovie(movieArray) {
	// console.log("starting the chooseMovie function:");
	// console.log(movieArray);
	var index = [Math.floor(Math.random()*movieArray.length)];
	var chosenMovie = movieArray.splice(index, 1)[0];
	// console.log(chosenMovie);
	// console.log("-----");
	// console.log(movieArray);
	// console.log("ending the chooseMovie function:");
	return chosenMovie;
}