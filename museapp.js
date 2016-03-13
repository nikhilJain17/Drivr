//var io = require('socket.io-client');
var dgram = require("dgram");
var osc = require('osc-min');

var server = dgram.createSocket("udp4");
// var socket = io('http://104.131.10.60:8080');

var io = require('socket.io-client');
var socket = io.connect('http://bd468a57.ngrok.io', {reconnect: true});

//var jewdant = require('socket.io')(server);

var oscObj;

var message_counter = 0;
var batch = [];

var lock = 0;
var hold = 0;
var calm = 0;

//socket.emit('left');

server.on("message", function(msg, rinfo) {
  var error;
  try {
    oscObj = osc.fromBuffer(msg);
    oscObj['timeInMs'] = Date.now();

    batch.push(oscObj);
    // socket.emit('oscdata', oscObj);
//    console.log(oscObj);

    // Code for concentration
    if (oscObj.address == "/muse/elements/experimental/concentration") {
        console.log("concentration level:: ");
//        console.log(oscObj.args);
        
        if (oscObj.args > 0.5) {
            socket.emit('isConcentrating');
            console.log('isConcentrating');
        }
        
        else {
            socket.emit('isNotConcentrating'); 
            console.log('is not concentrating');
        }
        
    }
//    
//    if (oscObj.address = "/muse/elements/experimental/mellow") {
//        console.log("mellow: ");
//        console.log(oscObj.args);   
//    }
      
       if (oscObj.address == "/muse/acc") {
            console.log(oscObj.args[0].value);
           
           if (oscObj.args[0].value > 200 || oscObj.args[0].value < -130) {
               
                socket.emit('headtilt');   
           }
               
           
//            if (oscObj.args[0] > 100)
//                console.log('dm');
        }
//    
      

    //START ALPHA PROCESSING CODE
//     var total = 0;
//     var active = 0;
//     var avgAlpha = 0;
//     if(oscObj.address == "/muse/dsp/elements/alpha"){
//       oscObj.args.forEach(function(datum){
//         if(datum.value){
//           total = total + datum.value;
//           active = active + 1;
//         }
//         avgAlpha = total/active;
//       });
//       console.log("alpha: "+avgAlpha);
//       if(avgAlpha > 0.32){
//         calm = calm + 1;
//         if(calm == 6){
//           socket.emit('threefour', 1);
//         }
//       }else{
//         calm = 0;
//       }
//     }
    //END ALPHA PROCESSING CODE
    //START JAWCLENCH PROCESSING
//     if(oscObj.address == "/muse/dsp/elements/jaw_clench"){
//       console.log(oscObj.args[0].value);
//       if(oscObj.args[0].value == 1){
//         if((Date.now() - lock) > 4000 ){
//           hold = 0;
//           socket.emit('threefour', 0);
//           lock = Date.now();
//         }else{
//           hold = hold+1;
//           if(hold == 10){
//             hold = 0;
//             socket.emit('threefour', 1);
//             lock = Date.now();
//           }
//         }
//       }
//     }
    //END JAWCLENCH

    message_counter += 1;

		if(message_counter % 2000 == 0) {
//      console.log('Recieved 2k messages ' + message_counter / 2000);
      socket.emit('oscbatch', batch);
      // console.log(batch);
      batch = [];
		}


  } catch (_error) {
    error = _error;
    socket.emit('err', "invalid OSC packet");
  }
});

server.on("listening", function () {
  var address = server.address();
//  console.log("server listening " +
//      address.address + ":" + address.port);
});


server.bind(5000);
// server listening 0.0.0.0:5001
