//var leapjs = require('leapjs');
//var controller = new leapjs.Controller();
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//var isConcentrating = true;

io.on('connection', function(socket){
    console.log("connection");

socket.on("/", function(req, res){
    res.send("Drivr");
  });

/////////////////////////////////////
//                                 //
//         input from muse         //
//                                 //
/////////////////////////////////////


// according to the muse, is the user focusing?
// note, it is an 'on/off' thing, not a gradient
app.get('/isConcentrating', function(req, res) {
//    isConcentrating = true;
    io.emit("concentrating");
    console.log('concentrating');
});
    
app.get('/isNotConcentrating', function(req, res) {
//    isConcentrating = false;
    io.emit("notConcentrating");
});
    
// @TODO accelerometer data from head!
    
    
    

/////////////////////////////////////
//                                 //
//         input from myo          //
//                                 //
/////////////////////////////////////
    
// hand NOT on wheel
socket.on('notOnWheel', function(req, res){
    console.log('not on wheel');
    socket.emit('handsoff');

});

/////////////////////////////////////
//                                 //
//        output to ios app        //
//                                 //
/////////////////////////////////////


    
/////////////////////////////////////
//                                 //
//        input from pebble        //
//                                 //
/////////////////////////////////////

    
  app.get("/right", function(req, res){
    res.send("Right Turn");
    console.log("right turn");
    io.emit("right");
  });

  app.get("/left", function(req, res){
    res.send("Left Turn");
    console.log("left turn");
    io.emit("left");
  });

//  controller.on('connect', function() {
//    console.log("Successfully connected.");
//  });
    
    // playskip to skip song
});

http.listen(8000, function(){
  console.log("Listening on *:8000");
});
