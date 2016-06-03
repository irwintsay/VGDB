var express     = require('express'),
    path        = require('path'),
    router      = express.Router();

router.get('/', function(req, res) {
  res.render('welcome');
});

router.get('/main', function(req, res) {
  res.render('index');
});

module.exports = router;
