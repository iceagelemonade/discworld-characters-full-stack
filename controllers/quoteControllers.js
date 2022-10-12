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
router.post("/:charId", (req, res) => {
    const charId = req.params.charId

    if (req.session.loggedIn) {
        // we want to adjust req.body so that the contributor is automatically assigned
        req.body.contributor = req.session.userId
    } else {
        res.redirect(`/error?error=${err}`)
    }
    // find a specific character
    Character.findById(charId)
        .then(char => {
            // push the comment into the fruit.comments array
            char.quotes.push(req.body)
            // we need to save the fruit
            return char.save()
        })
        .then(char => {
            res.redirect(`/characters/${charId}`)
        })
        //  --> send error depending on what went wrong
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment or author of the OP can delete it
router.delete('/delete/:charId/:quoteId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const charId = req.params.charId 
    const quoteId = req.params.quoteId
    // get the fruit
    Character.findById(charId)
        .then(char => {
            const theQuote = char.quotes.id(quoteId)
            
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theQuote.contributor == req.session.userId || char.contributor == req.session.userId) {
                    theQuote.remove()
                    char.save()
                    res.redirect(`/characters/${char.id}`)
                    // return the saved fruit
                    return 
                } else {
                    const err = 'You%20are%20not%authorized%20for%this%action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'You%20are%20not%authorized%20for%this%action'
                res.redirect(`/error?error=${err}`)
            }
        })
        // send an error if error
        .catch(err => res.redirect(`/error?error=${err}`))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router