module.exports = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next()
        } else {
            throw new Error('Authorization error!')
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
}