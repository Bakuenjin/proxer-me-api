'use strict'

/**
 * Represents the search result for a specific content in the users personal lists.
 */
class UserListSearchResult {
    constructor(data) {
        /**
         * @private
         */
        this.data = data
    }

    /**
     * Does the searched content exist on any of the users personal lists?
     * @type {boolean}
     * @readonly
     */
    get containsContent() { return this.data.marked }

    /**
     * Does the searched content exist on the 'noted' list?
     * @type {boolean}
     * @readonly
     */
    get isNoted() { return this.data.noted }

    /**
     * Does the searched content exist on the 'finished' list?
     * @type {boolean}
     * @readonly
     */
    get isCompleted() { return this.data.finished }

    /**
     * Does the searched content exist on the 'dropped' list?
     * @type {boolean}
     * @readonly
     */
    get isDropped() { return this.data.canceled }

    /**
     * Is the searched content on of the users favorites?
     * @type {boolean}
     * @readonly
     */
    get isFavorite() { return this.data.topten }

}

module.exports = UserListSearchResult