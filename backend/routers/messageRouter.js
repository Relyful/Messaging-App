const { Router } = require('express');
const messageController = require('../controllers/messageController');
const authMidd = require('../middleware/authenticationMiddleware');

const messageRouter = new Router();

messageRouter.post('/new', authMidd, messageController.newMessage);
messageRouter.put('./delete/:messageId', authMidd, messageController.softDeleteMessage);

module.exports = messageRouter;