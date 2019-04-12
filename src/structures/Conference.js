'use strict'

const Base = require('./Base')
const Message = require('./Message')
const ConferenceDetails = require('./ConferenceDetails')
const ConferneceUser = require('./ConferenceUser')
const { classes } = require('../util/Constants')

class Conference extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
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

    // get image() { return `` }

    getInfos() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.MESSENGER, classes.messenger.CONFERENCE_INFO, body).then((data) => {
                const users = []
                for (let userObj of data.users)
                    users.push(new ConferneceUser(this.client, userObj))
                resolve(new ConferenceDetails(this.client, data.conference, users))
            }).catch(reject)
        })
    }

    /**
     * Gathers the send messages of this conference
     * @param {object} optionalValues - The optional params
     * @param {object} [optionalValues.message_id] - When added, it returns all messages **before** this one.
     * @param {object} [optionalValues.read] - Should this conference be marked as read after this API call?
     * @returns {Promise<Message[]>}
     */
    getMessages(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.conference_id = this.id
            this.client.api.post(classes.MESSENGER, classes.messenger.MESSAGES, optionalValues).then((data) => {
                const messages = []
                for (let msgObj of data)
                    messages.push(new Message(this.client, msgObj))
                resolve(messages)
            }).catch(reject)
        })
    }

    /**
     * Constructs and sends a new message to this conference.
     * @param {string} text - The content of the new message
     * @returns {Promise<string>}
     */
    newMessage(text) {
        const body = { id: this.id, text: text }
        return this.client.api.post(classes.MESSENGER, classes.messenger.SET_MESSAGE, body)
    }

    /**
     * Marks this conference as read.
     * @returns {Promise}
     */
    setRead() {
        const body = { id: this.id }
        return this.client.api.post(classes.MESSENGER, classes.messenger.SET_READ, body)
    }

    /**
     * Marks this conference as unread.
     * @returns {Promise}
     */
    setUnread() {
        const body = { id: this.id }
        return this.client.api.post(classes.MESSENGER, classes.messenger.SET_UNREAD, body)
    }

    /**
     * Add this conference to this users favorites.
     * @returns {Promise}
     */
    setFavorite() {
        const body = { id: this.id }
        return this.client.api.post(classes.MESSENGER, classes.messenger.SET_FAVORITE, body)
    }
    
    /**
     * Remove this conference from this users favorites.
     * @returns {Promise}
     */
    unsetFavorite() {
        const body = { id: this.id }
        return this.client.api.post(classes.MESSENGER, classes.messenger.UNSET_FAVORITE, body)
    }

    /**
     * Marks this conference as blocked.
     * @returns {Promise}
     */
    block() {
        const body = { id: this.id }
        return this.client.api.post(classes.MESSENGER, classes.messenger.SET_BLOCK, body)
    }

    /**
     * Removes the blocked status of this conference.
     * @returns {Promise}
     */
    unblock() {
        const body = { id: this.id }
        return this.client.api.post(classes.MESSENGER, classes.messenger.SET_UNBLOCK, body)
    }

    /**
     * Reports the current conference to an admin
     * @param {string} reason - The reason for this report
     * @returns {Promise}
     */
    report(reason) {
        const body = { id: this.id, text: reason }
        return this.client.api.post(classes.MESSENGER, classes.messenger.REPORT, body)
    }
}

module.exports = Conference