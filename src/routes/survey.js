const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const Survey = require('../models/survey')
const User = require('../models/user')

// GET ALL SURVEYS
router.get('/surveys', auth, isAdmin, async (req, res) => {
    try {
        const surveys = await Survey.find({});

        return res.send(surveys);
    } catch (e) {
        console.log(e)
    }
})

router.get('/start', auth, async (req, res) => {
    try {
        //console.log(req.user.surveys)
        //console.log(req.cookies)
        //console.log(req.user)    

        if (!req.user) {
            return res.redirect('/')
        }
        const surveys = await Survey.find({ _id: { $in: req.user.surveys } })
        //console.log(surveys)
        var extendedSurveys = []
        surveys.forEach((survey, index) => {
            survey = Object.assign({}, survey.toObject(), { href: `/surveys/${survey._id}` })
            extendedSurveys.push(survey)
        })

        res.render('start', { extendedSurveys, isAdmin: req.user.isAdmin })
    } catch (error) {
        res.send('Error: ' + error.message)
    }
})

// GET SURVEY BY ID
router.get('/surveys/:id', auth, async (req, res) => {
    try {

        const survey = await Survey.findById(req.params.id)
        //await survey.populate('users').execPopulate()
        //console.log(survey.users[0].firstName)


        //await req.user.populate('surveys').execPopulate()
        //console.log(req.user)
        return res.send(survey)

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
})

// CREATE NEW SURVEY
router.post('/survey', auth, isAdmin, async (req, res) => {
    //console.log(req.body)
    const newSurvey = new Survey({ ...req.body })
    //console.log(newSurvey)
    await newSurvey.save()
    return res.send('success')
})

// DELETE SURVEY BY ID
router.delete('/surveys/:id', auth, isAdmin, async (req, res) => {
    const _id = req.params.id
    await Survey.deleteOne({ _id })
    res.status(202).send('deleted')
})

module.exports = router