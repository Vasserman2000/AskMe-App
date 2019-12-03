const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const Survey = require('../models/survey')
const User = require('../models/user')
const Option = require('../models/option')
const Question = require('../models/question')
const questionType = require('../../public/js/enums').questionType


router.get('/questions', auth, isAdmin, async (req, res) => {
    //console.log(questionType)


    const questions = await Question.find({}).populate('surveys').populate('options').exec()
    //console.log(questions)

    return res.status(200).send(questions)
})

router.post('/question', auth, isAdmin, async (req, res) => {

    const question = new Question({ ...req.body })
    console.log(question)

    await question.save()
    //console.log(req.body)
    return res.status(201).send('success')
})

router.delete('/question/:id', auth, isAdmin, async (req, res) => {
    try {
        const _id = req.params.id
        await Question.deleteOne({ _id })
        res.status(202).send('deleted')
    
    } catch (e) {

    }
})

module.exports = router