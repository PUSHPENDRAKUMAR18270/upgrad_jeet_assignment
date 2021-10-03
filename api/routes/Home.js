const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()


router.get('/', (req,res)=>{
  res.send("welcome to API")
})

router.get("/home", auth, (req, res)=>{
  res.send("welcome "+ req.user.username)
})

module.exports = router