const express = require('express');
const cors = require('cors');
const auth = require('./Routes/auth');
const mongoose = require('mongoose');
const Train = require('./data');
const SingleTrain = require('./Schemas/singleschema');

//initilze express.js
const app = express();

//to receive json data
app.use(express.json());

//initilze cors 
app.use(cors({
    origin: '*'
}));

//connect mongobd
mongoose.connect('mongodb+srv://mjnvsai:mjnvsai@cluster0.kc6nhff.mongodb.net/firstdb?retryWrites=true&w=majority').then(
    console.log("Mongo Db Atlas is connected Sucessfully")
);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
  
  // Now you can insert the JSON data
  const jsonData = require('./data.json'); // Load your JSON data here

  // Insert the data
  Train.insertMany(jsonData, (err, trains) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully:', trains);
    }
    // Close the database connection after inserting
    db.close();
  });
});

const trainData = {
    trainName: "Delhi Door Hai Exp",
    trainNumber: "2344",
    departureTime: {
      Hours: 9,
      Minutes: 45,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 32,
      AC: 1,
    },
    price: {
      sleeper: 1,
      AC: 723,
    },
    delayedBy: 3,
  };

const newSingleTrain = new SingleTrain(trainData);

newSingleTrain.save()
    .then(savedTrain => {
      console.log('Train data saved:', savedTrain);
    })
    .catch(error => {
      console.error('Error saving train data:', error);
    });




//auth api's
app.use('/train', auth);





app.listen(5000, () => console.log("Server is Started") )