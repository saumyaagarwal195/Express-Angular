const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema--------------
const BBIDSchema=mongoose.Schema({
    BBid:{
        type:String,
        required:true,
        unique:true
    }
});

const BBID=module.exports=mongoose.model('BBID',BBIDSchema);

module.exports.getAllBBid=function(callback){
    BBID.find(callback);
}

module.exports.getBBidByid=function(BBid,callback){
    const query={BBid:BBid};
    BBID.findOne(query,callback);
}


module.exports.addBBid=function(newBBid,callback){
    BBID.create(newBBid,callback);  
}

