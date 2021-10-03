const express = require("express")

const DB = require("./DB/config")
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

DB.connection()


// Routers
const Login = require('./routes/auth/Login')
const Register = require('./routes/auth/Register')
const Home = require('./routes/Home')
app.use('/api/auth', Login)
app.use('/api/auth', Register)
app.use('/api', Home)

// start server
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})