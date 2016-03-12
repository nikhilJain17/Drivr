
var webClass  = require( __dirname + "/web.class"),
    nodeMuse  = require("node-muse");
    web       = new webClass(nodeMuse.Muse);
 
//var Muse = nodeMuse.connect().Muse;
//var OSC = nodeMuse.OSC;

nodeMuse.connect(
    "127.0.0.1",
    "5002"
);


console.log('Muse app loaded');

//// callbacks
//Muse.on('connected', function() {
//    console.log('Muse was connected.');
//});
//
//Muse.on('uncertain', function() {
//    console.log('Muse connection is uncertain.');
//});
//
//Muse.on('disconnected', function() {
//    console.log('Muse was disconnected');
//});


// start the web server

web.init({
    port: 8080
});