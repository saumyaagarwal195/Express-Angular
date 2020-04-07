const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema--------------
const SensorSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    sensor1:{
        type:String,
        required:true
    },
    sensor2:{
        type:String,
        required:true
    }
});

const Sensor=module.exports=mongoose.model('Sensor',SensorSchema);

//Get all sensor data..
module.exports.getAllSensors=function(callback){
    Sensor.find(callback);
}

//Get individual sensor data 
module.exports.getSensorsByUsername=function(username,callback){
    const query={username:username}
    Sensor.findOne(query,callback);
}

//add sensor data..
module.exports.addSensor=function(newSensor,callback){
    Sensor.create(newSensor,callback);  
}

//Update Sensor data..
module.exports.updateSensor=(Sensors,options,callback) =>{
    query={
        username: Sensors.username
    }
    var update = {
        sensor1: Sensors.sensor1,
        sensor2: Sensors.sensor2
    }
    Sensor.findOneAndUpdate(query,update,options,callback);
}
