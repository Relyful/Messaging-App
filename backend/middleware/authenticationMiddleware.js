const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const err = new Error("You are not authorized!");
    err.statusCode = 401;
    return next(err);
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      const authErr = new Error("Invalid or expired token!");
      authErr.statusCode = 401;
      return next(authErr);
    }
    req.user = user;
    next();
  });
};