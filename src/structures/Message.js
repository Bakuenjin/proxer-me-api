'use strict'

const Base = require('./Base')
const User = require('./User')

class Message extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of this message
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.message_id) }

    /**
     * The unique ID of this messages conferences
     * @type {number}
     * @readonly
     */
    get conferenceId() { return parseInt(this.data.conference_id) }

    /**
     * The unique ID of this messages author
     * @type {number}
     * @readonly
     */
    get userId() { return parseInt(this.data.user_id) }

    /**
     * The name of this messages author
     * @type {string}
     * @readonly
     */
    get username() { return this.data.username }

    /**
     * The actual message text
     * @type {string}
     * @readonly
     */
    get text() { return this.data.message }

    /**
     * If this message contains a command, this returns the command
     * @type {string}
     * @readonly
     */
    get command() { return (this.data.action ? this.data.action : null) }

    /**
     * The timestamp when this message was sent
     * @type {Date}
     * @readonly
     */
    get timestamp() { return new Date(parseInt(this.data.timestamp) * 1000) }

    /**
     * The device this message was submitted with
     * @type {string}
     * @readonly
     */
    get device() { return this.data.device }

    /**
     * Gathers information about the user that submitted this message
     * @returns {Promise<User>}
     */
    getUser() { return this.client.getUserById(this.userId) }
}

module.exports = Message