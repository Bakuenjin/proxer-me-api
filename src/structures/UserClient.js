'use strict'

const Client = require('./Client')
const User = require('./User')
const TopTenItem = require('./TopTenItem')
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
    getInfos() {
        return new Promise((resolve, reject) => {
            body = { uid: this.id }
            this.api.post(classes.USER, classes.user.USERINFO, body).then((data) => {
                resolve(new User(this, data))
            }).catch(reject)
        })
    }
}

module.exports = UserClient