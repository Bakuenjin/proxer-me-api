'use strict'

/**
 * Represents a voting on a content.
 */
class Vote {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the vote
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the user that submitted the comment
     * @type {number}
     * @readonly
     */
    get userId() { return parseInt(this.data.uid) }

    /**
     * The unique ID of the comment
     * @type {number}
     * @readonly
     */
    get commentId() { return parseInt(this.data.kid) }

    /**
     * The name of the entry this comment vote was casted on
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The name of the user
     * @type {string}
     * @readonly
     */
    get userName() { return this.data.username }

    /**
     * The actual comment content
     * @type {string}
     * @readonly
     */
    get commentText() { return this.data.comment }

    /**
     * The rating for the content
     * @type {number}
     * @readonly
     */
    get rating() { return parseInt(this.data.rating) }

    /**
     * The voting type
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }
}

module.exports = Vote