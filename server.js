/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const path = require("path") // import path module
const CharacterRouter = require('./controllers/characterControllers')
const QuoteRouter = require('./controllers/quoteControllers')
const UserRouter = require('./controllers/userControllers')
const middleware = require('./utils/middleware')


// create Express Application Object
const app = require("liquid-express-views")(express())

//////////////////////
// Middleware
/////////////////////
middleware(app)

// Routes
// test route and server
app.get("/", (req, res) => {
    // res.send("Server is running")
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render('index.liquid', {username, loggedIn, userId})
})

// root paths
app.use('/characters', CharacterRouter)
app.use('/users', UserRouter)
app.use('/quotes', QuoteRouter)

/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))

// END