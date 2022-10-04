// Models

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
    lastModified: Date
})