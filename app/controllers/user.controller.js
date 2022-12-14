const db = require('../models')
const User = db.user

const bcrypt = require('bcrypt')

module.exports = {

    async generate(req, res, next) {
        try {

            const hashedPassword = bcrypt.hashSync("123", 10)
            const random = Math.floor(Math.random() * 10)
            const name = "Random User " + random
            const email = "user" + random + "@collega.co.id"
            const password = hashedPassword

            const data = {
                name: name,
                email: email,
                password: password
            }

            const createUser = await User.create(data)

            res.status(201).json({
                success: true,
                message: 'Generate user has been success.',
                data: data
            })
        }
        catch (err) {
            next(err)
        }
    },
}