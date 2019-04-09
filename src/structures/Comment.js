'use strict'

const Base = require('./Base')

/**
 * Represents a comment for a anime/manga
 */
class Comment extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the comment
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the content this comment was posted at
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.tid) }

    
    /**
     * The type of this comment
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The state of this comment
     * @type {number}
     * @readonly
     */
    get state() { return parseInt(this.data.state) }

    /**
     * Different types of additional data
     * @type {object}
     * @readonly
     */
    get additionalData() { return this.data.data }

    /**
     * The actual text of this comment
     * @type {string}
     * @readonly
     */
    get text() { return this.data.comment }

    /**
     * The rating the commenter placed for this content
     * @returns {number}
     * @readonly
     */
    get contentRating() { return parseInt(this.data.rating) }

    /**
     * The latest episode watched by the commenter
     * @returns {number}
     * @readonly
     */
    get latestEpisode() { return parseInt(this.data.episode) }

    /**
     * The amount of 'likes' this comment got
     * @returns {number}
     * @readonly
     */
    get rating() { return parseInt(this.data.positive) }
}

module.exports = Comment