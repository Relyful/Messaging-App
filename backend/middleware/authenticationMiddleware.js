module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  const err = new Error("You are not authorized!");
  err.statusCode =  401;
  throw err;
}