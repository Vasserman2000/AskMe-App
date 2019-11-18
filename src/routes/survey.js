const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Survey = require('../models/survey')


router.get('/start', auth, async (req, res) => {
    try {

        //console.log(req.cookies)
        //console.log(req.user)    

        const surveys = await Survey.find({_id: { $in: req.user.surveys }})
        //console.log(surveys.map(s => s.title))

        res.render('start', { surveys: surveys.map(s => s.title)})  
    } catch (error){
        res.status(400).send('Error: ' + error.message)
    }
})

module.exports = router