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