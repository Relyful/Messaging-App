const express = require('express')
const indexController = require('../controllers/indexController')
const authMidd = require('../middleware/authenticationMiddleware');

const indexRouter = express.Router()

indexRouter.get('/', indexController.getIndex);
indexRouter.post('/login', indexController.login);
indexRouter.post('/logout', authMidd, indexController.logout);

module.exports = indexRouter;