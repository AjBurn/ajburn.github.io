$(document).ready(function() {
	var food = [ 'burgers', 'pizza', 'steak', 'pineapple' ];

	function renderButtons() {
		$('#buttonView').empty();
		for (let i = 0; i < food.length; i++) {
			gifBtn = $('<button class="btn btn-primary mt-5 mx-3 gif-btn text-capitalize">');
			gifBtn.attr('data-name', food[i]);
			gifBtn.text(food[i]);
			$('#buttonView').append(gifBtn);
		}
	}

	$('#add-btn').on('click', function(event) {
		event.preventDefault();
		var newFood = $('#search-bar').val().trim();

		$('#search-bar').val('');
		food.push(newFood);
		console.log(food);
		renderButtons();
	});

	renderButtons();
	
	$(document).on('click', '.gif-btn', function() {
		var gifBtn;

		var gif = $(this).attr('data-name');

		var queryURL =
			'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=1obEZoPPKMJDJuEVAGU2hkx7hWpjfQBr&limit=10';

		console.log(queryURL);

		$.ajax({
			url    : queryURL,
			method : 'GET'
		}).then(function(response) {
			console.log(response);
			for (let i = 0; i < response.data.length; i++) {
				var imageStill = response.data[i].images.downsized_still.url;
				var imageAnimate = response.data[i].images.downsized_large.url;
				var rating = response.data[i].rating;
				var displayRating = $('<p style=‘text-transform: capitalize;’>').html('Gif rating: ' + rating);
				var newDiv = $('<div>');
				console.log(rating);
				var displayGif = $('<img>').attr('src', imageStill);
				newDiv.append(displayGif);
				$('#gif-div').prepend(newDiv);
				$('img').attr('data-state', 'still');
				$('img').addClass('gif');
				displayGif.attr('data-animate', imageAnimate);
				displayGif.attr('data-still', imageStill);
				newDiv.append(displayRating);
			}
		});

		$(document).on('click', '.gif', function() {
			console.log('hi');
			var state = $(this).attr('data-state');

			var still = $(this).attr('data-still');

			var animate = $(this).attr('data-animate');

			if (state === 'still') {
				state = 'animate';
				$(this).attr('src', animate);
				$(this).attr('data-state', state);
			} else if (state === 'animate') {
				state = 'still';
				$(this).attr('src', still);
				$(this).attr('data-state', state);
			}
		});
	});
});