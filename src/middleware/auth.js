const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded)
        const user = await User.findOne({'_id': decoded._id, 'tokens.token': token });
        //console.log('here')
        req.user = user;

        //console.log(req.user)

        req.token = token;

        next();
    } catch (e) {
        res.status(401).send('Auth Error:' + e.message );
    }
}

module.exports = auth