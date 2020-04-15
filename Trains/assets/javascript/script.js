$(document).ready(function(){

    function currentTime() {
        var current = moment().format('LTS');
        $('#currentTime').html(current);
        setTimeout(currentTime, 1000);
    }
    console.log(currentTime);
    console.log(moment().format('LTS'));

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var startTime = "";
  var tfrequency = 0;

	$("#submitBtn").on("click", function(){

		var name = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var time = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequency = $("#frequency").val().trim();

		console.log(name);
		console.log(destination);
		console.log(time);
		console.log(frequency);

		var train = {

            name:  name,
            
            destination: destination,
            
            trainTime: time,
            
            frequency: frequency
            
		}

        database.ref().push(train);

    });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
        var timeRemain = timeDiff % childSnapshot.val().frequency;
        var minToArrival = childSnapshot.val().frequency - timeRemain;
        var nextTrain = moment().add(minToArrival, "minutes");
        var key = childSnapshot.key;

        var trainInfo = $("<tr>");
        
            trainInfo.append($("<td>" + childSnapshot.val().name + "</td>"));
            trainInfo.append($("<td>" + childSnapshot.val().destination + "</td>"));
            trainInfo.append($("<td class='text-center'>" + childSnapshot.val().frequency + "</td>"));
            trainInfo.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
            trainInfo.append($("<td class='text-center'>" + minToArrival + "</td>"));
            // trainInfo.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));
    
            $("#trainSchedule").append(trainInfo);
    
    });
    currentTime();

setInterval(function() {
  window.location.reload();
}, 60000);
});

