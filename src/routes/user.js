const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/users', (req, res) => {
    //console.log(req)
    const users = User.find().then((users) => {
        return res.send(users)
    }).catch((error)=> {
        return res.send(error)
    });
});


module.exports = router

