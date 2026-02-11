const passport = require("passport");

exports.getIndex = (req, res) => {
  res.send(req.isAuthenticated())
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info)
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.send(200);
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.send(200);
}