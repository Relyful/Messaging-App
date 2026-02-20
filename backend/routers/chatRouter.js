const { Router } = require('express');
const chatController = require('../controllers/chatController');
const authMidd = require('../middleware/authenticationMiddleware');

const chatRouter = new Router();

chatRouter.get('/', chatController.getAllChat);
chatRouter.post('/user/:userId', authMidd, chatController.openChatWithUser);
chatRouter.post('/delete/:chatId', authMidd, chatController.deleteChat);
chatRouter.put('/displayName/:chatId', authMidd, chatController.updateChatName);

module.exports = chatRouter;