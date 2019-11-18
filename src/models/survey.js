const mongoose = require('mongoose')
const validator = require('validator')
const User = require('../models/user')

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

surveySchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'surveys'
});

const Survey = mongoose.model('Survey', surveySchema)

module.exports = Survey