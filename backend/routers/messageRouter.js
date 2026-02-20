const { Router } = require('express');
const messageController = require('../controllers/messageController');
const authMidd = require('../middleware/authenticationMiddleware');

const messageRouter = new Router();

messageRouter.post('/', authMidd, messageController.newMessage)