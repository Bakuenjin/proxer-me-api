'use strict'

const Base = require('./Base')
const User = require('./User')
const ConferenceUser = require('./ConferenceUser')

/**
 * Represents details for a specified conference.
 * @extends {Base}
 */
class ConferenceDetails extends Base {
    constructor(client, details, users) {
        super(client)
        if (data) this.data = details
        if (users) this.users = users
    }

    /**
     * The title of this conference
     * @type {string}
     * @readonly
     */
    get title() { return this.data.topic }

    /**
     * The amount of users in this conference
     * @type {number}
     * @readonly
     */
    get memberAmount() { return parseInt(this.data.count) }

    /**
     * The timestamp of the latest conference message
     * @type {Date}
     * @readonly
     */
    get latestTimestamp() { return new Date(parseInt(this.data.timestamp_end) * 1000) }

    /**
     * The unique ID of this conferences leader
     * @type {number}
     * @readonly
     */
    get leaderId() { return parseInt(this.data.leader) }

    /**
     * The members of this conference
     * @type {ConferenceUser[]}
     * @readonly
     */
    get members() { return this.users }

    /**
     * Gathers information about the conference leader.
     * @returns {Promise<User>}
     */
    getLeaderUser() { return this.client.getUserById(this.leaderId) }
}

module.exports = ConferenceDetails