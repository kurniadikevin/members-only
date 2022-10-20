var express = require('express');
var router = express.Router();

/* GET NEW MESSAGE FORM */
router.get('/', function(req, res, next) {
  res.render('message-form',{title: 'Post new Message'})
});

module.exports = router;
