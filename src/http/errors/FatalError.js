'use strict'

class FatalError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, FatalError)
        this.name = "FatalError"
    }
}

module.exports = FatalError