const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const Survey = require('../models/survey')
const User = require('../models/user')
const Option = require('../models/option')
const Question = require('../models/question')

router.get('/questions', async (req, res) => {

    const questions = await Question.find({}).populate('surveys').populate('options').exec()

    return res.status(200).send(questions)
})

module.exports = router