// Module Dependencies
var express       = require('express'),
    jwt           = require('jsonwebtoken'),
    path          = require('path'),
    usersRouter   = express.Router();

// Require Models
var User          = require('../../models/user');
var Search        = require('../../models/search');

// Require Passport Strategy
var passport      = require("../../lib/passportStrategy.js");

// User create route
usersRouter.post('/', function(req, res) {
  console.log(req.body);
  User.create(req.body, function(error, dbUser) {
    if (error) {
      console.log("Error creating User");
      res.status(501).json(error);
    } else {
      console.log("Saved: " + dbUser);
      var token = jwt.sign(dbUser, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });
      res.json({ token: token });
    }
  });
});

module.exports = usersRouter;
