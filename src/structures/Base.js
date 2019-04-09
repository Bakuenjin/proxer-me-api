'use strict'

/**
 * The base for every class that needs access to the APIManager
 */
class Base {
    constructor(client) {
        Object.defineProperty(this, 'client', { value: client })
    }
}

module.exports = Base