'use strict'

const Client = require('./structures/Client')
const UserClient = require('./structures/UserClient')

/**
 * The entry point to the module
 */
class Proxer {

    /**
    * Connect to the proxer.me API without beeing logged in.
    * @param {string} apiKey - The api key to connect to the API with
    * @returns {Client}
    */
    static connect(apiKey) {
        return new Client({ apiKey: apiKey })
    }

    /**
     * Logs the user into Proxer.Me and returns a client with elevated rights and functionality.
     * @param {string} apiKey - The key for accessing the API
     * @param {string} username - The username for logging in
     * @param {string} password - The password for logging in
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.secretkey] - The 2FA key for logging in
     * @returns {Promise<UserClient>}
     */
    static login(apiKey, username, password, optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const APIManager = require('./http/APIManager')
            const { classes } = require('./util/Constants')
            const api = new APIManager({apiKey: apiKey})
            optionalValues.username = username
            optionalValues.password = password
            api.post(classes.USER, classes.user.LOGIN, optionalValues).then((data) => {
                const apiParams = { apiKey: apiKey }
                if (data.token) apiParams.apiToken = data.token
                resolve(new UserClient(apiParams, data))
            }).catch(reject)
        })
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