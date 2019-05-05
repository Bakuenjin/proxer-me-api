'use strict'

const Avatar = require('./Avatar')

/**
 * Represents a conference user
 */
class ConferenceUser {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of this user
     * @type {number}
     * @readonly
     */
    get id() { return this.data.uid }

    /**
     * The name of this user
     * @type {string}
     * @readonly
     */
    get name() { return this.data.username }

    /**
     * The status of this user
     * @type {string}
     * @readonly
     */
    get status() { return this.data.status }

    /**
     * The avatar of this user
     * @type {Avatar}
     * @readonly
     */
    get avatar() { return new Avatar(this.data.avatar) }
}

module.exports = ConferenceUser