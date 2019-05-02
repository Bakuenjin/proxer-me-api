'use strict'

const BaseAPI = require('./BaseAPI')
const ChatRoom = require('../../structures/ChatRoom')
const ChatUser = require('../../structures/ChatUser')
const ChatMessage = require('../../structures/ChatMessage')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').CHAT_API

/**
 * Represents the chat 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class ChatAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers information about a room specified by its id.
     * @param {number} id - The unique ID of the room.
     * @returns {Promise<ChatRoom>}
     */
    async roomInfo(id) {
        const body = { room_id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ROOM_INFO, body)
        return new ChatRoom(data)
    }

    /**
     * Gathers information about the users of a chat room specified by its id.
     * @param {number} id - The unique ID of the room.
     * @returns {Promise<ChatUser[]>}
     */
    async roomUsers(id) {
        const body = { room_id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ROOM_USERS, body)
        const users = data.map(it => new ChatUser(it))
        return users
    }

    /**
     * Gathers information about all rooms that are public available.
     * @returns {Promise<ChatRoom[]>}
     */
    async publicRooms() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.PUBLIC_ROOMS)
        const rooms = data.map(it => new ChatRoom(it))
        return rooms
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Gathers information about all rooms the current user is part of.
     * @returns {Promise<ChatRoom[]>}
     */
    async myRooms() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.MY_ROOMS)
        const rooms = data.map(it => new ChatRoom(it))
        return rooms
    }

    /**
     * Gathers information about all messages send before a specified message.
     * @param {number} id - The unique ID of the room.
     * @param {number} messageId - The unique ID of the message to load older messages from.
     * @returns {Promise<ChatMessage[]>}
     */
    async loadMessages(id, messageId) {
        const body = { room_id: id, message_id: messageId }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.MESSAGES, body)
        const msgs = data.map(it => new ChatMessage(it))
        return msgs
    }

    /**
     * Gathers information about all messages send after a specified message.
     * @param {number} id - The unique ID of the room.
     * @param {number} messageId - The unique ID of the latest known message.
     */
    async loadNewMessages(id, messageId) {
        const body = { room_id: id, message_id: messageId }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.NEW_MESSAGES, body)
        const msgs = data.map(it => new ChatMessage(it))
        return msgs
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Sends a message to a specified room. When successful, the message id is returned.
     * @param {number} id - The unique ID of the room.
     * @param {string} message - The message text to submit to the chat.
     * @returns {Promise<number>}
     */
    async sendMessage(id, message) {
        const body = { room_id: id, message: message }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.NEW_MESSAGE, body)
        return parseInt(data)
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Deletes a message from a chat room. Promise is resolved when deletion was successful.
     * @param {number} id - The unique ID of the message.
     * @returns {Promise<void>}
     */
    async deleteMessage(id) {
        const body = { message_id: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.DELETE_MESSAGE, body)
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Reports a message from a chat room. Promise is resolved when report was successful.
     * @param {number} id - The unique ID of the message.
     * @param {string} info - Additional information for the moderator
     * @returns {Promise<void>}
     */
    async reportMessage(id, info) {
        const body = { message_id: id, message: info }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.REPORT_MESSAGE, body)
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * THanks a message from a chat room. Promise is resolved when the 'thank you' was successful.
     * @param {number} id - The unique ID of the message.
     * @returns {Promise<void>}
     */
    async thankMessage(id) {
        const body = { message_id: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.THANKYOU_MESSAGE, body)
    }
}

module.exports = ChatAPI