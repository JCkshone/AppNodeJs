'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema

const workComplete = new schema({

    work: {
        them: String,
        description: String,
        dateOfDelivery: Date,
        workUpdate: Boolean,
        workComplete: Boolean,
        user: {
            userId: Number,
            name: String
        },
        employee: {
            employeeId: Number,
            name: String
        }
    }
})

module.exports = mongoose.model('workComplete', workComplete)
