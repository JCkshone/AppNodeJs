'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes');
const app = express()

app.use(function(req, res, next) { //* cualquiera puede hacer peticiones a nuestra api rest
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-API-kEY, Origin, X-Requested-With,Content-Type,Accept,Access--Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.header('Allow', 'GET,POST,PUT,DELETE,OPTIONS')

    next()
})

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
app.use('/api', api)

module.exports = app
