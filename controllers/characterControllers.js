////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Character = require("../models/character")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

////////////////////////////////
// Routes
///////////////////////////////

// GET request
// index route -> shows all instances of a document in the DB
app.get("/", (req, res) => {
    Character.find({})
        .then(characters => {
            res.json({ characters: characters })
        })
        .catch(err => console.log(err))
})

// POST request
app.post("/", (req, res) => {
    Character.create(req.body)
    .then(character => {
        // send the user a '201 created' response, along with new character
        res.status(201).json({character: character.toObject() })
    })
    .catch(error => console.log(error))
})

// PUT request
// update route -> updates a specific route
app.put("/:id", (req, res) => {
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
app.delete("/:id", (req, res) => {
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
app.get("/:id", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    Character.findById(id)
        .then(character => {
            res.json({ character: character })
        })
        .catch(err => console.log(err))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router