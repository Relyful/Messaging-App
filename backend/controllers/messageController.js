const { body, validationResult, matchedData } = require('express-validator');
const messageServices = require('../services/messageServices');

const messageValidation = [
  body('content').trim()
  .isLength({min: 1, max: 900}).withMessage('Message can be 1 to 900 characters long.')
]

exports.newMessage = [messageValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  const chatId = Number(req.params.chatId);
  const userId = Number(req.user.id);
  const data = matchedData(req);
  const newMessage = await messageServices.newMessage(userId, chatId, data.content);
  res.json(newMessage)
}]

exports.softDeleteMessage = async (req, res) => {
  const messageId = Number(req.params.messageId);
  const thisUserId = req.user.id;
  const ownershipCheck = await messageServices.messageOwnerCheck(thisUserId, messageId);
  if (!ownershipCheck) {
    const error = new Error("Privilege error");
    error.statusCode = 401;
    throw error;
  }
  const softDeletedMessage = await messageServices.softDeleteMessage(messageId);
  res.json(softDeletedMessage);
}