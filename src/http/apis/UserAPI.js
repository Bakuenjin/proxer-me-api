'use strict'

const BaseAPI = require('./BaseAPI')
const LoginUser = require('../../structures/LoginUser')
const User = require('../../structures/User')
const TopTenItem = require('../../structures/TopTenItem')
const UserEntry = require('../../structures/UserEntry')
const Comment = require('../../structures/Comment')
const History = require('../../structures/History')
const UserAbout = require('../../structures/UserAbout')
const Friend = require('../../structures/Friend')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').USER_API

/**
 * Represents the User 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class UserAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Logs the user into proxer.me!
     * @param {string} username - The name of the user
     * @param {string} password - The password of the user
     * @param {object} optionalValues - The optional params
     * @param {object} [optionalValues.secretkey] - The 2FA key (needed if the user has 2FA activated).
     */
    async login(username, password, optionalValues = {}) {
        optionalValues.username = username
        optionalValues.password = password
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LOGIN, optionalValues)
        return new LoginUser(data)
    }

    /**
     * Logs the currently logged in user out.
     */
    async logout() { await this.httpClient.post(API_CLASS, API_FUNCTIONS.LOGOUT) }

    /**
     * Gathers information about a user via name or ID.
     * 
     * If nothing is specified, the information about the logged in user is gathered.
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.uid] - The unique ID of the user
     * @param {string} [optionalValues.username] - The name of the user (ignored when uid is set)
     */
    async userInfo(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.USERINFO, optionalValues)
        return new User(data)
    }

    /**
     * Gathers the favorites (TopTen) of the user specified by ID or username.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the favorites (anime / manga). Default: anime.
     * @param {boolean} [optionalValues.isH] - Should the results contain hentai? Default: false.
     */
    async topTen(identifier, optionalValues = {}) {
        if (typeof identifier === "number") optionalValues.uid = identifier
        else optionalValues.username = identifier
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TOP_TEN, optionalValues)
        const results = data.map(it => new TopTenItem(it))
        return results
    }

    /**
     * Gathers a list of all anime / manga, the user has an entry from.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the UserEntry content (anime / manga). Default: anime.
     * @param {number} [optionalValues.p] - The page of the entries list. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of entries to load. Default: 100.
     * @param {string} [optionalValues.search] - Searches for this string in the name of the entries.
     * @param {string} [optionalValues.search_start] - Searches for this string in the beginning of the name of the entries.
     * @param {boolean} [optionalValues.isH] - Is hentai content allowed?
     * @param {string} [optionalValues.sort] - The way to sort the results. DEfault: Sort by state, then by name (ascending).
     * @param {string} [optionalValues.filter] - A filter to specify the view-status of the content. Default: No filter.
     * @returns {Promise<UserEntry[]>}
     */
    async list(identifier, optionalValues = {}) {
        if (typeof identifier === "number") optionalValues.uid = identifier
        else optionalValues.username = identifier
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LIST, optionalValues)
        const results = data.map(it => new UserEntry(it))
        return results
    }

    /**
     * Gathers a list of comments of a user specified by ID or username.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the content (anime / manga) this comment was written at. Default: both.
     * @param {number} [optionalValues.p] - The page of the comment list. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of comments to load. Default: 25.
     * @param {string} [optionalValues.length] - The minimum amount of characters the comments should contain. Default: 300.
     * @returns {Promise<Comments[]>}
     */
    async latestComments(identifier, optionalValues = {}) {
        if (typeof identifier === "number") optionalValues.uid = identifier
        else optionalValues.username = identifier
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LATEST_COMMENTS, optionalValues)
        const results = data.map(it => new Comment(it))
        return results
    }

    /**
     * Gathers a list of comments of a user specified by ID or username.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - The category of the content (anime / manga) this comment was written at. Default: both.
     * @param {number} [optionalValues.p] - The page of the history list. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of history entries to load. Default: 100.
     * @returns {Promise<History[]>}
     */
    async history(identifier, optionalValues = {}) {
        if (typeof identifier === "number") optionalValues.uid = identifier
        else optionalValues.username = identifier
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.HISTORY, optionalValues)
        const results = data.map(it => new History(it))
        return results
    }

    /**
     * Gather information about the friends of a user.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @returns {Promise<Friend[]>}
     */
    async friends(identifier) {
        const body = {}
        if (typeof identifier === "number") body.uid = identifier
        else body.username = identifier
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.FRIENDS, body)
        const results = data.map(it => new Friend(it))
        return results
    }

    /**
     * Gather data from the user about page.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @returns {Promise<UserAbout>}
     */
    async about(identifier) {
        const body = {}
        if (typeof identifier === "number") body.uid = identifier
        else body.username = identifier
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ABOUT, body)
        return new UserAbout(data)
    }

    /**
     * Requests a user login. This could either be done via the returned link or the notification.
     * @param {(string|number)} identifier - This is either the unique ID (number) or the username (string).
     * @param {string} code - A 100 characters long code used for identification
     * @param {string} appName - The name of the application
     * @returns {Promise<string>}
     */
    async requestAuth(identifier, code, appName) {
        const body = { code: code, name: appName }
        if (typeof identifier === "number") body.uid = identifier
        else body.username = identifier
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.REQUEST_AUTHENTIFICATION, body)
        return `proxer.me/auth?code=${code}&name=${appName}`
    }

    /**
     * Checks if the specified login request was successful.
     * @param {string} code - The at requestAuth() specified 100 characters long code.
     * @param {string} appName - The at requestAuth() specified name of the application
     * @returns {Promise<LoginUser>}
     */
    async checkAuth(code, appName) {
        const body = { code: code, name: appName }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CHECK_AUTHENTIFICATION, body)
        return new LoginUser(data)
    }

}

module.exports = UserAPI
