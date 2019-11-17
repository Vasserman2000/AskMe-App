const express = require('express')
const router = new express.Router()
const User = require('../models/user').User

router.get('/users', (req, res) => {
    //console.log(req)
    const users = User.find().then((users) => {
        return res.send(users)
    }).catch((error)=> {
        return res.send(error)
    });
});

/*--- Log In ---*/
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user)
        return res.send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router

