import ChromeRemoteInterface from 'chrome-remote-interface'
import sharp from 'sharp'
import fs from 'fs'

// This will be updated ...
import lighhouse from '../src/libs/lighthouse-index'

// Shhh! We will remove this param from here in another refactoring!
const HOSTNAME = 'chrome';

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

let globalClient = null;


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

    let client;

    try {
        eventCallback('Connecting');

        client = await getClientConnection();

        client.on('event', function (message) {
            //if (message.method === 'Network.') {
                console.log(message.method, message.params.timestamp);
                //eventCallback('Event', message);
        });

        // I'm enabling so much stuff I think it will crash at some point :|
        const { Network, Page, DOM, Emulation, Profiler, Runtime } = client;

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
            Profiler.enable(),
            userAgent ? Network.setUserAgentOverride({ userAgent }) : null
        ]);

        // Seems reasonable for now.
        // await Profiler.setSamplingInterval({interval: 10});

        eventCallback('Connected');

        //Network.clearBrowserCache();
        //Network.clearBrowserCookies();
        Network.setCacheDisabled(true);

        await Profiler.start();

        await Page.navigate({ url });

        await client.on('Page.loadEventFired', async _ => {
            // on load we'll start profiling, kick off the test, and finish
            await sleep(600);
            const data = await Profiler.stop();
            // saveProfile(data);
        });

        // Technically we could remove the event up there and move it down here..
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

        await client.close();

        console.log('Connection closed');

        sharp(Buffer.from(screenshotData, 'base64'))
            .resize(1000)
            .jpeg()
            .toBuffer({
                quality: 94,
                progressive: true
            })
            .then(data => eventCallback('Screenshot', {
                success: true,
                format: 'jpeg',
                data: new Buffer(data).toString('base64')
            }))
            .catch(err => eventCallback('Screenshot', { success: false /*, message: err */ }));

        // const res = await lighhouse('https://www.firebox.com', {
        //     host: 'chrome',
        // });

        // console.log(res);

        //doInNewContext(() => {});
    } catch (err) {
        console.error(err);
        //eventCallback('error');
    } finally {
        if (typeof client !== 'undefined' && typeof client.close === 'function') {
            await client.close();
        }
    }
}


// async function doInNewContext(action) {
//     // connect to the DevTools special target
//     const browser = await getClientConnection();
//
//     //const browser = await ChromeRemoteInterface({target: `ws://${HOSTNAME}:9222/devtools/browser`});
//
//     // create a new context
//     const {Target} = browser;
//     const {browserContextId} = await Target.createBrowserContext();
//     const {targetId} = await Target.createTarget({
//         url: 'about:blank',
//         browserContextId
//     });
//
//     console.log("Got target id", targetId);
//     // Here I should really catch that promise reject...
//     await browser.close();
//
//     // connect to the new context
//     const client = await ChromeRemoteInterface({
//         host: HOSTNAME,
//         target: targetId
//     });
//
//     // perform user actions on it
//     try {
//         await action(client);
//     } finally {
//         // cleanup
//         await Target.closeTarget({targetId});
//
//     }
// }

// This is a lazy connection to the browser.
// May be useful to give a few seconds extra to the
// docker container to start/receive/listen to connections
async function getClientConnection() {
    if (globalClient === null) {
        globalClient = await ChromeRemoteInterface({
            host: 'chrome'
        });
    }

    return globalClient;
}

// async function saveProfile(data) {
//     const filename = `/tmp/profile-${Date.now()}.cpuprofile`;
//     const string = JSON.stringify(data.profile, null, 2);
//     fs.writeFileSync(filename, string);
//     console.log('Done! Profile data saved to:', filename);
// }

export default {
}