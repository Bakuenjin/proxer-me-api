'use strict'

/**
 * Represents any kind of character/person that has a connection to anime/manga
 */
class Individual {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the individual
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the individual
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The text of the individual
     * @type {string}
     * @readonly
     */
    get text() { return this.data.text }
}

module.exports = Individual