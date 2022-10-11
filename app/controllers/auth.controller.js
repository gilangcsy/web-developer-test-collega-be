require('dotenv').config()
const db = require('../models')
const jwt = require('jsonwebtoken')
const User = db.user
const Expired = db.expiredToken

const bcrypt = require('bcrypt');
const e = require('express')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, password} = req.body
            const userData = await User.findOne({
                where: {
                    email: email
                },
                attributes: ['id', 'email', 'name', 'password']
            })
            
            if (userData) {
                const validatedPassword = bcrypt.compareSync(password, userData.password) // true
                if (validatedPassword) {
                    const tokenJwt = jwt.sign({ id: userData.id, email: userData.email }, process.env.APP_SECRET_KEY, {
                        expiresIn: 10800 // 3 hours
                    })
                    // let trimTokenJwt = tokenJwt.trim()
                    // const _token = trimTokenJwt.split(' ')[1] // extract from bearer
                    res.status(201).json({
                        success: true,
                        message: 'Login has been success',
                        token: tokenJwt
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Your email is not registered or your password is wrong.'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Your email is not registered or your password is wrong.'
                })
            }
            
        } catch (err) {
            next(err)
        }
    },

    async logout(req, res, next) {
        try {
            const { jwtToken } = req.body
            
            const _token = JSON.parse(Buffer.from(jwtToken.split('.')[1], 'base64').toString())
            console.log(_token.exp)

            const data = {
                token: jwtToken,
                expired_at: _token.exp
            }

            await Expired.create(data)
            
            res.status(200).send({
                success: true,
                message: 'Logout has been success.'
            })
        } catch (err) {
            next(err)
        }
    }
}
