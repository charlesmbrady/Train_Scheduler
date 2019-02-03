
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
  var time = "";
  var frequency;


$("#submit").on("click", function(e) {
    e.preventDefault();
    
    name = $("#inputName").val().trim();
    destination = $("#inputDestination").val().trim();
    time = $("#inputTime").val().trim();
    frequency = $("#inputFrequency").val().trim();

    $("#inputName").val('');
    $("#inputDestination").val('');
    $("#inputTime").val('');
    $("#inputFrequency").val('');
    

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });

});

database.ref().on("child_added", function (snapshot) {
    var snap = snapshot.val();
    var row = $("<tr>");
    

    /*convertedDate = moment(snap.startDate, "MM/DD/YYYY")
    monthsWorked = parseInt(monthsWorked) ;
    totalBilled = parseInt(totalBilled) ;
    monthsWorked = convertedDate.diff(moment(), "months") * -1;
    totalBilled = snap.monthlyRate * monthsWorked;

    console.log(monthsWorked);
    console.log(totalBilled);
    */


    var td1 = $("<td>").text(snap.name);
    var td2 = $("<td>").text(snap.destination);
    var td3 = $("<td>").text(snap.frequency);
    //var td4 = $("<td>").text(nextArrival);
    //var td5 = $("<td>").text(minutesAway);
    



    row.append(td1, td2, td3);
    $("tbody").append(row);


});



