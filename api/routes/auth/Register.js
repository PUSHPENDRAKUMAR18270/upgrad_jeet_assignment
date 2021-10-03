const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const router = express.Router()
require("dotenv").config({path:'../../../.env'})
const User = require('../../DB/models/userModel')


// parsing Post Body
router.use(express.json())

router.post("/register",async (req, res)=>{
  try 
  {
    // user input
    const { username, password } = req.body;
    
    // Validate user input
    if (!(username && password)) {
      res.status(400).send("username or password is empty !!");
    }

    // If user already exist
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username: username.toLowerCase(), 
      password: encryptedPassword,
    });

    // Create token
    const secret = process.env.SECRET_JWT_TOKEN_KEY
    console.log('secret',secret)

    const token = jwt.sign(
      { user_id: user._id, username },
      secret,
      {
        expiresIn: "2h",
      }
    );
    
    // save user token
    user.token = token;

    // return new user
    res.status(201).json({
      'username':username,
      'token':token
    });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router