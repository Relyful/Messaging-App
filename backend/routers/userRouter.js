const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.put('/delete', userController.deleteUser);

module.exports = userRouter;