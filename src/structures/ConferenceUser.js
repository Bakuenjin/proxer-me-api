'use strict'

/**
 * Represents a conference user
 */
class ConferenceUser extends Base {
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
     * The link to the avatar of this user
     * @type {string}
     * @readonly
     */
    get avatar() { return `cdn.proxer.me/avatar/tn/${this.data.avatar}` }
}

module.exports = ConferenceUser