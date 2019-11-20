const mongoose = require('mongoose')
const shortId = require('shortid')

const questionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortId.generate
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    surveys: {
        type: Array,
        required: false,
        ref: 'Survey'
    }
}, {
    timestamps: true
})

const Question = new mongoose.Model('Question', questionSchema)

module.exports = Question