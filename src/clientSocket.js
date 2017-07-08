import socketIOClient from 'socket.io-client'
// import ChromeRemoteInterface from 'chrome-remote-interface'

export default () => {

    let s = socketIOClient();

    s.on('connect', () => {
        console.info('connect! yay');
    });

    s.on('event', (obj) => {
        console.info('event! yay', obj);
        if (obj === 'doTest') {

        }
    });

    s.on('disconnect', () => {
        console.info('disconnect! yay');
    });

    return s;
};
