'use strict'

/**
 * Represents the constants from the Proxer.me Messenger.
 */
class MessengerConstants {
    constructor(data) {
        this.data = data
    }

    /**
     * The upper limit of allowed characters in a single message.
     * @type {number}
     * @readonly
     */
    get messageCharacterLimit() { return parseInt(this.data.textCount) }

    /**
     * The upper limit of conference results per page.
     * @type {number}
     * @readonly
     */
    get conferenceLimit() { return parseInt(this.data.conferenceLimit) }

    /**
     * The upper limit of messages result per page.
     * @type {number}
     * @readonly
     */
    get messagesLimit() { return parseInt(this.data.messagesLimit) }

    /**
     * The upper limit of users allowed in a single group conference.
     * @type {number}
     * @readonly
     */
    get userLimit() { return parseInt(this.data.userLimit) }

    /**
     * THe upper limit of allowed characters when defining a conference topic.
     * @type {number}
     * @readonly
     */
    get topicCharacterLimit() { return parseInt(this.data.topicCount) }
}

module.exports = MessengerConstants