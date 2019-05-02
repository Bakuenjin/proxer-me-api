'use strict'

const BaseAPI = require('./BaseAPI')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').APPS_API

/**
 * Represents the apps 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class AppsAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Sends an error log to the Proxer.me server for a specified app.
     * @param {number} id - The unique ID of the app this error report is for.
     * @param {string} message - The message to log
     * @param {object} optionalValues - The optional params
     * @param {boolean} [optionalValues.anonymous] - (If a user is logged in) Do you want to send this report anonymous?
     * @param {boolean} [optionalValues.silent] - Should this report be silent or generate a notification for the developer?
     */
    async errorLog(id, message, optionalValues = {}) {
        optionalValues.id = id
        optionalValues.message = message
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.ERROR_LOG, optionalValues)
    }
}

module.exports = AppsAPI