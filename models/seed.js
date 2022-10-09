///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Character = require("./character")


///////////////////////////////////////
// Seed Script Code
///////////////////////////////////////
// first we need our connection saved to a variable for easy refrence
const db = mongoose.connection
db.on('open', () => {
    
    const charSeed = [
        {name: "Samuel Vimes", species: "human", numberOfApperances: 13, affiliation: "AM City Watch", quotes:[{quote: "The reason that the rich were so rich, Vimes reasoned, was because they managed to spend less money. Take boots, for example. He earned thirty-eight dollars a month plus allowances. A really good pair of leather boots cost fifty dollars. But an affordable pair of boots, which were sort of OK for a season or two and then leaked like hell when the cardboard gave out, cost about ten dollars. Those were the kind of boots Vimes always bought, and wore until the soles were so thin that he could tell where he was in Ankh-Morpork on a foggy night by the feel of the cobbles. But the thing was that good boots lasted for years and years. A man who could afford fifty dollars had a pair of boots that'd still be keeping his feet dry in ten years' time, while a poor man who could only afford cheap boots would have spent a hundred dollars on boots in the same time and would still have wet feet. This was the Captain Samuel Vimes &ldquo;Boots&rdquo; theory of socioeconomic unfairness.", book: "Men at Arms", page: 32}, {quote: "Give a man a fire and he’s warm for a day, but set fire to him and he’s warm for the rest of his life.", book: "Jingo"}, {quote: "Sam Vimes could parallel process. Most husbands can. They learn to follow their own line of thought while at the same time listening to what their wives say. And the listening is important, because at any time they could be challenged and must be ready to quote the last sentence in full. A vital additional skill is being able to scan the dialogue for telltale phrases such as &ldquo;and they can deliver it tomorrow&rdquo; or &ldquo;so I’ve invited them for dinner?&rdquo; or &ldquo;they can do it in blue, really quite cheaply.&rdquo;", book: "The Fifth Elephant"}]},
        {name: "Om", species: "god", numberOfApperances: 1, affiliation: "Omnia, Cori Celsti", quotes:[{quote: "&ldquo;What's a philosopher?&rdquo; said Brutha. &ldquo;Someone who's bright enough to find a job with no heavy lifting,&rdquo; said a voice in his head.", book: "Small Gods"}, {quote: "Gods don't like people not doing much work. People who aren't busy all the time might start to think.", book: "Small Gods"}, {quote: "The Ephebians believed that every man should have the vote (provided that he wasn't poor, foreign, nor disqualified by reason of being mad, frivolous, or a woman). Every five years someone was elected to be Tyrant, provided he could prove that he was honest, intelligent, sensible, and trustworthy. Immediately after he was elected, of course, it was obvious to everyone that he was a criminal madman and totally out of touch with the view of the ordinary philosopher in the street looking for a towel. And then five years later they elected another one just like him, and really it was amazing how intelligent people kept on making the same mistakes.", book: "Small Goods"}]}
    ]
    

    Character.deleteMany({})
        .then(deletedCharacters => {
            Character.create(charSeed)
                .then(data => {
                    db.close()
                })
                .catch(err => {
                    console.log(err)
                    // allways close the connection to the db
                    db.close()
                })
            .catch(err => {
                console.log(err)
                // allways close the connection to the db
                db.close()
            })
        })
})