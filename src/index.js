'use strict'

const Client = require('./structures/Client')
const UserClient = require('./structures/UserClient')
const APIManager = require('./http/APIManager')
const { classes, paramConstants } = require('./util/Constants')

/**
* Connect to the proxer.me API without beeing logged in.
* @param {string} apiKey - The api key to connect to the API with
* @returns {Client}
*/
function connect(apiKey) {
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
function login(apiKey, username, password, optionalValues = {}) {
    return new Promise((resolve, reject) => {
        const api = new APIManager({ apiKey: apiKey })
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
function testMode() {
    return new Client({ testMode: true })
}

/**
 * Returns the constants that should be used to form params
 * @returns {Object}
 */
function getConstants() {
    return paramConstants
}

exports.connect = connect
exports.login = login
exports.testMode = testMode
exports.getConstants = getConstants