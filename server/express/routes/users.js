var express = require('express');
const User = require('../models/user');
const BBID = require('../models/BBid');
var app = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
  User.getAllUsers((err,users)=>{
    if(err){
      res.json({success: false,msg:'Failed'});
    } else{
      res.json({success:true,msg:'Downloaded',users:users});
    }
  });
});

// POST users listing
router.post('/register',(req,res,next)=>{
  let newUser=new User({
    email:req.body.email,
    _id:req.body.username,
    password:req.body.password,
    BBid:req.body.BBid
  });

  BBID.getBBidByid(newUser.BBid,(err,foundBBid)=>{
    if(err) throw err;
    if(!foundBBid){
      return res.json({success: false, msg:'BBid not exist..'});
    }
    User.getUserByEmail(newUser.email,(err,foundemail)=>{
      if(err) throw err;
      if(foundemail){
        return res.json({success: false, msg:'Email already exist'});
      }
      User.getUserByUserName(newUser._id,(err,founduser)=>{
        if(err) throw err;
        if(founduser){
          return res.json({success: false, msg:'User already exist'});
        }
        User.addUser(newUser,(err,user)=>{
          if(err){
            res.json({success:false,msg:'Failed to register or BBid already registered'});
          }else{
            res.json({
              success:true,
              msg:'User registered..Your User id is - '+user._id,
              user_API:user._id
            });
          }
        });
      });
    });
  });
  
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUserName(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.json({
          success: true,
          user: {
            id: user._id,
            email:user.email,
            username: user.username
          },
          msg: 'Logged in'
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

module.exports = router;
