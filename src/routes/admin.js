const express = require('express')
const router = new express.Router()

router.get('/admin', async (req, res) => {
    return res.send('admin dashboard is here')
})

module.exports = router