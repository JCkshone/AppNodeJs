'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema

const workInProcess = new schema({

    work: {
        workId: {
            unique: true,
            type: String
        },
        them: String,
        description: String,
        dateOfDelivery: Date,
        workComplete: Boolean,
        user: {
            userId: Number,
            name: String
        },
        employee: {
            employeeId: String,
            name: String
        }
    }
})

module.exports = mongoose.model('workInProcess', workInProcess)
