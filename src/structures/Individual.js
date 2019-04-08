'use strict'

class Individual {
    constructor(data) {
        if (data) this.data = data
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