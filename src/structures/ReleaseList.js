'use strict'

/**
 * Represents any kind of list of releases of any type of content (anime / manga).
 */
class ReleaseList {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the content that contains this list of episode / chapter release
     * @type {number}
     * @readonly
     */
    get contentId() { return this.data.id }

    /**
     * The number of the first release of this list
     * @type {number}
     * @readonly
     */
    get startNumber() { return this.data.start }

    /**
     * The number of the last release of this list
     * @type {number}
     * @readonly
     */
    get endNumber() { return this.data.end }

    /**
     * The category of the content that contains this list
     * @type {string}
     * @readonly
     */
    get category() { return this.data.kat }

    /**
     * The languages of the releases 
     * @type {string[]}
     * @readonly
     */
    get languages() { return this.data.lang }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * The progress of the currently logged in user
     * @type {number}
     * @readonly
     */
    get userProgress() { return this.data.state }

}

module.exports = ReleaseList