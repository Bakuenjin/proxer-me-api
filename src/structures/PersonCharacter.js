'use strict'

/**
 * Represents the connection a person has to a character.
 */
class PersonCharacter {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the character.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.cid) }

    /**
     * The type of connection the person and character has.
     * 
     * E.g `seiyuu` for the voice actor.
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The language of the character.
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
     * The name of the character.
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }
}

module.exports = PersonCharacter