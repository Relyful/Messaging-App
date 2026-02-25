// const { prisma } = require("../lib/prisma.mjs");
const chatServices = require("../services/chatServices");

exports.getAllChat = async (req, res) => {
  const allChat = await chatServices.getAllChat();
  res.json(allChat);
};

exports.createChatWithUser = async (req, res) => {
  const thisUser = req.user.id;
  const userToChat = req.params.userId;
  const chat = await chatServices.createNewChatWithUser(thisUser, userToChat);
  res.json(chat);
};


exports.deleteChat = async (req, res) => {
  const chatToDeleteId = req.params.chatId;
  const deletedChat = await chatServices.deleteChatById(chatToDeleteId);
  res.json(deletedChat);
};

exports.updateChatName = async (req, res) => {
  const data = req.body;
  const chatId = req.params.chatId;
  const thisUser = req.user.id
  const foundChat = await chatServices.findChatByIdUserId(chatId, thisUser);
  if (foundChat) {
    const updatedChat = await chatServices.updateChatNameById(chatId, data.chatName);
    res.json(updatedChat);
  }
  const error = new Error("Chat not found");
  error.statusCode = 404;
  throw(error);
}

exports.getChatWithUserId = async (req, res) => {
  const thisUser = req.user.id;
  const userToChat = req.params.userId;
  const chat = await chatServices.getChatWithUserId(thisUser, userToChat);
  res.json(chat);
};

exports.getUsersChats = async (req, res) => {
  const thisUser = req.user.id;
  const usersChats = await chatServices.findUsersChats(thisUser);
  res.json(usersChats);
}