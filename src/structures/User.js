'use strict'

const Avatar = require('./Avatar')

/**
 * Represents a Proxer.me user.
 */
class User {
    constructor(data) {
        this.data = data
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
    get avatar() { return new Avatar(this.data.avatar) }

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
}

module.exports = User