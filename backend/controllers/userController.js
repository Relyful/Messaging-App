// const { prisma } = require('../lib/prisma.mjs');
const bcrypt = require('bcrypt');
const userServices = require('../services/userServices');
const { body, validationResult, matchedData, param } = require('express-validator');

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

const validateDisplayName = [
  param('displayName').trim()
  .isLength({min: 4, max: 12}).withMessage('Display name must be betweeen 4 to 12 characters long')
  .isAlphanumeric().withMessage('Display name must contain only letters and numbers')
  .escape()
]

const validateAboutMe = [
  body('aboutMe')
  .isLength({max: 400}).withMessage('About me cannot exceed 400 characters')
  .escape()
]

exports.createUser = [validateCreateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  const data = matchedData(req);
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

exports.updateDisplayName = [validateDisplayName, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const userId = req.user.id;
  const newDisplayName = matchedData(req).displayName;
  const updatedUser = await userServices.updateDisplayName(userId, newDisplayName);
  res.json(updatedUser);
}];

exports.emptyDisplayName = async (req, res) => {
  const userId = req.user.id;
  const newDisplayName = '';
  const updatedUser = await userServices.updateDisplayName(userId, newDisplayName);
  res.json(updatedUser);
}

exports.updateAbout = [validateAboutMe, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  const newAbout = matchedData(req).aboutMe;
  const userId = req.user.id;
  const updatedUser = await userServices.updateAbout(userId, newAbout);
  res.json(updatedUser);
}];

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  const foundUser = await userServices.getUserById(userId);
  res.json(foundUser);
};

exports.getAll = async (req, res) => {
  const allUsers = await userServices.getAllUsers();
  res.json(allUsers);
};

exports.thisUser = async (req, res) => {
  const thisUser = await userServices.getUserById(req.user?.id);

  if (!thisUser) {
      return res.status(404).json({ status: 404, errMessage: 'User not found' });
    }

  res.json({'username': thisUser.username,
    'displayName': thisUser.displayName,
    'role': thisUser.role,
    'id': thisUser.id
  });
};