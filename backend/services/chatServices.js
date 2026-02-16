const { prisma } = require("../lib/prisma.mjs");

exports.getAllChat = () => {
  return prisma.chat.findMany();
};
