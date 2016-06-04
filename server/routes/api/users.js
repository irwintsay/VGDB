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

// User Create
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

// Routes below this line are protected
// ************************************
usersRouter.use(passport.authenticate('jwt', { session: false }));

// User Get Current
usersRouter.get('/current', function(req, res) {
  res.json(req.user);
});

// User Get by Username
usersRouter.get('/:username', function(req, res) {
  var query = { username: req.params.username };
  User.findOne(query, function(error, dbUser){
    if (error) {
      console.log("Error retrieving User details");
      console.log(error);
      res.json(error);
    } else {
      res.json(dbUser);
    }
  });
});

// User Edit
usersRouter.put('/edit', function(req, res){
  var editedUser = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  };
  var cookiesUser = JSON.parse(req.cookies.current_user);
  var query = { username: cookiesUser.username };

  User.update(query, editedUser, function(error, dbUser) {
    if (error) {
      console.log("Error updating User details");
      res.json(error);
    } else {
      var tokenObject = {_doc: { username: editedUser.username }};
      var token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });
      res.json({ token: token, currentUser: { username: editedUser.username } });
    }
  });
});

// User Delete
usersRouter.delete('/:username', function(req, res) {
  // var cookiesUser = JSON.parse(req.cookies.current_user);
  // var query = { username: cookiesUser.username };
  var query = { username: req.params.username };

  User.remove(query, function(error, status) {
    if (error) {
      console.log("Error deleting User");
      res.json(error);
    } else {
      console.log('Successfully deleted User');
      res.json(status);
    }
  });
});
//
// // User Edit - Add Search
// usersRouter.put('/addSearch', function(req, res){
//
//   var newSearch = Search({
//     queryString: req.body.queryString,
//     count: req.body.count,
//     firstSearched: req.body.firstSearched,
//     lastSearched: req.body.lastSearched
//   });
//
//   var cookiesUser = JSON.parse(req.cookies.current_user);
//   var query = { username: cookiesUser.username };
//
//   // Update User based on query with new Favorite
//   User.update(query, { $push: { "searches": newFavorite } }, function(error, dbUser) {
//     if (error) {
//       console.log("Error adding Search query");
//       res.json(error);
//     } else {
//       res.json(newSearch);
//     }
//   });
// });

module.exports = usersRouter;
