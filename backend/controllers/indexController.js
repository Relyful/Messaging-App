const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { prisma } = require("../lib/prisma.mjs");

exports.getIndex = (req, res) => {
  res.send("API is running");
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({ status: 401, errMessage: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ status: 401, errMessage: 'Invalid username or password' });
    }

    // JWT token valid for 7 days
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        profilePic: user.profilePic
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};