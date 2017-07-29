/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

//const Runner = require('./runner');
import Runner from 'lighthouse/lighthouse-core/runner'
//const log = require('lighthouse-logger');
import log from 'lighthouse-logger';
//const ChromeProtocol = require('./gather/connections/cri.js');
import CriConnection from './cri'
//const Config = require('./config/config');
import Config from 'lighthouse/lighthouse-core/config/config';


export const traceCategories = require('lighthouse/lighthouse-core/gather/driver').traceCategories;
export const Audit = require('lighthouse/lighthouse-core/audits/audit');
export const Gatherer = require('lighthouse/lighthouse-core/gather/gatherers/gatherer');
export const getAuditList = Runner.getAuditList;



/**
 * The relationship between these root modules:
 *
 *   index.js  - the require('lighthouse') hook for Node modules (including the CLI)
 *
 *   runner.js - marshalls the actions that must be taken (Gather / Audit)
 *               config file is used to determine which of these actions are needed
 *
 *   lighthouse-cli \
 *                   -- index.js  \
 *                                 ----- runner.js ----> [Gather / Audit]
 *           lighthouse-extension /
 *
 */


// https://stackoverflow.com/questions/36577683/babel-error-class-constructor-foo-cannot-be-invoked-without-new
export default function(url, flags = {}, configJSON) {
    const startTime = Date.now();

        // set logging preferences, assume quiet
        flags.logLevel = flags.logLevel || 'error';
        log.setLevel(flags.logLevel);

        // Use ConfigParser to generate a valid config file
        const config = new Config(configJSON, flags.configPath);

        //console.log('ChromeProtocol', CriConnection);
        console.log('ChromeProtocol', CriConnection);
        console.log('ChromeProtocol', CriConnection);

        const connection = new CriConnection(flags);
        console.log('xxxxChromeProtocol', CriConnection);
        // kick off a lighthouse run
        return Runner.run(connection, {url, flags, config})
            .then(lighthouseResults => {
                // Annotate with time to run lighthouse.
                const endTime = Date.now();
                lighthouseResults.timing = lighthouseResults.timing || {};
                lighthouseResults.timing.total = endTime - startTime;

                return lighthouseResults;
            });

};


//module.exports.traceCategories = require('./gather/driver').traceCategories;
//module.exports.Audit = require('./audits/audit');
//module.exports.Gatherer = require('./gather/gatherers/gatherer');