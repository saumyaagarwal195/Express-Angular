const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

// User Schema--------------
const UserSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    _id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:'password'
    },
    BBid:{
        type:String,
        required:true,
        unique:true
    }
});

const User=module.exports=mongoose.model('User',UserSchema);

module.exports.getAllUsers=function(callback){
    User.find(callback);
}

module.exports.getUserByEmail=function(email,callback){
    const query={email:email}
    User.findOne(query,callback);
}

module.exports.getUserByUserName=function(_id,callback){
    const query={_id:_id}
    User.findOne(query,callback);
}


module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
        });
      });
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
}
