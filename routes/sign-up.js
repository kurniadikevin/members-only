var express = require('express');
var router = express.Router();

/* GET SIGN UP FORM */
router.get('/', function(req, res, next) {
  res.render('sign-up',{})
});

module.exports = router;
