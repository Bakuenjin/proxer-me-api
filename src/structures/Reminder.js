'use strict'

const Base = require('./Base')
const Anime = require('./Anime')
const Manga = require('./Manga')
const { classes } = require('../util/Constants')

class Reminder extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the reminder
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the anime / manga
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.eid) }

    /**
     * The name of the content
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The category of the content
     * @type {string}
     * @readonly
     */
    get category() { return this.data.kat }

    /**
     * The amount of episodes/chapters the content has
     * @type {number}
     * @readonly
     */
    get episodeCount() { return parseInt(this.data.episode) }

    /**
     * The language of the content
     * @type {string}
     * @readonly
     */
    get language() { return this.data.language }

    /**
     * The medium of the content
     * @type {string}
     * @readonly
     */
    get medium() { return this.data.medium }

    /**
     * The state of the content
     * @type {string}
     * @readonly
     */
    get state() { return this.data.state }

    /**
     * The chapter name of this content (only if the content is a manga)
     * @type {string}
     * @readonly
     */
    get chapterName() { return (this.data.chapterName ? this.data.chapterName : null) }

    /**
     * The category of the content
     * @type {boolean}
     * @readonly
     */
    get available() { return this.data.available == "1" }

    /**
     * Gathers the anime / manga for this reminder
     * @returns {Promise<(Anime|Manga)>}
     */
    getContent() { return this.client.getContentById(this.contentId) }

    /**
     * NEEDS A LOGGED IN USER!
     * Deletes this reminder (if it belongs to the currently logged in user).
     * @returns {Promise}
     */
    delete() { 
        const body = { id: this.id }
        return this.client.api.post(classes.UCP, classes.ucp.DELETE_REMINDER, body) 
    }

}

module.exports = Reminder