// const { prisma } = require("../lib/prisma.mjs");
const chatServices = require('../services/chatServices');

exports.getAllChat = async (req, res) => {
  const allChat = chatServices.getAllChat();
  res.json(allChat);
};

