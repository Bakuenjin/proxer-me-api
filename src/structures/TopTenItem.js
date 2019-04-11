'use strict'

const Base = require('./Base')
const Anime = require('./Anime')
const Manga = require('./Manga')

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

    // TODO - ask admin about it
    // ??? This cant work based on the defined top ten element in the proxer API
    // delete() {
    //     const body = { id: this.id }
    // }
}

module.exports = TopTenItem