const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}
