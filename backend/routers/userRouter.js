const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/create', userController.createUser);

module.exports = userRouter;