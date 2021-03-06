'use strict'
const net = require('net');

const port = 8080;
const adress = 'localhost';

// let the listener, for the system kill the process
process.on('SIGTERM', function() {
  process.exit(0)
})


// create a base socket, listening to the data transfers...
// ...didn't create on.end, because, after receive the data, i can kill the process.
module.exports = net.createServer(socket => {
    var start = process.hrtime();
    socket.on('data', function(data) {
        // I have to do the two process, because the data came without quotes,... 
        //...so i can't think in a best way, without use a non-native library.
        console.log(JSON.stringify(JSON.parse(data)));
        socket.write('ok');
        var elapsed = process.hrtime(start)[1] / 1000000;
        console.error('latency : ' + (process.hrtime(start)[0] + " s, " + elapsed.toFixed(3)));
    });
    socket.on('end', () =>  { return socket.destroy()});
}).listen(port, adress);
