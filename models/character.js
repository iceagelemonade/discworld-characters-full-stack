// Models

// import mongoose
const mongoose = require("mongoose") 

// pull from mongoose
const {Schema, model} = mongoose

const characterSchema = new Schema({
    name: String,
    species:{
        type: String,
        enum:['human', 'dwarf', 'gnome', 'undead', 'troll', 'god', 'unknown'],
        default: 'unknown'
    },
    numberOfAppearances: Number,
    affiliation: String,
    lastModified:{
        type:"Date",
        default: Date.now
    }
})

// make character model
const Character = model("Character", characterSchema)

// export
module.exports = Character
// end