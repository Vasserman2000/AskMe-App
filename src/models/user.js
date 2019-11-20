const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

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
    },
    surveys: [
        {
            type: String,
            required: false,
            ref: 'Survey'
        }
    ]
}, {
    timestamps: true
})



userSchema.methods.generateAuthToken = async function () {
    // this is an instance method
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
}

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

const User = new mongoose.model('User', userSchema)

module.exports = User