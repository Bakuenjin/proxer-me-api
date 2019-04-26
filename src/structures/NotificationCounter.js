'use strict'

class NotificationCounter {
    constructor(data) {
        this.data = data
    }

    /**
     * The amount of notifications of the old PN system (deprecated).
     * @type {number}
     * @readonly
     */
    get oldPNs() { return this.data[1] }

    /**
     * The amount of notifications of the new PN system.
     * @type {number}
     * @readonly
     */
    get newPNs() { return this.data[2] }

    /**
     * The amount of friend requests.
     * @type {number}
     * @readonly
     */
    get friendRequests() { return this.data[3] }

    /**
     * The amount of news.
     * @type {number}
     * @readonly
     */
    get news() { return this.data[4] }

    /**
     * The amount of notifications.
     * @type {number}
     * @readonly
     */
    get notifications() { return this.data[5] }
}

module.exports = NotificationCounter