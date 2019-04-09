'use strict'

const Client = require('./structures/Client')

/**
 * The entry point to the module
 */
class Proxer {

    /**
    * Connect to the proxer.me API
    * @param {string} apiKey - The api key to connect to the API with
    * @returns {Client}
    */
    static connect(apiKey) {
        return new Client({ apiKey: apiKey })
    }

    /**
     * NO API KEY REQUIRED! Connects to the proxer.me API in test mode.
     * @returns {Client}
     */
    static testMode() {
        return new Client({ testMode: true })
    }

    /**
     * Returns the constants that should be used to form params
     */
    static getConstants() {
        return require('./util/Constants').paramConstants
    }
}

module.exports = Proxer