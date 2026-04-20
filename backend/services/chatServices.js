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
    include: {
      messages: {
        select: {
          author: true,
          content: true,
        },
      },
    },
  });
  return existingChat;
};

exports.createNewChatWithUser = async (creatingUserId, addedUserId) => {
  if (!Array.isArray(addedUserId) || !Number.isInteger(parseInt(addedUserId))) {
    const err = new Error("Invalid data");
    err.statusCode = 400;
    throw err;
  }
  if (Array.isArray(addedUserId)) {
    const createArray = addedUserId.map((userId) => {
      return {userId: parseInt(userId)}
    });
    // Add the creating user themselves to the array
    createArray.push({userId: parseInt(creatingUserId)});
    const newChat = await prisma.chat.create({
    data: {
      type: "GROUP",
      chatMembers: {
        create: createArray,
      },
    },
  });
  return newChat;
  };
  const newChat = await prisma.chat.create({
    data: {
      type: "SOLO",
      chatMembers: {
        create: [
          { userId: parseInt(creatingUserId) },
          { userId: parseInt(addedUserId) },
        ],
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
        userId: userId,
      },
    },
  });
  return membership;
};

exports.findUsersChats = async (userId) => {
  const usersChats = await prisma.chat.findMany({
    where: {
      chatMembers: {
        some: {
          userId,
        },
      },
    },
    include: {
      chatMembers: {
        select: {
          user: true,
        },
        where: {
          NOT: {
            userId: userId,
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        include: {
          author: {
            select: {
              username: true,
            }
          }
        }
      },
    },
  });
  const orderChatFromLatest = usersChats.sort((x, y) => {
    const timeX = x.messages[0]?.createdAt || x.createdAt;
    const timeY = y.messages[0]?.createdAt || y.createdAt;
    return new Date(timeY) - new Date(timeX);
  })
  return orderChatFromLatest;
};

exports.getChatById = async (requestingUserId, chatId) => {
  const chat = await prisma.chat.findFirst({
    where: {
      id: parseInt(chatId),
    },
    include: {
      chatMembers: {
        select: {
          user: true,
        },
        where: {
          NOT: {
            userId: parseInt(requestingUserId),
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          author: {
            select: {
              username: true,
            }
          }
        }
      },
    },
  });
  return chat;
};

exports.addUserToChatById = async (toAddUserId, chatId) => {
  const userAddedToChat = await prisma.chatMember.create({
    data: {
      chatId: parseInt(chatId),
      userId: parseInt(toAddUserId)
    }
  });
  return userAddedToChat;
};