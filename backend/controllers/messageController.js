const messageServices = require('../services/messageServices');

exports.newMessage = async (req, res) => {
  const chatId = Number(req.params.chatId);
  const userId = Number(req.user.id);
  const data = req.body;
  const newMessage = await messageServices.newMessage(userId, chatId, data.content);
  res.json(newMessage)
};

exports.softDeleteMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const thisUserId = req.user.id;
  const ownershipCheck = await messageServices.messageOwnerCheck(thisUserId, messageId);
  if (!ownershipCheck) {
    const error = new Error("Privilege error");
    error.status = 401;
    throw error;
  }
  const softDeletedMessage = await messageServices.softDeleteMessage(messageId);
  res.json(softDeletedMessage);
}