const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.43.195');
var can = require('rawcan');
var conv = require('convert-hex');
// Import events module
var events = require('events');
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

//Buffer to store Username
//var sensor = new Buffer([0,0]);
var user="";
var sensor1=0;
var sensor2=0;
const socket = can.createSocket('can0'); //vcan0 or can0

// Create an event handler- canSend as follows..
var canSend = function canSend() {
   socket.send(0x321,'0x123456');
   console.log('Send succesfully.');
}
setInterval(function(){
    var payload={
    "username":user,
    "sensor1":sensor1,
    "sensor2":sensor2
    };
    console.log(payload);
    client.publish('putReq', JSON.stringify(payload));
},1000);
// Bind the connection event with the handler-canSend & publish..
eventEmitter.on('send', canSend);
//eventEmitter.on('pub',publish);


//For recieving CAN Frames.. 
socket.on('error', err => { console.log('socket error: ' + err); });
socket.on('message', (id, buffer) => {
  //console.log('received frame [' + id.toString(16) + '] ' + buffer.toString('hex'));
  var hex=buffer.toString('HEX');
  var digit = conv.hexToBytes(hex).join(',');
  //console.log("digit"+digit);
  var sen = digit.split(',');
  console.log("sen:-"+sen[1],sen[2]);
  sensor1=sen[1];
  sensor2=sen[2];
  console.log(sensor1,sensor2);
});

//Connect to MQTT broker as subscriber
client.on('connect', function () {
    client.subscribe('User');
    client.subscribe('Send');
    //client.publish('putReq', JSON.stringify(payload));
    //client.end();
});

//Get message from MQTT broker
client.on('message', function (topic, message) {
console.log("Topic: " + topic + " MSG: " + message);
    if (topic == 'User') {
        msg = JSON.parse(message);
        //console.log(msg);
        user=msg.user;
        //console.log("user:-"+user);
        //eventEmitter.emit('pub');
    }
    if (topic == 'Send') {
        //msg = JSON.parse(message);
        //console.log(msg);
        // Fire the connection event 
        eventEmitter.emit('send');
        //console.log("after emit");
    }
});
