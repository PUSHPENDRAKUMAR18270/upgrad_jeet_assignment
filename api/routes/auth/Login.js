var express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../../DB/models/userModel')
require("dotenv").config('../../../.env')
require("dotenv").config({path:'../../../.env'})
var router = express.Router()

router.post("/login",async (req, res)=>{
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("username or password is empty !!");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.SECRET_JWT_TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({
        'username':username,
        'token':token
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
})

module.exports = router