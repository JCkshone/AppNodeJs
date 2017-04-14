'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.db, (err, res) => {
    if (err) return console.log('ERROR: failed connect to server');
    else console.log('DB Connection ready.');
    app.listen(config.port, () => {
        console.log(`Services ready in http://localhost:${config.port}`);
    })

})
