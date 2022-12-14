/////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const morgan = require('morgan') // import morgan
const express = require('express') // import express
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')

/////////////////////////////////////////////
// Middleware Function
/////////////////////////////////////////////

const middleware = (app) => {
    app.use(methodOverride('_method'))
    app.use(morgan('tiny')) // this is for request logging, the 'tiny' arguement declares what size morgan log to use.
    app.use(express.urlencoded({extended: false })) // this parses urlEncoded request bodies(useful for Post and Put requests)
    app.use(express.static('public')) // serves files from the public folder statically
    // app.use(express.json()) // this parse incoming request payloads with JSON
    // we need to setup a session function and pass that function an object as the argument, that argument object will tell express session how to build our session
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false,
        })
    )
}

/////////////////////////////////////////////
// Export
/////////////////////////////////////////////
module.exports = middleware