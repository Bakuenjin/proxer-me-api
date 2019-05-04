'use strict'

/**
 * Represents a single notification for a user.
 */
class Notification {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the notification
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the notification type (reminder, etc.)
     * @type {number}
     * @readonly
     */
    get notificationTypeId() { return parseInt(this.data.tid) }

    /**
     * The type of the notification
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The link to the proxer webpage
     * @type {string}
     * @readonly
     */
    get link() { return this.data.link }

    /**
     * The notification text
     * @type {string}
     * @readonly
     */
    get text() { return this.data.linktext }

    /**
     * Additional information (if there is any)
     * @type {string}
     * @readonly
     */
    get description() { return this.data.description }

    /**
     * The notifications timestamp
     * @type {Date}
     * @readonly
     */
    get time() { return new Date(parseInt(this.data.time) * 1000) }
}

module.exports = Notification