'use strict'

/**
 * Represents any type of proxer.me tag
 */
class Tag {
    constructor(data) {
        this.data = data
    }

    /**
     * The id of the tag
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The type of the tag
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The name of the tag
     * @type {string}
     * @readonly
     */
    get name() { return this.data.tag }

    /**
     * A small description for this tag
     * @type {string}
     * @readonly
     */
    get description() { return this.data.description }

    /**
     * Which subtype this tag belongs to
     * @type {string}
     * @readonly
     */
    get subType() { return this.data.subtype }
}

module.exports = Tag