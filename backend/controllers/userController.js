// const { prisma } = require('../lib/prisma.mjs');
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');
const { body, validationResult, matchedData } = require('express-validator');

const validateCreateUser = [
  body('username').trim()
  .isLength({min: 4, max: 12}).withMessage('Username must be between 4 to 12 characters long')
  .isAlphanumeric().withMessage('Username must contain only letters and numbers')
  .escape(),
  body('password')
  .isLength({min: 5, max: 20}).withMessage('Password must be between 5 to 20 characters long.'),
  body('repeatPassword')
  .custom((value, {req}) => value === req.body.password).withMessage('Passwords must match'),
]

exports.createUser = [validateCreateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  const matchedDataz = matchedData(req);
  console.log(matchedDataz);
  const data = req.body;
  const password = await bcrypt.hash(data.password, 10);
  const user = await userServices.createNewUser(data.username, password);
  res.json(user);
}];

exports.deleteUser = async (req, res) => {
  const currentUserId = req.user.id;
  const deletedUser = await userServices.deleteUser(currentUserId);
  res.json(deletedUser)
};

exports.updateProfilePic = async (req, res) => {
  const picId = req.params.picId
  const currentUserId = req.user.id;
  const udpatedUser = await userServices.updateProfilePic(currentUserId, picId);
  res.json(udpatedUser);
};

exports.updateDisplayName = async (req, res) => {
  const userId = req.user.id;
  const newDisplayName = req.params.displayName;
  const updatedUser = await userServices.updateDisplayName(userId, newDisplayName);
  res.json(updatedUser);
}

exports.updateAbout = async (req, res) => {
  const newAbout = req.body.aboutMe;
  const userId = req.user.id;
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

exports.thisUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send('No user found');
  }
  const thisUser = req.user;
  res.json({'username': thisUser.username,
    'displayName': thisUser.displayName,
    'role': thisUser.role,
    'id': thisUser.id
  });
}