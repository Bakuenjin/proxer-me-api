'use strict'

const BaseAPI = require('./BaseAPI')
const MessengerConstants = require('../../structures/MessengerConstants')
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

    async loadMessages(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.MESSAGES, optionalValues)
    }
}

module.exports = MessengerAPI