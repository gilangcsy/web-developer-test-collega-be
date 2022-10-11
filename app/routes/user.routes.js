require('dotenv').config()
const controller = require('../controllers/user.controller')
const { authJwt } = require('../middlewares/index.middleware')

module.exports = app => {

	let router = require('express').Router()
	router.post('/', authJwt.verifyToken, controller.generate);

	app.use(`${process.env.APP_VERSION}/users`, router);
}