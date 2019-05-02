'use strict'

const BaseAPI = require('./BaseAPI')
const UCPEntry = require('../../structures/UCPEntry')
const TopTenItem = require('../../structures/TopTenItem')
const History = require('../../structures/History')
const Vote = require('../../structures/Vote')
const Settings = require('../../structures/Settings')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').UCP_API

class UcpAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers a list of all anime / manga, the user has an entry from in his UCP.
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the UCPEntry content (anime / manga). Default: anime.
     * @param {number} [optionalValues.p] - The amount of entries to load. Default: 100.
     * @param {number} [optionalValues.limit] - The page of the entries list. Default: 0.
     * @param {string} [optionalValues.search] - Searches for this string in the name of the entries.
     * @param {string} [optionalValues.search_start] - Searches for this string in the beginning of the name of the entries.
     * @param {boolean} [optionalValues.isH] - Is hentai content allowed?
     * @param {string} [optionalValues.sort] - The way to sort the results. DEfault: Sort by state, then by name (ascending).
     * @param {string} [optionalValues.filter] - A filter to specify the view-status of the content. Default: No filter.
     * @returns {Promise<UCPEntry[]>}
     */
    async list(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LIST, optionalValues)
        const results = data.map(it => new UCPEntry(it))
        return results
    }

    /**
     * Gathers the sum of episodes / chapters the user has watched so far.
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the sum. Anime / manga. Default: Anime.
     * @returns {Promise<Number>}
     */
    async listsum(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LIST_SUM, optionalValues)
        return parseInt(data)
    }

    /**
     * Gathers the top ten entries of the user.
     * @returns {Promise<TopTenItem[]>}
     */
    async topten() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TOP_TEN)
        const results = data.map(it => new TopTenItem(it))
        return results
    }

    /**
     * Gathers the user history (watched animes / read mangas).
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.limit] - The amount of history entries to load. Default: 50.
     * @param {number} [optionalValues.p] - The page of the history entries. Default: 0.
     * @returns {Promise<History[]>}
     */
    async history(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.HISTORY, optionalValues)
        const results = data.map(it => new History(it))
        return results
    }

    /**
     * Gathers the votes the user casted.
     * @returns {Promise<Vote[]>}
     */
    async votes() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.VOTES)
        const results = data.map(it => new Vote(it))
        return results
    }

    /**
     * Deletes a vote specified by its ID.
     * @param {number} id - The unique ID of the vote
     */
    async deleteVote(id) {
        const body = { id: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.DELETE_VOTE, body)
    }

    /**
     * Gathers the reminders of a user.
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the reminder content (anime / manga). Default: both.
     * @param {boolean} [optionalValues.available] - Only gather the reminders for available content? Default: both.
     * @param {number} [optionalValues.p] - The amount of reminders to load. Default: 100.
     * @param {number} [optionalValues.limit] - The page of the reminders list. Default: 0.
     */
    async reminders(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.REMINDER, optionalValues)
        const results = data.map(it => new Reminder(it))
        return results
    }

    /**
     * Sets a new reminder for the specified content.
     * @param {number} id - The unique ID of the anime / manga.
     * @param {number} episode - The episode / chapter of the anime / manga.
     * @param {string} language - The language of the content.
     * @param {string} category - The category of the content (anime / manga).
     */
    async setReminder(id, episode, language, category) {
        const body = {
            id: id,
            episode: episode,
            language: language,
            kat: category
        }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_REMINDER, body)
    }

    /**
     * Deletes a reminder specified by its ID.
     * @param {number} id - The unique ID of the reminder
     */
    async deleteReminder(id) {
        const body = { id: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.DELETE_REMINDER, body)
    }

    /**
     * Deletes a favorite (TopTenItem) specified by its ID.
     * @param {number} id - The unique ID of the favorite(TopTenItem) 
     */
    async deleteFavorite(id) {
        const body = { id: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.DELETE_FAVORITE, body)
    }

    /**
     * Updates the progress state of a comment specified by its ID.
     * @param {number} id - The unique ID of the comment.
     * @param {number} value - The number of watched episodes / read chapters of the content this comment was made for.
     */
    async setCommentState(id, value) {
        const body = { id: id, value: value }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_COMMENT_STATE, body)
    }

    /**
     * Deletes a comment specified by its ID.
     * @param {number} id - The unique ID of the comment. 
     */
    async deleteComment(id) {
        const body = { id: id }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_COMMENT_STATE, body)
    }

    /**
     * Gathers information about the settings of the logged in user.
     * @returns {Promise<Settings>}
     */
    async settings() {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.SETTINGS)
        return new Settings(data)
    }

    async setSettings(optionalValues = {}) {
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_SETTINGS, optionalValues)
    }
}

module.exports = UcpAPI