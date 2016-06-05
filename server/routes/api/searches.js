// Module Dependencies
var express         = require('express'),
    jwt             = require('jsonwebtoken'),
    path            = require('path'),
    searchesRouter  = express.Router();

// Require Models
var Search          = require('../../models/search');

// Search: Get All
searchesRouter.get('/', function(req, res) {
  Search.find(function(error, response) {
    res.json(response);
  });
});

// Search: Create
searchesRouter.post('/', function(req, res) {
  console.log(req.body);
  Search.create(req.body, function(error, dbSearch) {
    if (error) {
      console.log("Error saving Search");
      res.json(error);
    } else {
      console.log("Saved: " + dbSearch);
      res.json(dbSearch);
    }
  });
});

// Search: Update Count
searchesRouter.put('/:queryString', function(req, res) {
  var query = { queryString: req.params.queryString };
  console.log(Object.keys(req.body));
  if (Object.keys(req.body).length != 0) {
    Search.update(query, { $push: { "users": req.body }, $inc: { "count": 1 } }, function(error, dbSearch) {
      if (error) {
        console.log("Error updating Search");
        res.json(error);
      } else {
        console.log("Updated: " + dbSearch);
        res.json(dbSearch);
      }
    });
  } else {
    Search.update(query, { $inc: { "count": 1 } }, function(error, dbSearch) {
      if (error) {
        console.log("Error updating Search");
        res.json(error);
      } else {
        console.log("Updated: " + dbSearch);
        res.json(dbSearch);
      }
    });
  }
});

// Search: Update User Summary
searchesRouter.put('/add-summary/:queryString', function(req, res) {
  var id = req.body.id;
  var summary = req.body.summary;
  var query = { queryString: req.params.queryString };
  Search.update({
    queryString: req.params.queryString,
    "users.user_id": id
  }, { $set: { "users.$.summary": summary } }, function(error, response) {
    console.log(response);
    res.json(response);
  });
});

module.exports = searchesRouter;
