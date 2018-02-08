'use strict'
const net = require('net');

const PORT = 8080;
const ADDRESS = 'localhost';

// let the listener, for the system kill the process
process.on('SIGTERM', function() {
  process.exit(0)
})


// create a base socket, listening to the data transfers...
// ...didn't create on.end, because, after receive the data, i can kill the process.
net.createServer(socket => {
    socket.on('data', function(data) {
        // I have to do the two process, because the data came without quotes,... 
        //...so i can't think in a best way, without use a non-native library.
        console.log(JSON.stringify(JSON.parse(data)));
        socket.destroy();
    });
}).listen(PORT, ADDRESS);
