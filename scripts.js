const randQuote = (characters) => {

    characters.forEach(character => {
        if (character.quotes.length > 0) {
            character.random = (character.quotes[Math.floor(Math.random() * character.quotes.length)].quote)
        } else {
            character.random = ''
        }
    })
    
}

module.exports = randQuote