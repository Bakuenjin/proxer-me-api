'use strict'

const BaseAPI = require('./BaseAPI')
const Notification = require('../../structures/Notification')
const NotificationCounter = require('../../structures/NotificationCounter')
const News = require('../../structures/News')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').NOTIFICATIONS_API

class NotificationsAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers information about the amount of different notifications.
     * @returns {Promise<NotificationCounter>}
     */
    async count() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.COUNT)
        return new NotificationCounter(data)
    }

    /**
     * Gathers news from Proxer.me
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.p] - The page to load. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of news per page. Default: 15.
     * @param {boolean} [optionalValues.set_read] - Sets all news as read. Default: false.
     * @returns {Promise<News[]>}
     */
    async news(optionalValues = {}) {
        const data  = await this.httpClient.post(API_CLASS, API_FUNCTIONS.NEWS, optionalValues)
        const allNews = data.map(it => new News(it))
        return allNews
    }

    /**
     * Gathers all notifications of the user.
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.p] - The page to load. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of notifications per page. Default: 15.
     * @param {boolean} [optionalValues.set_read] - Sets all news as read. Default: false.
     * @param {number} [optionalValues.filter] - Defined the type of notification to load (read / unread). Default: both.
     * @returns {Promise<Notification[]>}
     */
    async notifications(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.GET, optionalValues)
        const notifs = data.map(it => new Notification(it))
        return notifs
    }

    /**
     * Deletes the notification specified by ID.
     * @param {number} id - The unique ID of the notification.
     * @returns {Promise<void>}
     */
    async delete(id) {
        const body = { nid: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.DELETE, body)
    }
}

module.exports = NotificationsAPI