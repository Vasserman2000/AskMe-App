const mongoose = require('mongoose')
const validator = require('validator')
const User = require('../models/user')
const shortId = require('shortid')

const surveySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortId.generate
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

surveySchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'surveys'
})


const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey