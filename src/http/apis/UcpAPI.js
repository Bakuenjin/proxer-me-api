'use strict'

const BaseAPI = require('./BaseAPI')

class UcpAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

}

module.exports = UcpAPI