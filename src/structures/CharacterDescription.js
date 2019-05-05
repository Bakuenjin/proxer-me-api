'use strict'

/**
 * Represents a description area of a character.
 */
class CharacterDescription {
    constructor(data) {
        this.data = data
    }

    /**
     * The area of the description.
     * 
     * Possible areas are:
     * * `intro` - Gives a brief introduction for this character.
     * * `appearance` - Detailed information about this character appearance.
     * * `personality` - Information about this character personality and behaviour.
     * * `skills` - What abilities does this character have.
     * * `past` - A summary of the characters past.
     * * `present` - What this characters current situation is.
     * * `trivia` - Small facts about this character.
     * @type {string}
     * @readonly
     */
    get subject() { return this.data.subject }

    /**
     * The actual content of this discription.
     * @type {string}
     * @readonly
     */
    get text() { return this.data.text }

    /**
     * The language of this text:
     * 
     * Either `en` (english) or `de` (german).
     * @type {string}
     * @readonly
     */
    get language() { return this.data.language }
}

module.exports = CharacterDescription