'use strict'

/**
 * Represents a genre from an anime or manga.
 */
class Genre {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of this tag.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.tid) }

    /**
     * The unique ID of the content this tag is connected with.
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.id) }

    /**
     * The timestamp in this format:
     * 
     * `YYYY-MM-DD HH:MM:SS`
     * @type {string}
     * @readonly
     */
    get timestamp() { return this.data.timestamp }

    /**
     * The name of this tag.
     * @type {string}
     * @readonly
     */
    get name() { return this.data.tag }

    /**
     * A small description about this tag.
     * @type {string}
     * @readonly
     */
    get description() { return this.data.description }
}

module.exports = Genre