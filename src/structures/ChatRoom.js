'use strict'

/**
 * Represents a chat room in the proxer.me chat
 */
class ChatRoom {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the chat room
     * @type {number}
     * @readonly
     */
    get id() { return this.data.id }

    /**
     * The name of this chat
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The topic of this chat
     * @type {string}
     * @readonly
     */
    get topic() { return this.data.topic }

    /**
     * Is this chat read-only?
     * @type {boolean}
     * @readonly
     */
    get isReadonly() { return this.data.flag_readonly }

    /**
     * Is this chat diabled?
     * @type {boolean}
     * @readonly
     */
    get isDisabled() { return this.data.flag_disabled }
}

module.exports = ChatRoom