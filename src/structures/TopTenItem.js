'use strict'

/**
 * Represents a top ten item of somebodies top ten.
 */
class TopTenItem {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of this top ten content element
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.eid) }

    /**
     * The name of the top ten content
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The category of the top ten content
     * @type {string}
     * @readonly
     */
    get category() { return this.data.kat }

    /**
     * The medium of the top ten content
     * @type {string}
     * @readonly
     */
    get medium() { return this.data.medium }
}

module.exports = TopTenItem