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
  //add id from auth
  const picId = req.params.picId
  const currentUserId = null;
  const udpatedUser = await userServices.updateProfilePic(currentUserId, picId);
  res.json(udpatedUser);
};

exports.updateDisplayName = async (req, res) => {
  //get user id from auth
  const userId = null;
  const newDisplayName = req.params.displayName;
  const updatedUser = await userServices.updateDisplayName(userId, newDisplayName);
  res.json(updatedUser);
}

exports.updateAbout = async (req, res) => {
  //get userid form auth
  const newAbout = req.data.aboutMe;
  const userId = null;
  const updatedUser = await userServices.updateAbout(userId, newAbout);
  res.json(updatedUser);
}

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  const foundUser = await userServices.getUserById(userId);
  res.json(foundUser);
}

exports.getAll = async (req, res) => {
  const allUsers = await userServices.getAllUsers();
  res.json(allUsers);
}