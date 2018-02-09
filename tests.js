const transmitService = require('./sender/transmit.js');
var expect = require('chai').expect

beforeEach(async function () {
});

describe('Must make a connection and send a message to the server. (Client Tests)',  function () {
    let message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in placerat libero...'
    it('Get an error with an empty message', async function () {
        let connection = await transmitService('', 'utf8', '');
        expect(connection.toString()).to.be.equal('Error: The server did not accept empty strings');
    });
    it('Get an error with an empty encode', async function () {
        let connection = await transmitService(message, '', '');
        expect(connection.toString()).to.be.equal('Error: The server did not accept empty encoding');
    });
    it('Get an ok message', async function () {
        let callback =  function () {return 'OK'};
        let connection = await transmitService(message, 'utf8', callback);
        console.log(connection);
        // expect(connection.toString()).to.be.equal('Error: The server did not accept empty encoding');
    });
    
});