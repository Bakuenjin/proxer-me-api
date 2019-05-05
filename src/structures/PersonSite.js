'use strict'

/**
 * Represents a website of a person.
 */
class PersonSite {
    constructor(data) {
        this.data = data
    }

    /**
     * The type of the website.
     * * `website` - A unique website of this person.
     * * `facebook` - The facebook page of this person.
     * * `twitter` - The twitter page of this person.
     * * `youtube` - The youtube channel of this person.
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The actual link to the website.
     * @type {string}
     * @readonly
     */
    get link() { return this.data.link }
}

module.exports = PersonSite