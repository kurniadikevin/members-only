var express = require('express');
var router = express.Router();
var app = express();

// using local .env to assign user globally on app 
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;// current user can be used in view as in index.ejs
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only Board' });
});

module.exports = router;
