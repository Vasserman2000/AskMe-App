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
    questionType: {
        type: String,
        required: true
    },
    surveys: [
        {
            type: String,
            required: false,
            ref: 'Survey'
        }
    ],
    answers: [
        {
            type: String,
            reuqired: false,
            ref: 'Answer'
        }
    ]
}, {
    timestamps: true
})

const Question = new mongoose.Model('Question', questionSchema)

module.exports = Question
