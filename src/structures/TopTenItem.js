'use strict'

const Base = require('./Base')
const Anime = require('./Anime')
const Manga = require('./Manga')
const { classes } = require('../util/Constants')

class TopTenItem extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of this top ten content element
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.eid) }

    /**
     * The name of the top ten content
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The category of the top ten content
     * @type {string}
     * @readonly
     */
    get category() { return this.data.kat }

    /**
     * The medium of the top ten content
     * @type {string}
     * @readonly
     */
    get medium() { return this.data.medium }

    /**
     * Gathers the information about this content
     * @returns {Promise<(Anime|Manga)>}
     */
    getContent() { return this.client.getContentById(this.id) }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Deletes this top-ten element from the currently logged in user.
     * If this top-ten element doesn't belong to the users top-ten, then and error is thrown.
     */
    delete() {
        const body = { id: this.id }
        return this.client.api.post(classes.UCP, classes.ucp.DELETE_FAVORITE, body)
    }
}

module.exports = TopTenItem