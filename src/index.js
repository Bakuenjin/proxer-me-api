'use strict'

const Client = require('./structures/Client')

class Proxer {

    /**
    * Connect to the proxer.me API
    * @param {string} - The api key to connect to the API with
    * @returns {Client}
    */
    static connect(apiKey) {
        return new Client(apiKey)
    }
}

module.exports = Proxer