require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../models')
const Expired = db.expiredToken

verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    } else {
        const isExpired = await Expired.findOne({
            where: {
                token: token
            }
        })
        if(isExpired) {
            return res.status(403).send({
                message: "Token is expired."
            })
        } else {
            jwt.verify(token, process.env.APP_SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: 'Unauthorized!'
                    })
                }
                next()
            })
        }
    }

};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;