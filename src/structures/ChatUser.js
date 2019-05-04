'use strict'

const Avatar = require('./Avatar')

/**
 * Represents a user of the Proxer.me chat
 */
class ChatUser {
    constructor(data) {
        this.data = data
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
     * @type {Avatar}
     * @readonly
     */
    get avatar() { return new Avatar(this.data.avatar) }

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
}

module.exports = ChatUser