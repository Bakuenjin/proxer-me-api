'use strict'

const Avatar = require('./Avatar')

/**
 * Represents a single post on a forum thread.
 */
class ForumPost {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the post
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the parent post
     * @type {number}
     * @readonly
     */
    get parentId() { return parseInt(this.data.pid) }

    /**
     * The unique ID of the user that submitted this post
     * @type {number}
     * @readonly
     */
    get userId() { return parseInt(this.data.uid) }

    /**
     * The name of the user
     * @type {string}
     * @readonly
     */
    get username() { return this.data.username }

    /**
     * The avatar of the user
     * @type {Avatar}
     * @readonly
     */
    get avatar() { return new Avatar(this.data.avatar) }

    /**
     * The signature of the user
     * @type {string}
     * @readonly
     */
    get signature() { return this.data.signature }

    /**
     * The timestamp this post was submitted
     * @type {Date}
     * @readonly
     */
    get timestamp() { return new Date(parseInt(this.data.time) * 1000) }

    /**
     * The unique ID of the user that modified this post last
     * @type {number}
     * @readonly
     */
    get modifierId() { return parseInt(this.data.modified_by) }

    /**
     * The name of the modifier user
     * @type {string}
     * @readonly
     */
    get modifierName() { return this.data.modified_name }

    /**
     * The timestamp this post was modified last
     * @type {Date}
     * @readonly
     */
    get modifiedTimestamp() { return new Date(parseInt(this.data.modified_time) * 1000) }

    /**
     * The reason this post was modified
     * @type {string}
     * @readonly
     */
    get modifiedReason() { return this.data.modified_reason }

    /**
     * The text of this post
     * @type {string}
     * @readonly
     */
    get text() { return this.data.message }

    /**
     * The 'thank you' amount of this post
     * @type {number}
     * @readonly
     */
    get thankYouCount() { return parseInt(this.data.thanks_you_count) }
}

module.exports = ForumPost