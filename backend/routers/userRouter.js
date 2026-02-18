const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.delete('/delete', userController.deleteUser);
userRouter.put('/profilePic/:picId', userController.updateProfilePic);
userRouter.put('/updateDisplayName/:displayName', userController.updateDisplayName);
userRouter.put('/updateAbout', userController.updateAbout);
userRouter.get('/:userId', userController.getUserById);
userRouter.get('/', userController.getAll);

module.exports = userRouter;