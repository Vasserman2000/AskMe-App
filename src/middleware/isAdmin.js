module.exports = async (req, res, next) => {
    try {
        //console.log('Inside isAdmin middleware')
        if (req.user) {
            if (req.user.isAdmin) {
                next()
            } else {
                throw new Error('Authorization error!')
            }
        } else {
            res.status(403).send('FORBIDDEN')
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
}