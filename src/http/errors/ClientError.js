'use strict'

class ClientError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, ClientError)
        this.name = "ClientError"
    }
}

module.exports = ClientError