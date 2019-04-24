'use strict'

const BaseAPI = require('./BaseAPI')
const Header = require('../../structures/Header')
const Calendar = require('../../structures/Calendar')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').MEDIA_API

/**
 * Represents the media 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class MediaAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers a random header from Proxer.me
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.style] - The style of the header
     * @returns {Promise<Header>}
     */
    async randomHeader(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.RANDOM_HEADER, optionalValues)
        return new Header(data)
    }

    /**
     * Gathers a list of all current headers from Proxer.me
     * @returns {Promise<Header[]>}
     */
    async headerList() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.HEADER_LIST)
        const headerList = data.map(it => new Header(it))
        return headerList
    }

    /**
     * Gathers the calendar information for the next 7 days.
     * @returns {Promise<Calendar>}
     */
    async calendar() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CALENDAR)
        return new Calendar(data)
    }

    /**
     * Gathers a VAST tag.
     * 
     * The result of this should only be used for a maximum of 24 hours.
     * @returns {Promise<string>}
     */
    async vastTag() { return await this.httpClient.post(API_CLASS, API_FUNCTIONS.VAST_TAG) }

}

module.exports = MediaAPI