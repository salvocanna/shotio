import socket from '../clientSocket'
import { actions } from './main'
import { v4 as UUID } from 'uuid'

/**
 * These two functions are just a bridge that allows us to
 * `intercept` despatch before they react the reducer (to redirect them on
 * websocket if needed) and wire back responses from the socket to
 * the reducer.
 *
 */

export function bindStoreToSocket(store) {
    const socketOnEvent = socket.onevent.bind(socket);
    socket.onevent = (packet) => {
        onMessageMiddleware(packet);
        socketOnEvent(packet);
    };

    const onMessageMiddleware = (packet) => {
        const [eventName, params] = packet.data || [];

        // // Here I should despatch a new redux action based on
        // // what I'm receiving from the websocket
        store.dispatch({ type: eventName, ...params });
    }
}

const clientSocketMiddleware = (() => {
    return store => next => action => {
        console.log("socketMiddleware: ", action);

        switch (action.type) {
            //The user wants us to make screenshot!
            case actions.MAKE_SCREENSHOT:
                socket.emit(actions.MAKE_SCREENSHOT, {url: action.url, id: UUID() });
                //return next(redespatchedAction);
                break;
                // This action is irrelevant to us, pass it on to the next middleware
            default:
                return next(action);
        }
    }
})();

export default clientSocketMiddleware;
