var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var async = require('async')

/* DELETE home page */

 //get
router.get('/message/:id/delete',(req,res,next)=> {
  async.parallel(
    {
      message(callback){
        Message.findById(req.params.id)
        .populate('user')
        .exec(callback)
      }
    }, (err,results)=>{
      if(err){
        return next(err);
      }
      if(results.message == null){
        //no product result
        console.log('errorrww')
      }
      //success so render product delete page
      res.render('message_delete',{
        msg : results.message
      })
    }
  )
});
  
 


///post
 router.post('/message/:id/delete',(req,res)=>{
  async.parallel(
    {
      product(callback){
        Message.findById(req.params.id).exec(callback);
      }
    },
  Message.findByIdAndRemove(req.params.id,
    (err)=>{
      // if there is error
      if(err){
        return next(err)
      }
      //sucess
      res.redirect('/')
    }))  
})  

module.exports = router;
