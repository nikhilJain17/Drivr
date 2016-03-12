var Myo = require('myo');
//myo = Myo.create();

console.log('Started program.\n');

Myo.connect('com.bd.driver');

Myo.on('connected', function() {
    console.log('Connected!\n');
    console.log(this);
});


Myo.on('pose', function(pose_name){
    console.log('Started ', pose_name);
});

Myo.on('pose_off', function(pose_name){
    console.log('Ended  ', pose_name);
});


Myo.on('accelerometer', function(data) {
//    console.log(data);
//    sleep(1000);
});


//Myo.trigger('accelerometer');