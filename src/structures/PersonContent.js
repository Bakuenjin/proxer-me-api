'use strict'

/**
 * Represents a content (anime or manga) this person has a connection to.
 */
class PersonContent {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of this content.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.eid) }

    /**
     * The type of connection from the person to this content.
     * * `author` - This person is the author of the content.
     * * `art` - This person did (some of) the art.
     * * `author-art` - Author and artist of this content.
     * * `director` - The director for this content.
     * * `original-creator` - The person that had the original idea.
     * * `misc` - Anything else.
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The name of the content.
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }
}

module.exports = PersonContent