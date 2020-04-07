var express = require('express');
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost');
const Sensor = require('../models/sensor');
var app = require('../app');
var router = express.Router();
//Buffer to store Username
var user ="";

/* GET sensors listing. */
router.get('/all', function(req, res, next) {
    Sensor.getAllSensors((err,sensors)=>{
    if(err){
      res.json({success: false,msg:'Failed'});
    } else{
      res.json({success:true,msg:'Downloaded',sensors:sensors});
    }
  });
});

router.post('/buzzer',(req,res,next)=>{
    client.publish('Send', JSON.stringify("buzzer"));
    res.json({
        success:true,
        msg:"Buzzer ON/OFF"
    });
    
});


router.post('/add',(req,res,next)=>{
    //console.log(req.body); 
    user={
        user:req.body.username
    }
    console.log("Buffer:-" + user);
    client.publish('User', JSON.stringify(user));
    let newSensor={
      username:req.body.username,
      sensor1: "Default",
      sensor2: "Default"
    };
    console.log(newSensor);
    Sensor.addSensor(newSensor,(err,Sensor)=>{
        if(err){
        res.json({success:false,msg:'Failed to add'});
        }else{
        res.json({
            success:true,
            msg:Sensor
        });
        }
    });
});

router.post('/one',(req,res,next)=>{
    //console.log(req.body); 
    let userOne={
      username:req.body.username,
    };
    console.log(userOne);
    Sensor.getSensorsByUsername(userOne.username,(err,user)=>{
        if(err) throw err;
        if(!user){
        return res.json({success: false, msg:'User not exist..'});
        }
        if(err){
        res.json({success:false,msg:'Failed to find.'});
        }else{
        res.json({success:true,msg:'Downloaded',user:user});
        }
    });
});

client.on('connect', function () {
    // client.subscribe('postReq')
    client.subscribe('putReq');
    //client.publish('User', user);
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Topic: "+topic+" MSG: "+message)
    if(topic=='putReq'){
        Sensors=JSON.parse(message);
        //console.log(device_1);
        Sensor.updateSensor(Sensors, (err, device) => {
            if (err) {
                console.log(err);
            }
        });
    }
    //client.end()
});


module.exports = router;
