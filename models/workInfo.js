'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema

const workSchema = new schema({
    work: {
        them: {
            type: String,
            enum: [
                'Programacion',
                'Quimica',
                'Calculo',
                'Algebra',
                'Matematicas',
                'Español',
                'Macroeconomia'
            ]
        },
        description: String,
        dateOfDelivery: Date
    },
    student: {
        name: String,
        avatar: String,
        infoComunication: String,
        studentId: String
    }
})

module.exports = mongoose.model('workInfo', workSchema)
