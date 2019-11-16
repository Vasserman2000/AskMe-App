const express = require('express')
const router = new express.Router()

router.get('', (req, res) => {
    res.render('index', {
        title: 'AskMe App',
        author: 'ElishaV'
    });
});


module.exports = router