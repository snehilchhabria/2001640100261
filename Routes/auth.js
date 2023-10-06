const express = require('express');
const bcrypt = require('bcrypt');
const { Register } = require('../Schemas/registerschema');
const jwt = require('jsonwebtoken');
const Train = require('../Schemas/trainschema');
const SingleTrain = require('./Schemas/singleschema');

const router = express.Router();

//register route
router.post("/register", async (req, res) => {
    let { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

    //check the user already exist with this email
    const takenEmail = await Register.findOne({ companyName: companyName });

    if (takenEmail) 
    {
        return res.status(405).json("user already exists");
    } 
    else 
    {
        password = await bcrypt.hash(req.body.rollNo, 10);
        const newUser = new Register({
            companyName,
            ownerName,
            rollNo,
            ownerEmail,
            accessCode,
        });

        await newUser.save();
        return res.json("user account created sucessfully");
    }
});

// Define the route to fetch train data
router.post("/trains", async (req, res) => {
    try {
      const allTrains = await Train.find();
      res.json(allTrains);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });


// Get single train data
router.get("/single", async (req, res) => {
    try {
      const train = await SingleTrain.findOne({ trainNumber: "2344" }); // Modify this to your train number
      if (!train) {
        return res.status(404).json({ message: 'Train not found' });
      }
      res.json(train);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching train data', error: error.message });
    }
  });


//login user
router.post("/login", async (req, res) => {
    try 
    {
        const { companyName, rollNo } = req.body;

        //confirm the user is register or not
        const userexist = await Register.findOne({ companyName: companyName });

        if (!userexist) 
        {
            return res.status(404).json('user not found');
        }

        bcrypt.compare(rollNo, userexist.rollNo).then( (isCorrect) => {
            if (isCorrect) 
            {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                
                jwt.sign(payload, 'newsecreate', { expiresIn: 360000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token: token, name: userexist.name });
                });
            }
            else 
            {
                return res.status(405).json('roll number is incorrect');
            }
        }
        );
    } 
    catch (error) 
    {
        return res.status(500).json("server error")
    }
});
