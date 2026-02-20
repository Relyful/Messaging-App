const { Router } = require('express');
const userController = require('../controllers/userController');
const authMidd = require('../middleware/authenticationMiddleware');

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.delete('/delete', authMidd, userController.deleteUser);
userRouter.put('/profilePic/:picId', authMidd, userController.updateProfilePic);
userRouter.put('/updateDisplayName/:displayName', authMidd, userController.updateDisplayName);
userRouter.put('/updateAbout', authMidd, userController.updateAbout);
userRouter.get('/:userId', userController.getUserById);
userRouter.get('/', userController.getAll);

module.exports = userRouter;