'use strict'

const Base = require('./Base')
const User = require('./User')

/**
 * Represents a friend of a user.
 * @extends {Base}
 */
class Friend extends Base {
    constructor(client, data) {
        super(client)
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
    get avatar() { return `cdn.proxer.me/avatar/${this.data.avatar}` }

    /**
     * Gathers information about the user that this friend represents.
     * @returns {Promise<User>}
     */
    getUser() { return this.client.getUserById(this.id) }
}

module.exports = Friend