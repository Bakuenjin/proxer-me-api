'use strict'

const { API_BASE } = require('../util/Constants')

const request = require('./RequestHandler')
const requestBuilder = require('./RequestBuilder')
const UrlBuilder = require('./UrlBuilder')

/**
 * The HttpClient to cast `post` or `get` API calls to the Proxer.me API.
 */
class HttpClient {
    constructor(headerSettings = { apiKey: false, apiToken: false, userAgent: "" }) {
        this.urlBuilder = new UrlBuilder(API_BASE)
        this.defaultHeaders = { 
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": (headerSettings.userAgent ? headerSettings.userAgent : 'ProxerLibNodeJs')
        }

        if (headerSettings.apiKey) this.defaultHeaders["proxer-api-key"] = headerSettings.apiKey
        else this.defaultHeaders["proxer-api-testmode"] = 1

        if(headerSettings.apiToken) this.defaultHeaders['proxer-api-token'] = headerSettings.apiToken
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

module.exports = HttpClient