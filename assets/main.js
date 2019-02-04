
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
    var first = moment().format(snap.firstTrainTime, "HH:mm");
    var frequency = parseInt(snap.frequency);
    
    var nextTrainTime= first;
    
    var a = moment().format("HH:mm");
    console.log("now is " + a);
    console.log(first);
    var difference = a.diff(moment(), "minutes");
    //TODO:
    console.log("the difference is : " + difference);
    

    
   /*
    while( < 0) {                   //while first is in the past, add frequency minutes...
        nextTrainTime.add(frequency, "m");
        console.log(nextTrainTime);                                
    }

 */   
    


    
    
    

    


    var td1 = $("<td>").text(snap.name);
    var td2 = $("<td>").text(snap.destination);
    var td3 = $("<td>").text(snap.frequency);
    //var td4 = $("<td>").text(nextArrival);
    //var td5 = $("<td>").text(minutesAway);
    


    var row = $("<tr>");
    row.append(td1, td2, td3);
    $("tbody").append(row);


});



