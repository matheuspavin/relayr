
'use strict'
var net = require('net');



// I do not need the variables, but i believe the code readability becomes more efficient.
var host = '127.0.0.1';
var port = 8080;
var client = new net.Socket();

module.exports = function(eventMsg, encoding, callback) {
  let bytesDispatched;
  try{
    if (!eventMsg) throw new Error('The server did not accept empty strings');
    if (!encoding) throw new Error('The server did not accept empty encoding');
    client.connect(port, host, function() {
        client.write(JSON.stringify(eventMsg));
        bytesDispatched = client._bytesDispatched;
        client.destroy();
        return callback();
      });
    } catch (err) {
      return(err);
    }
}

// I didn't need to create a data handler for the client. I make the handshake...
// ...send the message, destroy the connection and send the answer to the layer before.