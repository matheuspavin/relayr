const transmitService = require('./sender/transmit.js');
const receiverService = require('./receiver/index.js');
var expect = require('chai').expect
var net = require('net');


var host = '127.0.0.1';
var port = 8080;
var client = new net.Socket();
var result = '';
// receiverService;
const message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in placerat libero...'

before(async function () {
    receiverService;
    client.connect(port, host, function() {
    });
});

describe('Must make a connection and send a message to the server. (Client Tests)',  function () {
    
    it('Get an error with an empty message', async function () {
        let connection = await transmitService('', 'utf8', '');
        expect(connection.toString()).to.be.equal('Error: The server did not accept empty strings');
    });
    it('Get an error with an empty encode', async function () {
        let connection = await transmitService(message, '', '');
        expect(connection.toString()).to.be.equal('Error: The server did not accept empty encoding');
    });
    it('Get an ok message', async function () {
        let callback =  function () {};
        let connection = await transmitService(message, 'utf8', callback);
        expect(!connection);
    });
});

describe('Must check the server. (Server Tests)',  function () {
    it('Check the amount of active connections with one client connected', async function () {
        expect(receiverService._connections).to.be.equal(1);
    });
    it('Check the amount of data transfered by client', async function () {
            await client.write(JSON.stringify(message));
            expect(client._bytesDispatched).to.be.equal(84);
    });
});

after(async function () {
    client.destroy();
    receiverService.close();
});
