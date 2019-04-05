const path = require('path')

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
}

module.exports = UrlBuilder