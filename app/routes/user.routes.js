require('dotenv').config()
const controller = require('../controllers/user.controller')

module.exports = app => {

	let router = require('express').Router()
	router.post('/', controller.generate);

	app.use(`${process.env.APP_VERSION}/users`, router);
}