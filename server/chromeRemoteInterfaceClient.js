import ChromeRemoteInterface from 'chrome-remote-interface';

async function connect() {
    // connect to endpoint
    const client = await ChromeRemoteInterface();

    // extract domains
    const {Network, Page} = client;

    // enable events then start!
    await Page.enable();
    await Network.enable();

    return client;
}



// const {data} = await Page.captureScreenshot();
// fs.writeFileSync('scrot.png', Buffer.from(data, 'base64'));


/**
 * Will return base64 data of the image.
 *
 * @param url
 * @returns {Promise.<*>}
 */
async function captureScreenshot(url) {
    try {
        const client = await connect();

        const {Network, Page} = client;

        // setup handlers
        Network.requestWillBeSent(params => {
            console.log('sending ... ', params.request.url);
        });

        await Page.navigate({url: url});
        // await Page.loadEventFired();
        await Page.loadEventFired();

        const { data: screenshotData } = await Page.captureScreenshot();

        //const data = Buffer.from(screenshotData, 'base64');

        await client.close();

        return screenshotData;
    } catch (err) {
        console.error(err);
    }

    return null;
}


export default {
    captureScreenshot: (url) => captureScreenshot(url)
}