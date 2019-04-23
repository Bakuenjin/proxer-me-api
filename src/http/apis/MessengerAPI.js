'use strict'

const BaseAPI = require('./BaseAPI')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').MESSENGER_API

/**
 * Represents the messenger 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class MessengerAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    async constants() {
        
    }
}

module.exports = MessengerAPI