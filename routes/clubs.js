var express = require('express');
var router = express.Router();

// club router
router.get('/', function(req,res,next){
    res.render('clubs', {title: 'Club Page', clubName : 'Whitelist Club'})
})

  
module.exports = router;
