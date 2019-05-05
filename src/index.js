'use strict'

const APIManager = require('./http/APIManager')
const { paramConstants } = require('./util/Constants')

/**
 * Connects to the Proxer.me API.
 * 
 * @example
 * // Connect with an API key
 * const client = ProxerMe.connect({apiKey = "YOUR_KEY"})
 * 
 * // Connect with an API key and a logged in user
 * const client = ProxerMe.connect({apiKey = "YOUR_KEY", apiToken = "USER_TOKEN"})
 * 
 * // Connect in test mode
 * const client = ProxerMe.connect()
 * @param {object} connectionOptions - Contains details about the headers.
 * 
 * When **customHttpClient** is set, eveything else gets ignored and the customHttpClient is used.
 * @param {string} [connectionOptions.apiKey] - The unique API key that allows you to access the official Proxer.me API.
 * 
 * If you don't have a valid API key and leave this blank, the Proxer.me API will be used in test mode with very limited access.
 * In case you want a valid API key head over to https://proxer.me/wiki/Proxer_API.
 * @param {string} [connectionOptions.apiToken] - The token used for communicating with the Proxer.me API as a user.
 * 
 * If no user is logged in, the UCP API should not be used.
 * @param {string} [connectionOptions.userAgent] - This overrides the default userAgent set by the HttpClient.
 * 
 * This should be used to identify the app you are building. 
 * It makes it easier for Proxer.me to analysize what traffic is coming from which application.
 * @param {HttpClient} [connectionOptions.customHttpClient] - **Overrides the default HttpClient!**
 * 
 * Defining a custom httpClient will result in all other parameters to be ignored.
 * This might be needed if your application needs to set some custom headers or casts to a mock server for testing.
 */
function connect(connectionOptions = {}) {
    return new APIManager(connectionOptions)
}

exports.connect = connect
exports.CONSTANTS = paramConstants