'use strict'

const Avatar = require('./Avatar')

/**
 * Represents the logged in user.
 */
class LoginUser {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the logged in user.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.uid) }

    /**
     * The avatar of the logged in user.
     * @type {Avatar}
     * @readonly
     */
    get avatar() { return new Avatar(this.data.avatar) }

    /**
     * Is the user a team member?
     * @type {boolean}
     * @readonly
     */
    get isTeam() { return this.data.isTeam }

    /**
     * Is the user a donator?
     * @type {boolean}
     * @readonly
     */
    get isDonator() { return this.data.isDonator }

    /**
     * The unique token for communicating with the server as the logged in user.
     * @type {string}
     * @readonly
     */
    get token() { return this.data.token }
}

module.exports = LoginUser