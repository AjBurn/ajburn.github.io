// variables
var rpg = [
	{
		name               : 'Storm Spirit',
		image              : 'assets/images/Storm_Spirit_icon.png',
		description        : 'High HP with low attack damage.',
		healthPoints       : 150,
		attackPower        : 30,
		counterAttackPower : 35
	},

	{
        name               : 'Sniper',
        image              : 'assets/images/Sniper_icon.png',
		description        : 'Low HP with high attack damage.',
		healthPoints       : 120,
		attackPower        : 45,
		counterAttackPower : 50
	},
	{
        name               : 'Morphling',
        image              : 'assets/images/Morphling_icon.png',
		description        : 'Moderate HP with moderate attack damage.',
		healthPoints       : 140,
		attackPower        : 35,
		counterAttackPower : 40
	},

	{
        name               : 'Juggernaut',
        image              : 'assets/images/Juggernaut_icon.png',
		description        : 'Lower HP and lower attack damage but high counter attack damage.',
		healthPoints       : 130,
		attackPower        : 35,
		counterAttackPower : 50
	}
];
//functions

function makeHTML(pointer) {
	var newDiv = $('<div>').addClass('card bg-secondary');
	newDiv.attr('id', rpg[pointer].name);
	newDiv.append('<img src=' + rpg[pointer].image + '>').addClass('card-img');
	var cardBody = $('<div>').addClass('card-body');
	cardBody.append("<h5 class='card-title'>" + rpg[pointer].name + '</h5>');
	cardBody.append("<p class='card-text'>" + rpg[pointer].description + '</p>');
	newDiv.append(cardBody);

	return newDiv;
}

$(document).ready(function() {
	for (var i = 0; i < rpg.length; i++) {
		var name=rpg[i].name.toLowerCase()
		var col = $('<div>').addClass('col-2 player-card inactive');
		col.addClass(name)
		var newDiv = $('<div>').addClass('card bg-secondary');
		newDiv.attr('id', rpg[i].name);
		newDiv.append("<img src='" + rpg[i].image + "'>").addClass('card-img');
		var cardBody = $('<div>').addClass('card-body');
		cardBody.append("<h5 class='card-title'>" + rpg[i].name + '</h5>');
		cardBody.append("<p class='card-text'>" + rpg[i].description + '</p>');
		cardBody.append("<button class='btn btn-primary selector' type='button' value='" + i + "'> Battle</button>");
		newDiv.append(cardBody);
		col.append(newDiv);
		$("#selection").append(col);
	}


	//Add function for moving hero to yourhero div and moving others to opponents
	$(".selector").unbind().click(function(event) {
		event.stopPropagation();
		event.stopImmediatePropagation();
		var charId=event.currentTarget.attributes.value.value;
		$(this).removeClass('selector');
		console.log(charId);
		if (charId == 0) {
			$('#yourhero').append($('.storm'));
			$('.storm').removeClass('inactive');
			$(this).addClass('battle');
		}
		if (charId == 1) {
			$('#yourhero').append($('.sniper'))
			$('.sniper').removeClass('inactive')
		}
		if (charId == 2) {
			$('#yourhero').append($('.morphling'))
			$('.morphling').removeClass('inactive')
		}
		if (charId == 3) {
			$('#yourhero').append($('.juggernaut'))
			$('.juggernaut').removeClass('inactive')
		}
		$('#opponent').append($('.inactive'))
	});

	

//Add function for selecting opponent and moving others to remaining div
	
//Add function for attacking opponent

//Add function for combat and attack increase

//Remove HP from opponent class and yourhero

//Add function allowing player to select new opponent from remaining class

	var myChar = makeHTML(0);

	//if statements
});


$(document).on('click', '.card-body .battle', function(event) {
	//var charId=event.currentTarget.attributes.value.value;
	console.log('clicked');
	if (charId == 0) {
		$('#battleground').append($('.storm'));
	}
});