// Initialize Firebase
var config = {
    apiKey: "AIzaSyB34oPxKmKwRg-JXIZ-1cv_xX75z-uxWHA",
    authDomain: "trains-1efaf.firebaseapp.com",
    databaseURL: "https://trains-1efaf.firebaseio.com",
    projectId: "trains-1efaf",
    storageBucket: "trains-1efaf.appspot.com",
    messagingSenderId: "657916135809"
  };
  firebase.initializeApp(config);

// take inputs from form, add them to firebase
// "child-watcher will takes those inputs and manipulate them accordingly for the train watcher."


$(".addTrainBtn").on("click", function (event) {
    event.preventDefault();

    // take inputs from forms and make them a new object
    // push new object to firebase

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var time = moment($("#timeInput").val().trim(), "HH:mm").format("X");
    console.log(time);
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name : trainName,
        dest : destination,
        time : time,
        freq : frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain);
    alert("train added");

    $("#trainNameInput").clear();
    $("#destinationInput").clear();
    $("#timeInput").clear();
    $("#frequencyInput").clear();

});


  // add "child watcher"

var database = firebase.database();

database.ref().on("child_added", function(childSnapshot, prevChildKey) { // CHANGE ALL OF THIS

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);
  
    // Prettify the employee start
    var timePretty = moment.unix(time).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked

    if (/*timePretty is after the current time */) { //might need a while loop for while the current time is before the arrival time to make the next arrival closer to the current time
        var nextArrival = ""; // display the current next train
        console.log(nextArrival);
    } else {
        var nextArrival = ""; // calculate the next train
        console.log(nextArrival);
    }
    
    // Calculate the total billed rate
    var minutesAway = ""; // next arrival - current time
    console.log(minutesAway);
  
    // Add each train's data into the table
    $("#train-data > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });