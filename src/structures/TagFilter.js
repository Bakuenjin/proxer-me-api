'use strict'

/**
 * Represents an object that holds the results of filtering a string for its containing tags.
 */
class TagFilter {
    constructor(data) {
        this.data = data
    }

    /**
     * All the valid tags from the search string.
     * @type {number[]}
     * @readonly
     */
    get validTagIDs() { return this.data.tags.map(it => parseInt(it)) }

    /**
     * All the invalid tags from the search string.
     * @type {number[]}
     * @readonly
     */
    get invalidTagIDs() { return this.data.notags.map(it => parseInt(it)) }
}

module.exports = TagFilter