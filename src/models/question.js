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
    options: [
        {
            type: String,
            reuqired: false,
            ref: 'Option'
        }
    ]
}, {
    timestamps: true
})

const Question = new mongoose.model('Question', questionSchema)

module.exports = Question
