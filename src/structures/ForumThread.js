'use strict'

const ForumPost = require('./ForumPost')

/**
 * Represents a full forum thread.
 */
class ForumThread {
    constructor( data) {
        this.data = data
    }

    /**
     * The unique ID of the forum thread
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the forum category
     * @type {number}
     * @readonly
     */
    get categoryId() { return parseInt(this.data.category_id) }

    /**
     * The name of the category
     * @type {string}
     * @readonly
     */
    get categoryName() { return this.data.category_name }

    /**
     * The subject of this thread
     * @type {string}
     * @readonly
     */
    get subject() { return this.data.subject }

    /**
     * Is this thread locked?
     * @type {string}
     * @readonly
     */
    get locked() { return this.data.locked }

    /**
     * The amount of posts in this thread
     * @type {number}
     * @readonly
     */
    get postCount() { return parseInt(this.data.post_count) }

    /**
     * The amount of views this thread has
     * @type {number}
     * @readonly
     */
    get views() { return parseInt(this.data.hits) }

    /**
     * The creating time of this thread
     * @type {Date}
     * @readonly
     */
    get creationTimestamp() { return new Date(parseInt(this.data.first_post_time) * 1000) }

    /**
     * The time when this thread was last active (latest new post / modification)
     * @type {Date}
     * @readonly
     */
    get latestTimestamp() { return new Date(parseInt(this.data.last_post_time) * 1000) }

    /**
     * The posts of this thread
     * @type {ForumPost[]}
     * @readonly
     */
    get posts() { return this.data.posts }
}

module.exports = ForumThread