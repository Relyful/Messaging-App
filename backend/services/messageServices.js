const { prisma } = require("../lib/prisma.mjs");
const { userMemberCheck } = require("./chatServices");

exports.newMessage = async (userId, chatId, content) => {
  const isMember = await userMemberCheck(userId, chatId);
  if (!isMember) {
    const err = new Error("Cannot post here!");
    err.status = 403;
    throw err;
  }

  const newMessage = await prisma.message.create({
    data: {
      content,
      authorId: userId,
      chatId
    }
  })
  return newMessage;
};

exports.softDeleteMessage = async (messageId) => {
  const deletedMessage = await prisma.message.update({
  where: {
    id: messageId,
  },
  data: {
    deletedAt: Date.now(),
  }
  })
  return deletedMessage;
};

exports.messageOwnerCheck = async (userId, messageId) => {
  const foundMessage = await prisma.message.findUnique({
    where: {
      id: messageId,
      authorId: userId
    }
  })
  return foundMessage;
}