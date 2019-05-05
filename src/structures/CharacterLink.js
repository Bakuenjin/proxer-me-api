'use strict'

/**
 * Represents the connection between a character and a content (anime / manga).
 */
class CharacterLink {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the content.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.eid) }

    /**
     * The type of the character in this content.
     * 
     * Possible values:
     * * `main` - The main character of this content.
     * * `support` - Every other character.
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

module.exports = CharacterLink