var express     = require('express'),
    path        = require('path'),
    router      = express.Router();

router.get('/', function(req, res) {
  res.render('test');
});

module.exports = router;
