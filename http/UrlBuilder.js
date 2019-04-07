'use strict'

class UrlBuilder {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        if(!baseUrl.endsWith('/'))
            this.baseUrl += "/"
    }

    /**
     * Connects the chunks and the base url.
     * @param  {...any} chunks - API path chunks that should be glued together
     * @returns {string}
     */
    build(...chunks) {
        const chunksString = chunks.join('/')
        return this.baseUrl + chunksString
    }

    /**
     *  Transformes key/value pairs into a valid queryString for an HTTP GET request
     * @param {object} valuePairs - Contains key/value pairs
     * @returns {string}
     */
    static generateQueryString(valuePairs = {}) {
        const queryChunks = []
        for(let key in valuePairs)
            queryChunks.push(`${key}=${valuePairs[key]}`)
        
        return queryChunks.join("&")
    }
}

module.exports = UrlBuilder