const mongoose = require('mongoose')
const shortId = require('shortid')

const answernSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    optionId: {
        type: String,
        required: true,
        ref: 'Option'
    },
    questionId: {
        type: String,
        required: true,
        ref: 'Question'
    },
    surveyId: {
        type: String,
        required: true,
        ref: 'Survey'
    }
}, {
    timestamps: true
})


const Answer = new mongoose.Model('Answer', answernSchema)

module.exports = Answer