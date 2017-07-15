import socketIO from 'socket.io';
import logger from '../build/lib/logger'
import { actions } from '../src/store/main'
import { loadPage } from './chromeRemoteInterfaceClient'

module.exports = function(http) {

    let io = socketIO(http, {
        pingInterval: 5000,
        pingTimeout: 11000,
    });

    io.on('connection', (socket) => {

        socket.on(actions.MAKE_SCREENSHOT, async obj => {
            console.log('event screenshot! yay', obj);
            const begin = Date.now();
            await loadPage('https://www.firebox.com', (eventType, data) => {
                socket.emit(actions.MAKE_SCREENSHOT_RESULT, { eventType, time: Date.now() - begin, data });
            });
        });

    });

    return io;
};