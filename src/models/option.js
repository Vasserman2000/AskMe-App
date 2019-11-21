const mongoose = require('mongoose')
const shortId = require('shortid')

const optionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortId.generate
    },
    value: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})


const Option = new mongoose.Model('Option', optionSchema)

module.exports = Option