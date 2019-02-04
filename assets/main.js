
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAuyeXARcaCEihPH0eyP-BveDJ2cBnlGXw",
    authDomain: "train-scheduler-44016.firebaseapp.com",
    databaseURL: "https://train-scheduler-44016.firebaseio.com",
    projectId: "train-scheduler-44016",
    storageBucket: "",
    messagingSenderId: "228111815443"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency;

$("#submit").on("click", function(e) {
    e.preventDefault();
    //TODO: make sure firstTrainTime is valid input format HH:mm and less than 24:00
    
    name = $("#inputName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstTrainTime = $("#inputTime").val().trim();
    frequency = $("#inputFrequency").val().trim();

    $("#inputName").val('');
    $("#inputDestination").val('');
    $("#inputTime").val('');
    $("#inputFrequency").val('');
    

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });

});

database.ref().on("child_added", function (snapshot) {
    var snap = snapshot.val();
    var frequency = parseInt(snap.frequency);

    
  
    var format = "hh:mm A";
    var first = moment(snap.firstTrainTime, format);
    var nextTrainTime = first;

    while(nextTrainTime.diff(moment(), "minutes") < 0){
        nextTrainTime = nextTrainTime.add(frequency, "minutes");
    };
    var minutesAway = nextTrainTime.diff(moment(), "minutes");
    
    
    var td1 = $("<td>").text(snap.name);
    var td2 = $("<td>").text(snap.destination);
    var td3 = $("<td>").text(snap.frequency);
    var td4 = $("<td>").text(nextTrainTime.format(format));
    var td5 = $("<td>").text(minutesAway);

    var row = $("<tr>");
    row.append(td1, td2, td3, td4, td5);
    $("tbody").append(row);

});



