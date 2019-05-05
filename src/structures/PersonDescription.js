'use strict'

/**
 * Represents a desciption area of a person.
 */
class PersonDescription {
    constructor(data) {
        this.data = data
    }

    /**
     * The area of the description.
     * 
     * Possible areas are:
     * * `intro` - Gives a brief introduction for this person.
     * * `biography` - Detailed information about this persons life.
     * * `awards` - Information about awards this person has won.
     * * `trivia` - Small facts about this person.
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

module.exports = PersonDescription