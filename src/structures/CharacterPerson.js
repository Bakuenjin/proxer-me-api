'use strict'

/**
 * Represents a connection a character has to a person.
 */
class CharacterPerson {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the person.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.pid) }

    /**
     * The type of the person.
     * 
     * E.g `seiyuu` as a voice actor.
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The language this person speaks.
     * 
     * Possible values:
     * * `jp` - japanese
     * * `kr` - korean
     * * `zh` - chinese
     * * `de` - german
     * * `en` - english
     * @type {string}
     * @readonly
     */
    get language() { return this.data.language }

    /**
     * The name of the person.
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }
}

module.exports = CharacterPerson