'use strict'

const Base = require('./Base')
const User = require('./User')
const { classes } = require('../util/Constants')

class ChatMessage extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
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

    /**
     * Gathers information about the user
     * @returns {Promise<User>}
     */
    getUserinfo() { return this.client.getUserById(this.userId) }

    /**
     * Deletes this message
     * @returns {Promise}
     */
    delete() {
        const body = { message_id: this.id }
        return this.client.api.post(classes.CHAT, classes.chat.DELETE_MESSAGE, body)
    }

    /**
     * Reports this message
     * @param {string} text - A text with additional information about the report (written by the user)
     * @returns {Promise}
     */
    report(text) {
        const body = { message_id: this.id, message: text }
        return this.client.api.post(classes.CHAT, classes.chat.REPORT_MESSAGE, body)
    }

    /**
     * Gives the message a 'thank you'
     * @returns {Promise}
     */
    thank() {
        const body = { message_id: this.id }
        return this.client.api.post(classes.CHAT, classes.chat.THANKYOU_MESSAGE, body)
    }
}

module.exports = ChatMessage