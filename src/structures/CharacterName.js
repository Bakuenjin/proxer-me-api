'use strict'

'use strict'

/**
 * Represents a name of a person.
 */
class CharacterName {
    constructor(data) {
        this.data = data
    }

    /**
     * The name of the character.
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * An alternative name (e.g name in japanese characters).
     * @type {string}
     * @readonly
     */
    get alternative() { return this.data.alternative }

    /**
     * The type of the name.
     * 
     * Possible values:
     * * `name` - This name represents the actual name of the person.
     * * `pseudonym` - The name in a different language for example.
     * * `misc` - Everything else.
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * Is this the actual name of the character?
     * @type {boolean}
     * @readonly
     */
    get isMain() { return this.data.display_name === "1" }
}

module.exports = CharacterName