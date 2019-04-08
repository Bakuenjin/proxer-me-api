'use strict'

class ServerError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, ServerError)
        this.name = "ServerError"
    }
}

module.exports = ServerError