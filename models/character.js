// Models

// import mongoose
const mongoose = require("mongoose") 
const User = require('./user')

// pull from mongoose
const {Schema, model} = mongoose

// quote schema
const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    page: Number,
    contributor: {
        // object ID refrence (or Foreign Key)
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species:{
        type: String,
        enum:['human', 'dwarf', 'gnome', 'undead', 'troll', 'god', 'unknown'],
        default: 'unknown'
    },
    
    numberOfAppearances: Number,
    affiliation: String,
    contributor: {
        // references the type 'ObjectId', the  `._id` of a user.
        type: Schema.Types.ObjectId,
        // references the model: 'User'
        ref: 'User'
    },
    quotes: [quoteSchema]
},{timestamps: true})

// make character model
const Character = model("Character", characterSchema)

// export
module.exports = Character
// end