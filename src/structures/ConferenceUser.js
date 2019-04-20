'use strict'

const Base = require('./Base')
const User = require('./User')

/**
 * Represents a conference user
 * @extends {Base}
 */
class ConferenceUser extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
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

    /**
     * Gathers full information about this user.
     * @returns {Promise<User>}
     */
    getUser() { return this.client.getUserById(this.id) }
}

module.exports = ConferenceUser