'use strict'

const Base = require('./Base')
const User = require('./User')

class ChatUser extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the chat user
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.uid) }

    /**
     * The name of the chat user
     * @type {string}
     * @readonly
     */
    get name() { return this.data.username }

    /**
     * The avatar of the chat user
     * @type {string}
     * @readonly
     */
    get avatar() { return this.data.avatar }

    /**
     * The status of the chat user
     * @type {string}
     * @readonly
     */
    get status() { return this.data.status }

    /**
     * Is this user a chat moderator?
     * @type {boolean}
     * @readonly
     */
    get isModerator() { return this.data.mod == 1 }

    /**
     * Gathers information about the user
     * @returns {Promise<User>}
     */
    getInfo() { return this.client.getUserById(this.id) }
}

module.exports = ChatUser