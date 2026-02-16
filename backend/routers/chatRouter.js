const { Router } = require('express');
const chatController = require('../controllers/chatController');

const chatRouter = new Router();

chatRouter.get('/', chatController.getAllChat)