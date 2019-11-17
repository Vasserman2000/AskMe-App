const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true
    },
    tokens: {
        type: Array
    }
}, {
    timestamps: true
})

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to log in!')
    }

    
    if (user.password !== password) {
        throw new Error('Either email or password doesn\'t match!')
    }
    
    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = { User }