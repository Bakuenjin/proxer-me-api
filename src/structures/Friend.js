'use strict'

const Avatar = require('./Avatar')

/**
 * Represents a friend of a user.
 */
class Friend {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the user this friend represents
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.uid) }

    /**
     * The username of the fried
     * @type {string}
     * @readonly
     */
    get username() { return this.data.username }

    /**
     * The date this user was added as a friend
     * @type {Date}
     * @readonly
     */
    get addedTimestamp() { return new Date(parseInt(this.data.date) * 1000) }

    /**
     * A small description of this friend
     * @type {string}
     * @readonly
     */
    get description() { return this.data.description }

    /**
     * The avatar of this user
     * @type {string}
     * @readonly
     */
    get avatar() { return new Avatar(this.data.avatar) }
}

module.exports = Friend