// const { prisma } = require('../lib/prisma.mjs');
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');

exports.createUser = async (req, res) => {
  const data = req.body;
  const password = await bcrypt.hash(data.password, 10);
  const user = await userServices.createNewUser(data.username, password);
  res.send(user);
};

