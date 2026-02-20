const messageServices = require('../services/messageServices');

exports.newMessage = async (req, res) => {
  const chatId = Number(req.params.chatId);
  const userId = Number(req.user.id);
  const data = req.body;
  const newMessage = await messageServices.newMessage(userId, chatId, data.content);
  res.json(newMessage)
};
