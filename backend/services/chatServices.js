const { prisma } = require("../lib/prisma.mjs");

exports.getAllChat = async () => {
  return await prisma.chat.findMany();
};

exports.getChatWithUserId = async (requestingUserId, requestedUserId) => {
  const existingChat = await prisma.chat.findFirst({
  where: {
    type: 'SOLO',
    AND: [
      { chatMembers: { some: { userId: requestingUserId } } },
      { chatMembers: { some: { userId: requestedUserId } } }
    ]
  }
});
return existingChat;
};

exports.createNewChatWithUser = async (creatingUserId, addedUserId) => {
  const newChat = await prisma.chat.create({
  data: {
    type: 'SOLO',
    chatMembers: {
      create: [{ userId: creatingUserId }, { userId: addedUserId }]
    }
  }
});
return newChat;
};

exports.deleteChatById = async (chatId) => {
  const deletedChat = await prisma.chat.delete({
    where: {
      id: chatId
    }
  })
  return deletedChat;
};

exports.updateChatNameById = async (chatId, newChatName) => {
  const updatedChat = await prisma.chat.update({
    where: {
      id: chatId
    },
    data: {
      name: newChatName
    }
  })
  return updatedChat;
};

exports.findChatByIdUserId = async (chatId, userId) => {
  await prisma.chat.findFirst({
    where: {
      id: chatId,
      AND: {
        chatMembers: {
          userId: userId
        }
      }
    }
  })
}