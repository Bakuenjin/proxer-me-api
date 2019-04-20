'use strict'

const Base = require('./Base')
const ChatMessage = require('./ChatMessage')
const ChatUser = require('./ChatUser')
const { classes } = require('../util/Constants')

/**
 * Represents a chat room in the proxer.me chat
 * @extends {Base}
 */
class ChatRoom extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
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

    /**
     * Gathers information about the users of this chat room.
     * @returns {Promise<ChatUser[]>}
     */
    getChatUsers() {
        return new Promise((resolve, reject) => {
            const body = { room_id: this.id }
            this.client.api.post(classes.CHAT, classes.chat.ROOM_USERS, body).then((data) => {
                const users = []
                for (let userObj of data)
                    users.push(new ChatUser(this.client, userObj))
                resolve(users)
            }).catch(reject)
        })
    }

    /**
     * Gathers old messages of this room.
     * @param {object} optionalParams - The optional params
     * @param {object} [optionalParams.message_id] - The id of the message from where the other messages should be loaded
     * @returns {Promise<ChatMessage[]>}
     */
    getMessages(optionalParams = {}) {
        return new Promise((resolve, reject) => {
            optionalParams.room_id = this.id
            this.client.api.post(classes.CHAT, classes.chat.MESSAGES, optionalParams).then((data) => {
                const msgs = []
                for (let msgObj of data)
                    msgs.push(new ChatMessage(this.client, msgObj))
                resolve(msgs)
            }).catch(reject)
        })
    }

    /**
     * Gathers all new messages from a specified message onward.
     * @param {number} messageId - The id of the latest message
     * @returns {Promise<ChatMessage[]>}
     */
    getNewMessages(messageId) {
        return new Promise((resolve, reject) => {
            const body = { room_id: this.id, message_id: messageId }
            this.client.api.post(classes.CHAT, classes.chat.NEW_MESSAGES, body).then((data) => {
                const msgs = []
                for (let msgObj of data)
                    msgs.push(new ChatMessage(this.client, msgObj))
                resolve(msgs)
            }).catch(reject)
        })
    }

    /**
     * Sends a new message to this chat room. Returns the id of the new message.
     * @param {string} text - The message text to send to the chat room
     * @returns {Promise<number>}
     */
    send(text) {
        return new Promise((resolve, reject) => {
            const body = { room_id: this.id, message: text }
            this.client.api.post(classes.CHAT, classes.chat.NEW_MESSAGE, body).then((data) => {
                resolve(parseInt(data))
            }).catch(reject)
        })
    }
}

module.exports = ChatRoom