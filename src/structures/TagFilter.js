'use strict'

/**
 * Represents an object that holds the results of filtering a string for its containing tags.
 */
class TagFilter {
    constructor(data) {
        this.data = data
    }

    /**
     * All the valid tags from the search string without a minus sign.
     * @type {number[]}
     * @readonly
     */
    get positiveTagIDs() { return this.data.tags.map(it => parseInt(it)) }

    /**
     * All valid tags from the search string with a minus sign.
     * @type {number[]}
     * @readonly
     */
    get negativeTagIDs() { return this.data.notags.map(it => parseInt(it)) }
}

module.exports = TagFilter