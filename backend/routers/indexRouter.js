const express = require('express')
const indexController = require('../controllers/indexController')

const indexRouter = express.Router()

indexRouter.get('/', indexController.getIndex);
indexRouter.post('/login', indexController.login);
indexRouter.post('/logout', indexController.logout);

module.exports = indexRouter;