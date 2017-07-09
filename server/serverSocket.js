const socketIO = require('socket.io');
const ChromeRemoteInterface = require('chrome-remote-interface');
const logger = require('../build/lib/logger')
import ChromeRemoteInterfaceClient from './chromeRemoteInterfaceClient'


module.exports = function(http) {

    let socket = socketIO(http, {
        pingInterval: 5000,
        pingTimeout: 11000,
    });

    socket.on('connection', (s) => {
        logger.info('I got a client on the server!!!');

        //s.emit('xx', 'LOL');

        s.on('screenshot', async (obj) => {
            console.log('event screenshot! yay');
           // const screenshot = await ChromeRemoteInterfaceClient.captureScreenshot('https://www.firebox.com');
            //console.log('screen data', screenshot.length);

            return;
        });

    });

    // socket.on('connection',function(socket) {
    //     console.log("A user is connected");
    // });
    //
    return socket;
};