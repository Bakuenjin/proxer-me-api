'use strict'

/**
 * Represents a message in a chat room.
 */
class ChatMessage {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the chat message
     * @type {number}
     * @readonly
     */
    get id() { return this.data.id }

    /**
     * The unique ID of the user that submitted this message
     * @type {number}
     * @readonly
     */
    get userId() { return this.data.fromid }

    /**
     * The username of the user that submitted this message
     * @type {string}
     * @readonly
     */
    get username() { return this.data.username }

    /**
     * The avatar of the user that submitted this message
     * @type {string}
     * @readonly
     */
    get avatar() { return  `cdn.proxer.me/avatar/${this.data.avatar}` }

    /**
     * The actual content of the message
     * @type {string}
     * @readonly
     */
    get text() { return this.data.message }

    // TODO - removeMessage? needs to be explained further
    /**
     * An action that should be be executed (?)
     * @type {string}
     * @readonly
     */
    get action() { return this.data.action }

    /**
     * The timestamp when this message was sent
     * @type {Date}
     * @readonly
     */
    get timestamp() { return new Date(parseInt(this.data.timestamp) * 1000) }
}

module.exports = ChatMessage