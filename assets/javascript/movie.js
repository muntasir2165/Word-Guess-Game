// function getMovieListing() {

// 	//the movieArray variable to be returned
// 	var movieArray = [];	
// 	//developer api key
// 	var api_key = "87df092609d5d6015362ba701dc095d2";

// 	//the language of the movie to search for
// 	var language = "en-us";

// 	//generate a random year within the last ten years to search for a movie released that year
// 	var currentYear = new Date().getFullYear();
// 	var tenthYearFromNow = currentYear - 10;
// 	var randomYear = Math.floor(Math.random() * (currentYear - tenthYearFromNow + 1)) + tenthYearFromNow;

// 	// Search The Movie Database (TMDb) for a list of movies for a random year within the last ten years
// 	var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&language=" + language + "&primary_release_year=" + randomYear;
// 	$.ajax({
// 		url: url,
// 		success: function(result) {
// 			// console.log(result);
// 			var movieDataArray = result["results"];
// 			movieDataArray.forEach(function(movieData){
// 				var movie = {};
// 				movie.name = movieData["title"];
// 				movie.description = movieData["overview"];
// 				movieArray.push(movie);
// 			});
// 			// console.log(movieArray);

// 		},
// 		error: function(XMLHttpRequest, textStatus, errorThrown) {
// 			alert("Sorry, invalid request.");
// 			console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
// 		}
// 	});
// }


// $(document).ready(function() {
// 	//developer api key
// 	var api_key = "87df092609d5d6015362ba701dc095d2";


// 	//the language of the movie to search for
// 	var language = "en-us";

// 	//generate a random year within the last ten years to search for a movie released that year
// 	var currentYear = new Date().getFullYear();
// 	var tenthYearFromNow = currentYear - 10;
// 	var randomYear = Math.floor(Math.random() * (currentYear - tenthYearFromNow + 1)) + tenthYearFromNow;

// 	// Search The Movie Database (TMDb) for a list of movies for a random year within the last ten years
// 	var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&language=" + language + "&primary_release_year=" + randomYear;
// 	$.ajax({
// 		url: url,
// 		success: function(result) {
// 			// console.log(result);
// 			var movieDataArray = result["results"];
// 			var movieArray = [];
// 			movieDataArray.forEach(function(movieData){
// 				var movie = {};
// 				movie.name = movieData["title"];
// 				movie.description = movieData["overview"];
// 				movieArray.push(movie);
// 			});
// 			console.log(movieArray);

// 		},
// 		error: function(XMLHttpRequest, textStatus, errorThrown) {
// 			alert("Sorry, invalid request.");
// 			console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
// 		}
// 	});
// });