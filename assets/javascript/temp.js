$(document).ready(function() {
    		$('#search').keypress(function(e) {
				var key = e.which;
				// the Enter key code
				if(key == 13) {	
			    	var search = $('#search').val();
			    	console.log("The searched value is: " + search);
			    	var url = "https://pixabay.com/api/?key=2487856-f0378cfab26fe46305771d46a&q=" + search + "&per_page=52";
			    	$.ajax({
			    		url: url,
			    		success: function(result) {
			    			$("#pixabay").show();
			    			console.log(result);
			    			var totalHits = result["totalHits"];
			    			$("#totalSearchResults").html("Images found: " + totalHits);
			    			if (totalHits > 52) {
			    				console.log("We will consider only the fist 52 of " + totalHits +" pics for our gallery");
			    				totalHits = 52;
			    			}
			    			$("#totalSearchResults").append("&emsp;&emsp;Images displayed: " + totalHits);
			    			//clear the image div container from previous query results (if any)
			    			//specify the number of pictures per row
			    			$("#photoGallery").empty();
			    			var picsPerRow = 3;
			    			for(var i = 0; i < totalHits; i++) {
								var picObject = result["hits"][i];
								var picUrl = picObject["webformatURL"];
								if (picsPerRow == 4) {
							  		var newRow = '<div class="row">';
							  		$("#photoGallery").append(newRow);
							  	}
							 	var htmlImage = '<img src=' + picUrl + ' style="margin: 0.5%; width: 250px; height: 250px;"' + ' class="col-md-4 img-thumbnail">';
								$("#photoGallery").append(htmlImage);
								if (picsPerRow == 1) {
							  		var endRow = '</div>';
							  		$("#photoGallery").append(endRow);
							  		picsPerRow = 3;
							  		continue;
							    }
							    picsPerRow--;
							} 
			    		},
			    		error: function(XMLHttpRequest, textStatus, errorThrown) {
					        alert("Sorry, invalid request.");
					        console.log("textStatus: " + textStatus + " errorThrown: " + errorThrown);
					    }
			    	});
			  	}
			});
    	});