'use strict'

const Base = require('./Base')

/**
 * Represents a forum thread from the proxer.me forums
 */
class ContentThread extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the forum thread
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the forum category this thread belongs to
     * @type {number}
     * @readonly
     */
    get categoryId() { return parseInt(this.data.category_id) }

    /**
     * The name of the forum category this thread belongs to
     * @type {string}
     * @readonly
     */
    get categoryName() { return this.data.category_name }

    /**
     * The title of the forum thread
     * @type {string}
     * @readonly
     */
    get title() { return this.data.subject }

    /**
     * The amount of posts this thread contains
     * @type {number}
     * @readonly
     */
    get postsAmount() { return parseInt(this.data.posts) }

    /**
     * The amount of views this thread accumulated
     * @type {number}
     * @readonly
     */
    get hits() { return parseInt(this.data.hits) }

    /**
     * The timestamp this thread was created at.
     * @type {Date}
     * @readonly
     */
    get creationTimestamp() { return new Date(parseInt(this.data.first_post_time) * 1000) }

    /**
     * The unique ID of the user that created this thread
     * @type {number}
     * @readonly
     */
    get creatorId() { return parseInt(this.data.first_post_userid) }

    /**
     * The name of the user that created this thread
     * @type {string}
     * @readonly
     */
    get creatorName() { return this.data.first_post_guest_name }

    /**
     * The timestamp for the latest post in this thread
     * @type {Date}
     * @readonly
     */
    get lastPostTimestamp() { return new Date(parseInt(this.data.last_post_time) * 1000) }

    /**
     * The unique ID of the user that submitted the last post in this thread
     * @type {number}
     * @readonly
     */
    get lastPosterId() { return parseInt(this.data.last_post_userid) }

    /**
     * The name of the user that submitted the last post in this thread
     * @type {string}
     * @readonly
     */
    get lastPosterName() { return this.data.last_post_guest_name }

}

module.exports = ContentThread