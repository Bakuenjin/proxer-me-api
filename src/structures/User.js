'use strict'

const Base = require('./Base')
const TopTenItem = require('./TopTenItem')
const Comment = require('./Comment')
const UserHistory = require('./History')
const UserAbout = require('./UserAbout')

const { classes } = require('../util/Constants')

class User extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the user
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.uid) }

    /**
     * The name of the user
     * @type {string}
     * @readonly
     */
    get name() { return this.data.username }

    /**
     * The users avatar link
     * @type {string}
     * @readonly
     */
    get avatar() { return this.data.avatar }

    /**
     * The users status
     * @type {string}
     * @readonly
     */
    get status() { return this.data.status }

    /**
     * The time the status changed last
     * @type {Date}
     * @readonly
     */
    get statusTimestamp() { return (this.data.status_time ? 
                                    new Date(parseInt(this.data.status_time) * 1000) :
                                    null) }
    
    /**
     * The points the user has for uploading / linking content
     * @type {number}
     * @readonly
     */
    get uploadPoints() { return parseInt(this.data.points_uploads) }

    /**
     * The points the user has for watching anime
     * @type {number}
     * @readonly
     */
    get animePoints() { return parseInt(this.data.points_anime) }

    /**
     * The points the user has for reading manga
     * @type {number}
     * @readonly
     */
    get mangaPoints() { return parseInt(this.data.points_manga) }

    /**
     * The points the user has for basic information
     * @type {number}
     * @readonly
     */
    get infoPoints() { return parseInt(this.data.points_info) }

    /**
     * The points the user has for his forum activity
     * @type {number}
     * @readonly
     */
    get forumPoints() { return parseInt(this.data.points_forum )}

    /**
     * The points the user has for doing miscellaneous things
     * @type {number}
     * @readonly
     */
    get miscPoints() { return parseInt(this.data.points_misc) }

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

        /**
     * Gathers the top ten of the user
     * @param {object} optionalValues - All optional params
     * @param {string} [optionalValues.kat] - The category of the top ten elements
     * @param {boolean} [optionalValues.isH] - Should hentai be displayed?
     * @returns {Promise<TopTenItem[]>}
     */
    getTopTen(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.uid = this.id
            this.client.api.post(classes.USER, classes.user.TOP_TEN, optionalValues).then((data) => {
                const items = []
                for(let ttObj of data)
                    items.push(new TopTenItem(this.client, ttObj))
                resolve(items)
            }).catch(reject)
        })
    }

    /**
     * Gathers the latest comments of the user
     * @param {object} optionalValues - All optional params
     * @param {string} [optionalValues.kat] - The category of the content, the user wrote comments for
     * @param {number} [optionalValues.p] - What comment page should be loaded
     * @param {number} [optionalValues.limit] - How many comments should be loaded
     * @param {number} [optionalValues.length] - The minimum number of characters the comments should contain
     * @returns {Promise<Comment[]>}
     */
    getComments(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.uid = this.id
            this.client.api.post(classes.USER, classes.user.LATEST_COMMENTS, optionalValues).then((data) => {
                const comments = []
                for (let commObj of data)
                    comments.push(new Comment(this.client, commObj))
                resolve(comments)
            }).catch(reject)
        })
    }

    /**
     * Gathers a history list of the user
     * @param {object} optionalValues - All optional params
     * @param {number} [optionalValues.p] - What comment page should be loaded
     * @param {number} [optionalValues.limit] - How many comments should be loaded
     * @returns {Promise<UserHistory[]>}
     */
    getHistory(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.uid = this.id
            this.client.api.post(classes.USER, classes.user.HISTORY, optionalValues).then((data) => {
                const historyEntries = []
                for (let historyObj of data)
                    historyEntries.push(new UserHistory(this.client, historyObj))
                resolve(historyEntries)
            }).catch(reject)
        })
    }

    /**
     * Gets the friendlist of this user
     * @returns {Promise<Friends[]>}
     */
    getFriends() {
        return new Promise((resolve, reject) => {
            const body = { uid: this.id }
            this.client.api.post(classes.USER, classes.user.FRIENDS, body).then((data) => {
                const friends = []
                for (let friendObj of data)
                    friends.push(new User(this.client, friendObj))
                resolve(friends)
            }).catch(reject)
        })
    }

    /**
     * Gets the basic user data he entered in the 'About' section of his profil
     * @returns {Promise<UserAbout>}
     */
    getAbout() {
        return new Promise((resolve, reject) => {
            const body = { uid: this.id }
            this.client.api.post(classes.USER, classes.user.ABOUT, body).then((data) => {
                resolve(new UserAbout(data))
            }).catch(reject)
        })
    }
}

module.exports = User