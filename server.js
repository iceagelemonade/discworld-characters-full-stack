/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const path = require("path") // import path module
const CharacterRouter = require('./controllers/characterControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


// create Express Application Object
const app = express()

//////////////////////
// Middleware
/////////////////////
middleware(app)

// Routes
// test route and server
app.get("/", (req, res) => {
    res.send("Server is running")
})

app.use('/characters', CharacterRouter)
app.use('/users', UserRouter)



/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))

// END