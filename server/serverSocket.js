import socketIO from 'socket.io';
import logger from '../build/lib/logger'
//import ChromeRemoteInterfaceClient from './chromeRemoteInterfaceClient'

module.exports = function(http) {

    let io = socketIO(http, {
        pingInterval: 5000,
        pingTimeout: 11000,
    });

    io.on('connection', (socket) => {

        socket.on('MAKE_SCREENSHOT', (obj) => {
            console.log('event screenshot! yay', obj);
           // const screenshot = await ChromeRemoteInterfaceClient.captureScreenshot('https://www.firebox.com');
            //console.log('screen data', screenshot.length);
            socket.emit('test-message', {ab:'c', t: 123});
        });

    });

    return io;
};