'use strict'

const Avatar = require('./Avatar')

/**
 * Represents a comment for a anime/manga
 */
class Comment {
    constructor(data) {
        this.data = data
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
     * The unique ID of the user who posted this comment
     * @type {number}
     * @readonly
     */
    get userId() { return parseInt(this.data.uid) }

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
     * @type {number}
     * @readonly
     */
    get contentRating() { return parseInt(this.data.rating) }

    /**
     * The latest episode watched by the commenter
     * @type {number}
     * @readonly
     */
    get latestEpisode() { return parseInt(this.data.episode) }

    /**
     * The amount of 'likes' this comment got
     * @type {number}
     * @readonly
     */
    get rating() { return parseInt(this.data.positive) }

    /**
     * The timestamp of the creation / latest edit of this comment
     * @type {Date}
     * @readonly
     */
    get timestamp() { return new Date(parseInt(this.data.timestamp) * 1000) }

    /**
     * The name of the user that submitted this comment
     * @type {string}
     * @readonly
     */
    get username() { return this.data.username }

    /**
     * The avatar of the user that submitted this comment
     * @type {string}
     * @readonly
     */
    get avatar() { return new Avatar(this.data.avatar) }
}

module.exports = Comment