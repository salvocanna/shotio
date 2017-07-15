import ChromeRemoteInterface from 'chrome-remote-interface'

// async function connect() {
//     // connect to endpoint
//     const client = await ChromeRemoteInterface();
//
//     // extract domains
//     const {Network, Page} = client;
//
//     // enable events then start!
//     await Page.enable();
//     await Network.enable();
//
//     return client;
// }
//


// const {data} = await Page.captureScreenshot();
// fs.writeFileSync('scrot.png', Buffer.from(data, 'base64'));


/**
 * Will return base64 data of the image.
 *
 * @param url
 * @param eventCallback
 * @returns {Promise.<*>}
 */
export async function loadPage(url, eventCallback) {

    try {
        eventCallback('Connecting');

        const client = await ChromeRemoteInterface({
            host: 'chrome'
        });

        client.on('event', function (message) {
            //if (message.method === 'Network.') {
                console.log(message.method, message.params.timestamp);
            //}
        });

        const {Network, Page} = client;

        // enable events then start!
        await Promise.all([Network.enable(), Page.enable()]);

        eventCallback('Connected');

        Network.clearBrowserCache();
        Network.clearBrowserCookies();
        Network.setCacheDisabled(true);

        // setup handlers
        // Network.requestWillBeSent(params => {
        // });

        // Network.responseReceived(params => {
        //     eventCallback('NetworkResponseReceived', { params });
        // })

        console.log('navigating ... ', url);
        await Page.navigate({url: url});
        await Page.loadEventFired();
        // await Page.loadEventFired(() => {
        //     eventCallback('PageLoad');
        // });
        console.log('navigated! ... ');
        const { data: screenshotData } = await Page.captureScreenshot();

        //const data = Buffer.from(screenshotData, 'base64');

        await client.close();
        console.log('closed');
        return 'NO_DATA';
    } catch (err) {
        console.error(err);
        //eventCallback('error');
    }

    return null;
}


export default {
}