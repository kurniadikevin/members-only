var express = require('express');
var router = express.Router();
var Message = require('../models/message');


/* GET home page. */
router.get('/', (req, res,next) => {
  Message.find({}, "")
  .sort({ timeStamp: -1 })
  .populate("user")
  .exec(function (err, list_message) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("index", { title: "Member Only", message_list: list_message });
  });
});

/* DELETE home page */
/* router.get('/delete_msg',(req,res,next)=>{

}) */

module.exports = router;
