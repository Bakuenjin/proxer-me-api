'use strict'

/**
 * Represents a name of a content.
 */
class Name {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the name.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the content.
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.eid) }

    /**
     * The type of the name.
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The actual name text.
     * @type {string}
     * @readonly
     */
    get value() { return this.data.name }
}

module.exports = Name