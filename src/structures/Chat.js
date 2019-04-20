'use strict'

const Base = require('./Base')
const ChatRoom = require('./ChatRoom')
const { classes } = require('../util/Constants')
 
/**
 * Represents the proxer.me chat
 * @extends {Base}
 */
class Chat extends Base {
    constructor(client) {
        super(client)
    }

    /**
     * Gathers information about all public chatrooms.
     * @returns {Promise<ChatRoom[]>}
     */
    getPublicRooms() {
        return new Promise((resolve, reject) => {
            this.client.api.post(classes.CHAT, classes.chat.PUBLIC_ROOMS).then((data) => {
                const rooms = []
                for (let roomObj of data)
                    rooms.push(new ChatRoom(this.client, roomObj))
                resolve(rooms)
            }).catch(reject)
        })
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Gathers information about all chatrooms the current user is part of.
     * @returns {Promise<ChatRoom[]>}
     */
    getPersonalRooms() {
        return new Promise((resolve, reject) => {
            this.client.api.post(classes.CHAT, classes.chat.MY_ROOMS).then((data) => {
                const rooms = []
                for (let roomObj of data)
                    rooms.push(new ChatRoom(this.client, roomObj))
                resolve(rooms)
            }).catch(reject)
        })
    }

    /**
     * Gathers information about a chatroom specified by its id.
     * @param {number} id - The id of the chatroom
     * @returns {Promise<ChatRoom>}
     */
    getRoomById(id) {
        return new Promise((resolve, reject) => {
            const body = { room_id: id }
            this.client.api.post(classes.CHAT, classes.chat.ROOM_INFO, body).then((data) => {
                resolve(new ChatRoom(this.client, data))
            }).catch(reject)
        })
    }
}

module.exports = Chat