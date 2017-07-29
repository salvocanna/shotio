import socketIO from 'socket.io';
import logger from '../build/lib/logger';
import { actions } from '../src/store/main';
import { loadPage } from './chromeRemoteInterfaceClient';

export default (http) => {

    let io = socketIO(http, {
        pingInterval: 5000,
        pingTimeout: 11000,
    });

    io.on('connection', (socket) => {

        socket.on(actions.MAKE_SCREENSHOT, async request => {
            console.log('event screenshot! yay', request);
            const begin = Date.now();
            await loadPage({
                url: request.url,
                eventCallback: (eventType, data) => {
                    socket.emit(actions.MAKE_SCREENSHOT_RESULT, { eventType, time: Date.now() - begin, data, id: request.id });
                },
            });
        });
    });

    return io;
};