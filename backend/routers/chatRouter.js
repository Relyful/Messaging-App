const { Router } = require('express');
const chatController = require('../controllers/chatController');

const chatRouter = new Router();

chatRouter.get('/', chatController.getAllChat);
chatRouter.post('/user/:userId', chatController.openChatWithUser);
chatRouter.post('/delete/:chatId', chatController.deleteChat);

module.exports = chatRouter;