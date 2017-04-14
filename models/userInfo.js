'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');
const userSchema = new schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    displayName: String,
    avatar: String,
    password: {
        type: String,
        select: false
    },
    signupDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: Date,
    works: [],
    myWorks: [],
    userRoll: {
        type: String,
        enum: ['Student', 'Employee']
    }
})

/*userSchema.pre('save', (next) => {
    let user = this
    //if (!user.isModified('password')) return next()
    //if(!user.path('password').validate)return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})*/

module.exports = mongoose.model('userInfo', userSchema)
