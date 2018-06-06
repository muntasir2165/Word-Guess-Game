// global movie variable which will be populated with all the movies from The Movie Database (TMDb) API call
var movieArray = [];

hasGameStarted = false;
//the page in the result set to return
page = 1;

// object containing the state of the game
var gameState = {"wins": 0,
"remainingGuesses": 9,
"losses": 0,
"guessedLetters": [],
"currentMovie": {}};

$(document).ready(function() {
	document.onkeyup = function(event) {
    	// console.log(event);
    	// console.log(event.code);
		//if the space bar button is pressed, start the game
		if(event.code === "Space" && !hasGameStarted) {
			hasGameStarted = true;
			//developer api key
			var api_key = "87df092609d5d6015362ba701dc095d2";

			//the language of the movie to search for
			var language = "en-us";

			// generate a random year within the last ten years to search for a movie released that year
			var currentYear = new Date().getFullYear();
			var tenthYearFromNow = currentYear - 10;
			var randomYear = Math.floor(Math.random() * (currentYear - tenthYearFromNow + 1)) + tenthYearFromNow;

			// search The Movie Database (TMDb) for a list of movies for a random year within the last ten years
			var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&language=" + language + "&primary_release_year=" + randomYear + "page=" + page;
			$.ajax({
				url: url,
				success: function(result) {
					// console.log(result);
					var movieDataArray = result["results"];
					// console.log(movieDataArray);
					//intialize the movieArray variable to be an empty array if it wasn't empty already
					movieArray = [];
					movieDataArray.forEach(function(movieData){
					var movie = {};
					movie.movieTitle = movieData["original_title"].toUpperCase();
					movie.description = movieData["overview"];
					movieArray.push(movie);
					});
					// console.log(movieArray);

					//hide the starting instructions
					var startingInstructions = document.getElementById("starting-instructions");
					// startingInstructions.innerHTML = "";
					startingInstructions.style = "visibility: hidden";

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

function playSet() {
	console.log("Game Started!");
	// console.log(movieArray);
	// console.log(movieArray.length);
	while (movieArray.length > 0) {
		updateGameState();
		// var randomMovieIndex = Math.floor(Math.random() * (movieArray.length - 0)) + 0;
		// console.log(randomMovieIndex);
		// currentMovie = movieArray.slice(randomMovieIndex, 1);
		// movieArray.splice(randomMovieIndex, 1); //remove the selected movie from the array
		currentMovie = movieArray.shift();
		gameState.currentMovie = currentMovie;
		console.log("The movie title is: " + currentMovie.movieTitle);
		playGame(currentMovie);
	}
}

function playGame(currentMovie) {
	document.onkeyup = function(event) {
		if (event.code !== "Space") {
			gameState.guessedLetters.push(event.code);
			currentWordState();
		}
	}
}

// update the state of the game and display it in the user interface
function updateGameState() {
	var wins = document.getElementById("wins");
	wins.innerHTML = gameState.wins;
	var losses = document.getElementById("losses");
	losses.innerHTML = gameState.losses;
	var remainingGuesses = document.getElementById("remaining-guesses");
	remainingGuesses.innerHTML = gameState.remainingGuesses;
}

function currentWordState() {
	var wordDisplayContainer = document.getElementById("word-container");
	var word = "";
	for (var i = 0; i < gameState.currentMovie.movieTitle.length; i++) {
		
		for (var j = 0; j < gameState.guessedLetters.length; j++) {
			if (gameState.guessedLetters.charAt(j) === letter) {
				word += letter;
				break;
			} else {
				word += "-";

			}
		}
	} 
	// console.log("here");
	wordDisplayContainer.innerHTML = word;

}