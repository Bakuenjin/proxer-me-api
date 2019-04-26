'use strict'

const BaseAPI = require('./BaseAPI')
const MessengerConstants = require('../../structures/MessengerConstants')
const Message = require('../../structures/Message')
const Conference = require('../../structures/Conference')
const ConferenceDetails = require('../../structures/ConferenceDetails')
const ConferenceUser = require('../../structures/ConferenceUser')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').MESSENGER_API

/**
 * Represents the messenger 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class MessengerAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers information about global constants for the messenger.
     * @returns {Promise<MessengerConstants>}
     */
    async constants() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CONSTANTS)
        return new MessengerConstants(data)
    }

    /**
     * Gathers information about the conferences of the logged in user.
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.type] - The type of conference to search for. Default: All unblocked conferences.
     * @param {string} [optionalValues.p] - The conference page. Default: 0.
     * @returns {Promise<Conference[]>}
     */
    async conferences(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CONFERENCES, optionalValues)
        const confs = data.map(it => new Conference(it))
        return confs
    }

    /**
     * Gathers additional information about the conference specified by id.
     * @param {number} id - The unique ID of the conference.
     * @returns {Promise<ConferenceDetails>}
     */
    async conferenceDetails(id) {
        const body = { conference_id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CONFERENCE_INFO, body)
        const confUsers = data.users.map(it => new ConferenceUser(it))
        data.users = confUsers
        return new ConferenceDetails(data)
    }

    /**
     * Gathers additional information about the conference user specified by id.
     * @param {number} id - The unique ID of the conference user.
     * @returns {Promise<ConferenceUser>}
     */
    async userDetails(id) {
        const body = { user_id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.USER_INFO, body)
        return new ConferenceUser(data)
    }

    /**
     * Gathers messages from the user in conferences.
     * 
     * There are 4 possible cases but all return a list of messages.
     * 
     * For more details about this, visit the proxer.me API wiki:
     * http://proxer.me/wiki/Proxer_API/v1/Messenger (Get Messages)
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.conference_id] - The unique ID of the conference to load messages from.
     * @param {number} [optionalValues.message_id] - The unique ID of the message to load newer messages from.
     * @param {boolean} [optionalValues.read] - Should the conference be marked as read with this request?
     * @returns {Promise<Message[]>}
     */
    async loadMessages(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.MESSAGES, optionalValues)
        const msgs = data.map(it => new Message(it))
        return msgs
    }

    /**
     * Creates a new conference with a specified message to s specified user.
     * If a conference with these two users already exist,
     * the message will simply be appended to the existing conference.
     * 
     * Resolves with the ID of the new conference.
     * @param {string} text - The text content
     * @param {string} username - The name of the user to send this message to.
     * @returns {Promise<number>}
     */
    async newConference(text, username) {
        const body = { text: text, username: username }
        const conferenceId = await this.httpClient.post(API_CLASS, API_FUNCTIONS.NEW_CONFERENCE, body)
        return parseInt(conferenceId)
    }

    /**
     * Creates a new conference group with a specified set of users and topic.
     * 
     * Resolves with the ID of the new conference.
     * @param {string[]} users - An array of users to add to the conference. Specified by name.
     * @param {string} topic - The topic of the group conference.
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.text] - The message text to initialize the conference with.
     * @returns {Promise<number>}
     */
    async newConferenceGroup(users, topic, optionalValues = {}) {
        optionalValues.users = users
        optionalValues.topic = topic
        const conferenceId = await this.httpClient.post(API_CLASS, API_FUNCTIONS.NEW_CONFERENCE_GROUP, optionalValues)
        return parseInt(conferenceId)
    }

    /**
     * Reports a conference to the Proxer.me administration.
     * @param {number} id - The unique ID of the conference
     * @param {string} reason - A small text describing the reason for this report.
     */
    async reportConference(id, reason) {
        const body = { conference_id: id, text: reason }
        return await this.httpClient.post(API_CLASS, API_FUNCTIONS.REPORT, body)
    }

    /**
     * Sends a new message to a specified conference.
     * * If the message **is not** a command, it resolves to undefined.
     * * If the message **is** a command which failed (/addUser user not found), it resolves with a small message.
     * @param {number} id - The unique ID of the conference.
     * @param {string} text - The content of the message.
     * @returns {Promise<string>}
     */
    async sendMessage(id, text) {
        const body = { conference_id: id, text: text }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_MESSAGE, body)
        return data
    }

    /**
     * Sets the conference as read.
     * @param {number} id - The unique ID of the conference.
     */
    async setRead(id) {
        const body = { conference_id: id }
        return await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_READ, body)
    }

    /**
     * Sets the conference as unread.
     * @param {number} id - The unique ID of the conference.
     */
    async setUnread(id) {
        const body = { conference_id: id }
        return await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_UNREAD, body)
    }

    /**
     * Sets the conference as a favorite of the user.
     * @param {number} id - The unique ID of the conference.
     */
    async setFavorite(id) {
        const body = { conference_id: id }
        return await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_FAVORITE, body)
    }

    /**
     * Removes the conference from the favorites of the user.
     * @param {number} id - The unique ID of the conference.
     */
    async setUnfavorite(id) {
        const body = { conference_id: id }
        return await this.httpClient.post(API_CLASS, API_FUNCTIONS.UNSET_FAVORITE, body)
    }
}

module.exports = MessengerAPI