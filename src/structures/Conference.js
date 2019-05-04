'use strict'

/**
 * Represents a Proxer.me conference between two users.
 */
class Conference {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of this conference
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The title of this conference
     * @type {string}
     * @readonly
     */
    get title() { return this.data.topic }

    /**
     * The custom title choosen by the current user
     * @type {string}
     * @readonly
     */
    get customTopic() { return this.data.topic_custom }

    /**
     * The amount of users in this conference
     * @type {number}
     * @readonly
     */
    get memberAmount() { return parseInt(this.data.count) }

    /**
     * Is this conference a group conference?
     * @type {boolean}
     * @readonly
     */
    get isGroup() { return this.data.group }

    /**
     * Are there no unread messages in this conference?
     * @type {boolean}
     * @readonly
     */
    get readStatus() { return this.data.read }

    /**
     * The amount of unread messages
     * @type {number}
     * @readonly
     */
    get newMessagesAmount() { return parseInt(this.data.read_count) }

    /**
     * The unique ID of the last posted message
     * @type {number}
     * @readonly
     */
    get lastMessageId() { return parseInt(this.data.read_mid) }

    /**
     * The timestamp of the latest posted message in this conference
     * @type {Date}
     * @readonly
     */
    get lastMessageTimestamp() { return new Date(parseInt(this.data.timestamp_end) * 1000) }
}

module.exports = Conference