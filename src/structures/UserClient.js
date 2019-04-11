'use strict'

const Client = require('./Client')
const User = require('./User')
const UserHistory = require('./History')
const TopTenItem = require('./TopTenItem')
const UCPEntry = require('./UCPEntry')
const Vote = require('./Vote')
const Reminder = require('./Reminder')
const Settings = require('./Settings')
const { classes } = require('../util/Constants')

/**
 * WIP
 */
class UserClient extends Client {
    constructor(apiParams, data) {
        super(apiParams)
        if (data) this.data = data
    }

    /**
     * The unique ID of the current user
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.uid) }

    /**
     * The users avatar link
     * @type {string}
     * @readonly
     */
    get avatar() { return this.data.avatar }

    /**
     * Is the current user a team member?
     * @type {boolean}
     * @readonly
     */
    get isTeam() { return this.data.isTeam }

    /**
     * Is the current user a donator?
     * @type {boolean}
     * @readonly
     */
    get isDonator() { return this.data.isDonator }

    // get token() { return this.data.token }

    /**
     * Logs the current user out
     * @returns {Promise<boolean>}
     */
    logout() { return this.api.post(classes.USER, classes.user.LOGOUT) }

    /**
     * Gathers all information about the logged in user
     * @returns {Promise<User>}
     */
    getInfos() { return this.getUserById(this.id) }

    /**
     * Adds the specified content id to the specified list of the logged in user
     * @param {number} id - The id of the content that should be added to the users list
     * @param {string} type - The type of list this content should be added to
     * @returns {Promise<void>}
     */
    addContentToList(id, type) {
        const body = { id: id, type: type }
        return this.api.post(classes.INFO, classes.info.SET_USERINFO, body)
    }

    /**
     * Gathers data about whether specified content is included in in the logged in users lists
     * @param {number} id - The id of the content that should be loaded from the users lists
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.type] - The specific type of list to check for (if set, this function returns boolean instead of an object)
     * @returns {Promise}
     */
    getContentFromList(id, optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const body = { id: id }
            this.api.post(classes.INFO, classes.info.GET_USERINFO, body).then((data) => {
                if (optionalValues.type && data[optionalValues.type])
                    resolve(data[optionalValues.type])
                else resolve(data)
            }).catch(reject)
        })
    }

    getUCPList(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.UCP, classes.ucp.LIST, optionalValues).then((data) => {
                const ucpEntries = []
                for (let ucpObj of data)
                    ucpEntries.push(new UCPEntry(this, ucpObj))
                resolve(ucpEntries)
            }).catch(reject)
        })
    }

    /**
     * Gathers the sum of all viewed episodes/chapters the current user has watched
     * @param {object} optionalValues - The optional params
     * @param {object} [optionalValues.kat] - The category to
     */
    getViewSum(optionalValues = {}) { return this.api.post(classes.UCP, classes.ucp.LIST_SUM, optionalValues) }

    /**
     * Gathers the top ten for the currently logged in user
     * @returns {Promise<TopTen[]>}
     */
    getTopTen() {
        return new Promise((resolve, reject) => {
            this.api.post(classes.UCP, classes.ucp.TOP_TEN).then((data) => {
                const items = []
                for (let ttObj of data)
                    items.push(new TopTenItem(this, ttObj))
                resolve(items)
            }).catch(reject)
        })
    }

    /**
     * Gather historical information about the user
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.limit] - The amount of entries per page
     * @param {number} [optionalValues.p] - The page to load
     * @returns {Promise<UserHistory[]>}
     */
    getHistory(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.UCP, classes.ucp.HISTORY, optionalValues).then((data) => {
                const historyEntries = []
                for (let historyObj of data)
                    historyEntries.push(new UserHistory(this.client, historyObj))
                resolve(historyEntries)
            }).catch(reject)
        })
    }

    /**
     * Gathers information about casted comment-votes by the logged in user 
     * @returns {Promise<Vote[]>}
     */
    getVotes() {
        return new Promise((resolve, reject) => {
            this.api.post(classes.UCP, classes.ucp.VOTES).then((data) => {
                const votes = []
                for (let voteObj of data)
                    votes.push(new Vote(this, voteObj))
                resolve(votes)
            }).catch(reject)
        })
    }

    getReminders(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.UCP, classes.ucp.REMINDER, optionalValues).then((data) => {
                const reminders = []
                for (let reminderObj of data)
                    reminders.push(new Reminder(this, reminderObj))
                resolve(reminders)
            }).catch(reject)
        })
    }

    /**
     * Gathers all settings information about the user
     * @returns {Promise<Settings>}
     */
    getSettings() {
        return new Promise((resolve, reject) => {
            this.api.post(classes.UCP, classes.ucp.SETTINGS).then((data) => {
                resolve(new Settings(this, data))
            }).catch(reject)
        })
    }

    /**
     * Gathers information about the user
     * @param {number} id - The unique id of the user
     * @returns {Promise<User>}
     */
    getUserById(id) {
        return new Promise((resolve, reject) => {
            body = { uid: id }
            this.api.post(classes.USER, classes.user.USERINFO, body).then((data) => {
                resolve(new User(this, data))
            }).catch(reject)
        })
    }
}

module.exports = UserClient