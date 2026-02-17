// const { prisma } = require("../lib/prisma.mjs");
const chatServices = require("../services/chatServices");

exports.getAllChat = async (req, res) => {
  const allChat = await chatServices.getAllChat();
  res.json(allChat);
};

exports.openChatWithUser = async (req, res) => {
  const thisUser = req.user.id;
  const userToChat = req.params.userId;
  //Check if chat already exists
  const existingChat = await chatServices.getChatWithUserId(thisUser, userToChat);
  const chat = existingChat
    ? existingChat
    : await chatServices.createNewChatWithUser(thisUser, userToChat);
  res.json(chat);
};


exports.deleteChat = async (req, res) => {
  const chatToDeleteId = req.params.chatId;
  const deletedChat = await chatServices.deleteChatById(chatToDeleteId);
  res.json(deletedChat);
}