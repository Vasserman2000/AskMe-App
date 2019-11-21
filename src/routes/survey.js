const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Survey = require('../models/survey')
const User = require('../models/user')

// router.get('/surveys', async (req, res) => {
//     try {
//         const surveys = []
//         surveys.push(new Survey({title: 'Coding Experience', isActive: true}))
//         surveys.push(new Survey({title: 'Personal', isActive: true}))

//         console.log(surveys)

//         surveys.forEach(async (survey, index) => {
//             await survey.save()
//         })

//         return res.send(surveys);
//     } catch (e) {
//         console.log(e)
//     }
// })

router.get('/start', auth, async (req, res) => {
    try {
        
        //console.log(req.user.surveys)
        //console.log(req.cookies)
        //console.log(req.user)    

        const surveys = await Survey.find({ _id: { $in: req.user.surveys } })
        //console.log(surveys)
        var extendedSurveys = []
        surveys.forEach((survey, index) => {
            survey = Object.assign({}, survey.toObject(), { href: `/surveys/${survey._id}` })
            extendedSurveys.push(survey)
        })

        res.render('start', { extendedSurveys })
    } catch (error) {
        res.status(400).send('Error: ' + error.message)
    }
})

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

module.exports = router