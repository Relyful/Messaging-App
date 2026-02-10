// const { prisma } = require('../lib/prisma.mjs');
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');

exports.createUser = async (req, res) => {
  const data = req.body;
  const password = await bcrypt.hash(data.password, 10);
  const user = await userServices.createNewUser(data.username, password);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  //Add id from user auth
  const currentUserId = null;
  const deletedUser = await userServices.deleteUser(currentUserId);
  res.json(deletedUser)
};

exports.updateProfilePic = async (req, res) => {
  //add if from auth
  const picId = req.params.picId
  const currentUserId = null;
  const udpatedUser = userServices.updateProfilePic(currentUserId, picId);
  res.json(udpatedUser);
};