const { prisma } = require('../lib/prisma.mjs');

exports.createNewUser = async (username, password) => {
  return await prisma.$transaction(async (tx) => {
    const globalChatId = await tx.chat.findFirstOrThrow({
      where: {
        type: "GLOBAL"
      }
    })
    const newUser = await tx.user.create({
    data: {
      username: username,
      password: password,
      chatMembers: {
        create: {
          chatId: globalChatId.id
        }
      }
    }
  })
  return newUser;
  })
}

exports.deleteUser = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  const deletedUser = prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      deletedAt: Date.now(),
      username: `${user.username}_del_${Date.now()}`
    }
  })
  return deletedUser;
}

exports.updateProfilePic = async (userId, picId) => {
  return await prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: {
      profilePicId: parseInt(picId)
    }
  })
}

exports.updateDisplayName = async (userId, displayName) => {
  return await prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: {
      displayName: displayName
    }
  })
}

exports.updateAbout = async (userId, about) => {
  return await prisma.user.update({
    where: {
      id: parseInt(userId)
    },
    data: {
      about: about
    }
  })
}

exports.getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: parseInt(userId)
    }
  })
}

exports.getAllUsers = async () => {
  const activeUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    }
  });
  return activeUsers;
}