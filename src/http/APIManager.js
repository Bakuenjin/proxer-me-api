'use strict'

const Base = require('../structures/Base')
const { API_BASE } = require('../util/Constants')

const request = require('./RequestHandler')
const requestBuilder = require('./RequestBuilder')
const UrlBuilder = require('./UrlBuilder')

class APIManager extends Base {
    constructor(client, apiKey) {
        super(client)
        this.urlBuilder = new UrlBuilder(API_BASE)
        this.defaultHeaders = {
            "proxer-api-key": apiKey,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    /**
     * Constructs an API call via 'POST'.
     * @param {string} urlClass - The first chunk of the API call
     * @param {string} urlFunction - The second chunk of the API call
     * @param {Object} body - The payload for the API call
     * @returns {Promise<Object>}
     */
    post(urlClass, urlFunction, body = {}) {
        const url = this.urlBuilder.build(urlClass, urlFunction)
        const requestParams = requestBuilder.postRequest(this.defaultHeaders, body)
        return request(url, requestParams)
    }

    /**
     * Constructs an API call via 'GET'
     * @param {string} urlClass - The first chunk of the API call
     * @param {string} urlFunction - The second chunk of the API call
     * @param {Object} queryValues - THe query values for the API call
     * @returns {Promise<Object>}
     */
    get(urlClass, urlFunction, queryValues = {}) {
        const url = this.urlBuilder.build(urlClass, urlFunction)
        const queryString = UrlBuilder.generateQueryString(queryValues)

        const queryUrl = url + "?" + queryString
        const requestParams = requestBuilder.getRequest(this.defaultHeaders)
        return request(queryUrl, requestParams)
    }
}

module.exports = APIManager