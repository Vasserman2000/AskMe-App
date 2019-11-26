const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            throw new Error('Authentication failed')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded)
        const user = await User.findOne({'_id': decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error ('Authentication failed')
        }
        //console.log('here')
        req.user = res.locals.user = user;

        //console.log(req.user)

        req.token = token;

        next();
    } catch (e) {
        res.status(401).send('Auth Error:' + e.message );
    }
}

module.exports = auth