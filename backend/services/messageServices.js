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
}