/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") // import morgan
const mongoose = require("mongoose") // import mongoose
const path = require("path") // import path module

///////////////////
// Import Models
///////////////////
const Character = require('./models/character')



/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Mongoose Connected"))
  .on("close", () => console.log("Mongoose Disconnected"))
  .on("error", (error) => console.log(error))


// creat Express Application Object
const app = express()

//////////////////////
// Middleware
/////////////////////
app.use(morgan("tiny")) // this is for request logging, the 'tiny' arguement declares what size morgan log to use.
app.use(express.urlencoded({extended: true})) // this parses urlEncoded request bodies(useful for Post and Put requests)
app.use(express.static("public")) // serves files from the public folder statically
app.use(express.json()) // this parse incoming request payloads with JSON

// Routes
// test route and server
app.get("/", (req, res) => {
    res.send("Server is running")
})


// GET request
// index route -> shows all instances of a document in the DB
app.get("/characters", (req, res) => {
    Character.find({})
        .then(characters => {
            res.json({ characters: characters })
        })
        .catch(err => console.log(err))
})

// POST request
app.post("/characters", (req, res) => {
    Character.create(req.body)
    .then(character => {
        // send the user a '201 created' response, along with new character
        res.status(201).json({character: character.toObject() })
    })
    .catch(error => console.log(error))
})

// PUT request
// update route -> updates a specific route
app.put("/characters/:id", (req, res) => {
    const id = req.params.id
    Character.findByIdAndUpdate(id, req.body, {new: true})
        .then(character => {
            console.log('Update Successful: ', character)
            // update success is called '204 - no content'
            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})

// DELETE request
// destroy route -> finds and deletes a single resource
app.delete("/characters/:id", (req, res) => {
    const id =req.params.id
    Character.findByIdAndRemove(id)
        .then(character => {
            res.sendStatus(204)
        })
        // send error if not
        .catch(err => res.json(err))
})

// GET request
// show route -> find and display a single document
app.get("/characters/:name", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            res.json({ character: character })
        })
        .catch(err => console.log(err))
})


/////////////////////////////////////////////
// Server Listener
/////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))

// END