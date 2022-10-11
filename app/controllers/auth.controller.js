//Memanggil pool
// const pool = require('./dbCon');

const nodemailer = require('nodemailer')
const db = require('../models')
const jwt = require('jsonwebtoken')
const User = db.user
const UserInvitation = db.userInvitation
const UserLog = db.userLog
const Op = db.Sequelize.Op
const randtoken = require('rand-token');
const mail = require('../configs/mail.config')
const config = require('../configs/auth.config')

const bcrypt = require('bcrypt');
const e = require('express')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, password, device, detail, longitude, latitude, address } = req.body
            const userData = await User.findOne({
                where: {
                    email: email
                },
                attributes: ['id', 'email', 'employee_id', 'isActive', 'isVerified', 'password', 'full_name'],
                include: [
                    {
                        model: db.role,
                        attributes: ['id', 'name']
                    },
                ]
            })
            console.log(userData)
            if (userData) {
                if (!userData.isVerified) {
                    res.status(400).json({
                        success: false,
                        message: 'your account is not verified. check your email or call the admin for inviting you.'
                    })
                }
                if (!userData.isActive) {
                    res.status(400).json({
                        success: false,
                        message: 'your account is inactive. call the admin to activating your account.'
                    })
                }
                const validatedPassword = bcrypt.compareSync(password, userData.password); // true
                if (validatedPassword) {
                    const tokenJwt = jwt.sign({ id: userData.id, email: userData.email }, config.secret, {
                        expiresIn: 10800 // 3 hours
                    })
                    let trimTokenJwt = tokenJwt.trim()
                    const _token = trimTokenJwt.split(' ')[1] // extract from bearer
                    res.status(201).json({
                        success: true,
                        message: 'login has been successfully',
                        token: trimTokenJwt
                        // credentials: {
                        //     token: tokenJwt,
                        //     userId: userData.id,
                        //     email: userData.email,
                        //     employee_id: userData.employee_id,
                        //     full_name: userData.full_name,
                        //     role: userData.Role.name,
                        //     role_id: userData.Role.id
                        // }
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'your password is wrong.'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'your email is not registered.'
                })
            }
            
        } catch (err) {
            next(err)
        }
    },

    async logout(req, res, next) {
        try {
            const { jwtToken } = req.body
            jwt.sign(jwtToken, "", { expiresIn: 1 }, (logout, err) => {
                if (logout) {
                    res.status(200).send({
                        success: true,
                        message: 'You have been Logged Out'
                    });
                } else {
                    res.send({ msg: err.message | 'Error' });
                }
            });
        } catch (err) {
            next(err)
        }
    }
}
