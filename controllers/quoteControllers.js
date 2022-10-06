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
        res.sendStatus(401)
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
            res.status(200).json({ character: char })
        })
        //  --> send error depending on what went wrong
        .catch(error => console.log(error))
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
            // get the comment
            // subdocs have a built in method that you can use to access specific subdocuments when you need to.
            // this built in method is called .id()
            const theQuote = char.quotes.id(quoteId)
            console.log('this is the quote that was found', theQuote)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment or the character delete it
                if (theQuote.contributor == req.session.userId || char.contributor == req.session.userId) {
                    theQuote.remove()
                    char.save()
                    res.sendStatus(204)
                    // return the saved fruit
                    return 
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        })
        // send an error if error
        .catch(error => console.log(error))

})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router