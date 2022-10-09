
////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Character = require("../models/character")
// simple script file used for simple functions that aren't directly related to routes
const randQuote = require("../scripts")
/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

////////////////////////////////
// Routes
///////////////////////////////

// GET request
// index route -> shows all instances of a document in the DB
router.get("/", (req, res) => {
    Character.find({})
        .then(characters => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            
            const randomQuote = randQuote(characters)
            console.log(randomQuote)
            res.render('characters/index', { characters, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// GET for new fruit
// renders the form to create a fruit
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    res.render('characters/new', { username, loggedIn, userId })
})


// POST request
router.post("/", (req, res) => {
    req.body.contributor = req.session.userId
    Character.create(req.body)
    .then(character => {
        const username = req.session.username
        const loggedIn = req.session.loggedIn
        const userId = req.session.userId
        // send the user a '201 created' response, along with new character
        res.redirect('/characters')
    })
    .catch(error => res.redirect(`/error?error=${err}`))
})

// GET request

router.get('/mine', (req, res) => {
    Character.find({ contributor: req.session.userId })
    // then display the fruits
        .then(characters => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            const randomQuote = randQuote(characters)
            res.render('characters/mine', { characters, username, loggedIn, userId })
        })
    // or throw an error if there is one
        .catch(err => res.redirect(`/error?error=${err}`))
})


// GET request to show the update page
router.get("/edit/:id", (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
    const charId = req.params.id

    Character.findById(charId)
        .then(character => {
            res.render('characters/edit', { character, username, loggedIn, userId })
        })
            .catch(err => {
                res.redirect(`/error?error=${err}`)
            })
})

// PUT request
// update route -> updates a specific route
router.put("/:id", (req, res) => {
    // console.log("I hit the update route", req.params.id)
    const id = req.params.id
    // req.body.readyToEat = req.body.readyToEat === 'on'?true:false

    Character.findById(id)
        .then(character => {
            if (character.contributor == req.session.userId) {
                // must return when using updateOne
                return character.updateOne(req.body)
                
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            res.redirect(`/characters/${id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE request
// destroy route -> finds and deletes a single resource
router.delete("/:id", (req, res) => {
    const id =req.params.id
    Character.findByIdAndRemove(id)
        .then(character => {
            res.redirect('/characters')
        })
        // send error if not
        .catch(err => res.redirect(`/error?error=${err}`))
})

// SHOW request
// show route -> find and display a single document
router.get("/:id", (req, res) => {
    // grab the id from the request
    const id = req.params.id
    Character.findById(id)
    .populate("quotes.contributor", "username")
        .then(character => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            
            res.render('characters/show', { character, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router