const { Router } = require('express');
const chatController = require('../controllers/chatController');
const authMidd = require('../middleware/authenticationMiddleware');

const chatRouter = new Router();

chatRouter.get('/', chatController.getAllChat);
chatRouter.get('/user/:userId', authMidd, chatController.getChatWithUserId);
chatRouter.post('/user/:userId', authMidd, chatController.createChatWithUser);
chatRouter.delete('/delete/:chatId', authMidd, chatController.deleteChat);
chatRouter.put('/displayName/:chatId', authMidd, chatController.updateChatName);
chatRouter.get('/my', authMidd, chatController.getUsersChats);
chatRouter.get('/:chatId', authMidd, chatController.getChatById);
chatRouter.post('/addUser/:chatId/:userId', authMidd, chatController.addUserToChatById);
chatRouter.post('/newGroupChat', chatController.createGroupChat);

module.exports = chatRouter;