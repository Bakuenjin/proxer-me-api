'use strict'

const BaseAPI = require('./BaseAPI')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').INFO_API

/**
 * Represents the apps 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class InfoAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    
}

module.exports = InfoAPI