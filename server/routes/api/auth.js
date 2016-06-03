var express         = require('express'),
    usersRouter     = express.Router(),
    passport        = require('../../lib/passportStrategy.js'),
    User            = require('../../models/user.js'),
    jwt             = require('jsonwebtoken');

// Initialize passport
usersRouter.use(passport.initialize());

// Log in and send back token if successful
usersRouter.post('/', passport.authenticate('local', {session: false}), function(req, res, next) {
  //  Had to modify the object used to sign our token because our User objects
  //  were getting too large
  console.log(req.user);
  var tokenObject = {_doc: { username: req.user.username }};
  // var token = jwt.sign(req.user, process.env.JWT_SECRET, {
  var token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
    expiresIn: "24h"  // expires in 24 hours
  });
  res.json({ token: token });
});

module.exports = usersRouter;
