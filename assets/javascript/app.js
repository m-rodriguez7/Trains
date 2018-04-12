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

var database = firebase.database();

$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();

    // take inputs from forms and make them a new object
    // push new object to firebase

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var time = $("#timeInput").val().trim();
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

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

});


  // add "child watcher"



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
    console.log(time); // in uxix
    console.log(frequency);


    var actualStart = moment(time, "HH:mm");
    console.log(actualStart);
    console.log("----------------------");

    var timeDifference = moment().diff(moment(actualStart), "minutes");

    var timeApart = timeDifference % frequency;

    var timeTilTrain = frequency - timeApart;

    var nextTrain = moment().add(timeTilTrain, "minutes").format("HH:mm");

   
    // Add each train's data into the table
    $("#train-data").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + timeTilTrain + "</td></tr>");
  });