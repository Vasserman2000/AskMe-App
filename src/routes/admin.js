const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const User = require('../models/user')
const Survey = require('../models/survey')
const Question = require('../models/question')
const { extendQuestionsForTabulator } = require('../helpers/questionHelper')


router.get('/admin/testNewSurvey', auth, async (req, res) => {
    try {
        return res.render('partials/newSurveyForm', { 
                                    title: 'Admin Dashboard',
                                    isAdmin: req.user.isAdmin,
                                    name: `${req.user.firstName + ' ' + req.user.lastName}` })
    } catch (error) {
        return res.status(401)//.send(error.message)
    }
})

router.get('/admin/testNewQuestion', auth, async (req, res) => {
    try {
        return res.render('partials/newQuestionForm', { 
                                    title: 'Admin Dashboard',
                                    isAdmin: req.user.isAdmin,
                                    name: `${req.user.firstName + ' ' + req.user.lastName}` })
    } catch (error) {
        return res.status(401)//.send(error.message)
    }
})

router.get('/admin', auth, isAdmin, async (req, res) => {
    try {
        const surveys = await Survey.find({})
        const questions = await Question.find({}).populate('surveys').exec()
        extendedQuestions = extendQuestionsForTabulator(questions)
        //console.log(questions)
        
        return res.render('admin', { title: 'Admin Dashboard',
                                    isAdmin: req.user.isAdmin,
                                    name: `${req.user.firstName + ' ' + req.user.lastName}`,
                                    surveys,
                                    questions: extendedQuestions })
    } catch (error) {
        return res.status(401).send(error.message)
    }
})

router.get('/admin/log-out-from-all', auth, isAdmin, async (req, res) => {
    try {
        let user = req.user
        user.tokens = []
        await user.save()
        return res.status(200).send('Success')
    } catch (error) {
        return res.status(400).send(error.message)
    }
})



module.exports = router