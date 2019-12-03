const mongoose = require('mongoose')
const shortId = require('shortid')
const questionType = require('../../public/js/enums').questionType

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
        enum: [...questionType],
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

questionSchema.pre('deleteOne', async function (next) {
    const questionId = this.getQuery()._id
    console.log('INSIDE PRE DELETEONE')
    console.log(questionId)

    next();
});

const Question = new mongoose.model('Question', questionSchema)

module.exports = Question
