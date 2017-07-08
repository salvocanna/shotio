const socketIO = require('socket.io');
const ChromeRemoteInterface = require('chrome-remote-interface');
const logger = require('../build/lib/logger')




module.exports = function(http) {

    let socket = socketIO(http, {
        pingInterval: 5000,
        pingTimeout: 11000,
    });

    socket.on('connection', (s) => {
        logger.info('I got a client on the server!!! XXXXXXXX');


        s.on('event', (obj) => {
            console.log('event! yay');
            if (obj === 'doTest') {
                ChromeRemoteInterface((client) => {
                    // extract domains
                    const {Network, Page} = client;
                    // setup handlers
                    Network.requestWillBeSent((params) => {
                        console.log(params.request.url);
                    });
                    Page.loadEventFired(() => {
                        client.close();
                    });
                    // enable events then start!
                    Promise.all([
                        Network.enable(),
                        Page.enable()
                    ]).then(() => {
                        return Page.navigate({url: 'https://github.com'});
                    }).catch((err) => {
                        console.error(err);
                        client.close();
                    });
                }).on('error', (err) => {
                    // cannot connect to the remote endpoint
                    console.error(err);
                });
            }
        });

        

    });

    // socket.on('connection',function(socket) {
    //     console.log("A user is connected");
    // });
    //
    return socket;
};
