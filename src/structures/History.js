'use strict'

const Base = require('./Base')
const Anime = require('./Anime')
const Manga = require('./Manga')

class History extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the history entry
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the content
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.eid) }

    /**
     * The name of the content this history entry represents
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The language of the viewed content
     * @type {string}
     * @readonly
     */
    get language() { return this.data.language }

    /**
     * The viewed episode/chapter of the content
     * @type {string}
     * @readonly
     */
    get viewedEpisode() { return this.data.episode }

    /**
     * The medium type of this history entry
     * @type {string}
     * @readonly
     */
    get medium() { return this.data.medium }

    /**
     * The category type of the content this entry represents
     * @type {string}
     * @readonly
     */
    get category() { return this.data.category }

    /**
     * Gathers information about this content
     * @returns {Promise<(Anime|Manga)>}
     */
    getContent() { return this.client.getContentById(this.contentId) }
}

module.exports = History