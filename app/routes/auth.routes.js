require('dotenv').config()
const controller = require('../controllers/auth.controller')

module.exports = app => {

	let router = require('express').Router()

	router.post('/login', controller.login)
	router.post('/logout', controller.logout)

	app.use(`${process.env.APP_VERSION}/auth`, router)
}