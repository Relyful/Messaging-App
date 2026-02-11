const { prisma } = require('../lib/prisma.mjs');

exports.createNewUser = async (username, password) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
    }
  })
  return newUser;
}

exports.deleteUser = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  const deletedUser = prisma.user.update({
    where: { id },
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
      id: userId
    },
    data: {
      profilePicId: picId
    }
  })
}

exports.updateDisplayName = async (userId, displayName) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      displayName: displayName
    }
  })
}

exports.updateAbout = async (userId, about) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      about: about
    }
  })
}