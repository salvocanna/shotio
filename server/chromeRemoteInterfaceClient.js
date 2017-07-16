import ChromeRemoteInterface from 'chrome-remote-interface'

/**
 * Will return base64 data of the image.
 *
 * @param url string
 * @param width int
 * @param height int
 * @param fullPage bool
 * @param userAgent string
 * @param eventCallback func
 *
 * @returns {Promise.<*>}
 */
export async function loadPage({url, width = 1440, height = 900, fullPage = true, userAgent = null, eventCallback = () => true}) {

    try {
        eventCallback('Connecting');

        const client = await ChromeRemoteInterface({
            host: 'chrome'
        });

        client.on('event', function (message) {
            //if (message.method === 'Network.') {
                console.log(message.method, message.params.timestamp);
                //eventCallback('Event', message);
        });

        const {Network, Page, DOM, Emulation} = client;

        // Set up viewport resolution, etc.
        const deviceMetrics = {
            width,
            height,
            deviceScaleFactor: 0,
            mobile: false,
            fitWindow: false,
        };

        await Emulation.setDeviceMetricsOverride(deviceMetrics);
        await Emulation.setVisibleSize({
            width: width,
            height: height,
        });

        // Do all of them and get back asap
        await Promise.all([
            Network.enable(),
            Page.enable(),
            DOM.enable(),
            userAgent ? Network.setUserAgentOverride({ userAgent }) : null
        ]);

        eventCallback('Connected');

        //Network.clearBrowserCache();
        //Network.clearBrowserCookies();
        Network.setCacheDisabled(true);

        //console.log('navigating ... ', url);
        await Page.navigate({url: url});
        await Page.loadEventFired();

        console.log('Navigated! ... ');

        // If the `full` CLI option was passed, we need to measure the height of
        // the rendered page and use Emulation.setVisibleSize
        if (fullPage) {
            const {root: {nodeId: documentNodeId}} = await DOM.getDocument();
            const {nodeId: bodyNodeId} = await DOM.querySelector({
                selector: 'body',
                nodeId: documentNodeId,
            });
            const {model: {height: fullHeight}} = await DOM.getBoxModel({nodeId: bodyNodeId});

            console.info("got height", fullHeight);

            await Emulation.setVisibleSize({width: width, height: fullHeight});
            // This forceViewport call ensures that content outside the viewport is
            // rendered, otherwise it shows up as grey. Possibly a bug?
            await Emulation.forceViewport({x: 0, y: 0, scale: 1});
        }

        const { data: screenshotData } = await Page.captureScreenshot({
            format: 'png'
        });

        //const data = Buffer.from(screenshotData, 'base64');
        await client.close();

        console.log('Connection closed');

        eventCallback('Screenshot', screenshotData);

        // Should I even care about a return atm?
        return 'NO_DATA';
    } catch (err) {
        console.error(err);
        //eventCallback('error');
    } finally {
        if (typeof client !== 'undefined' && typeof client.close === 'function') {
            await client.close();
        }

        return null;
    }

    return null;
}


export default {
}