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

/*--- Log In ---*/
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.cookie('token', token, {
            expires: new Date(Date.now() + 900000),
            secure: false, // set to true if your using https
            httpOnly: true,
            sameSite: 'None'
          });

          return res.redirect('/start')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router

