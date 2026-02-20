const { prisma } = require("../lib/prisma.mjs");

exports.getAllChat = async () => {
  return await prisma.chat.findMany();
};

exports.getChatWithUserId = async (requestingUserId, requestedUserId) => {
  const existingChat = await prisma.chat.findFirst({
    where: {
      type: "SOLO",
      AND: [
        { chatMembers: { some: { userId: parseInt(requestingUserId) } } },
        { chatMembers: { some: { userId: parseInt(requestedUserId) } } },
      ],
    },
  });
  return existingChat;
};

exports.createNewChatWithUser = async (creatingUserId, addedUserId) => {
  const newChat = await prisma.chat.create({
    data: {
      type: "SOLO",
      chatMembers: {
        create: [{ userId: parseInt(creatingUserId) }, { userId: parseInt(addedUserId) }],
      },
    },
  });
  return newChat;
};

exports.deleteChatById = async (chatId) => {
  const deletedChat = await prisma.chat.delete({
    where: {
      id: parseInt(chatId),
    },
  });
  return deletedChat;
};

exports.updateChatNameById = async (chatId, newChatName) => {
  const updatedChat = await prisma.chat.update({
    where: {
      id: parseInt(chatId),
    },
    data: {
      name: newChatName,
    },
  });
  return updatedChat;
};

exports.findChatByIdUserId = async (chatId, userId) => {
  const foundChat = await prisma.chat.findFirst({
    where: {
      id: parseInt(chatId),
      AND: {
        chatMembers: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
    },
  });
  return foundChat;
};

exports.userMemberCheck = async (userId, chatId) => {
  const membership = await prisma.chatMember.findUnique({
    where: {
      chatId_userId: {
        chatId: parseInt(chatId),
        userId: userId
      }
    }
  })
  return membership;
};