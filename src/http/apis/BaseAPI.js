'use strict'

class BaseAPI {
    constructor(httpClient) {
        Object.defineProperty(this, 'httpClient', { value: httpClient })
    }
}

module.exports = BaseAPI