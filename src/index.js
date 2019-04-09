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
        return new Client(apiKey)
    }

    /**
     * Returns the constants that should be used to form params
     */
    static getConstants() {
        return require('./util/Constants').paramConstants
    }
}

module.exports = Proxer