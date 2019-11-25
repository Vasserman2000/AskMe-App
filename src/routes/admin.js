const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')


router.get('/admin', auth, isAdmin, async (req, res) => {
    try {
        return res.render('admin', { title: 'Admin Dashboard',
                                    isAdmin: req.user.isAdmin,
                                    name: `${req.user.firstName + ' ' + req.user.lastName}` })
    } catch (error) {
        return res.status(401)//.send(error.message)
    }
})

router.get('/admin/surveys', async (req, res) => {
    return res.status(200).send('<b>Elisha</b>')
})

module.exports = router