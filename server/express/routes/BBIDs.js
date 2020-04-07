var express = require('express');
const BBID = require('../models/BBid');
var app = require('../app');
var router = express.Router();

/* GET BBIDs listing. */
router.get('/all', function(req, res, next) {
    BBID.getAllBBid((err,BBid)=>{
    if(err){
      res.json({success: false,msg:'Failed'});
    } else{
      res.json({success:true,msg:'Downloaded',BBid:BBid});
    }
  });
});
// POST BBIDs listing
router.post('/add',(req,res,next)=>{
  console.log(req.body);  
  let newBBid={
    BBid:req.body.BBid
  };
  console.log("newBBid:- "+newBBid);
  BBID.getBBidByid(newBBid.BBid,(err,foundBBid)=>{
    if(err) throw err;
    if(foundBBid){
      return res.json({success: false, msg:'BBid already exist'});
    }
        BBID.addBBid(newBBid,(err,BBid)=>{
            if(err){
            res.json({success:false,msg:'Failed to add'});
            }else{
            res.json({
                success:true,
                msg:BBid.BBid+' is added'
            });
            }
        });
    });
});

module.exports = router;
