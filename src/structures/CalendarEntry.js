'use strict'

const Base = require('./Base')
const Anime = require('./Anime')
const Manga = require('./Manga')

/**
 * Represents an anime/manga as a calendar entry
 */
class CalendarEntry extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the calendar entry
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the media content
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.eid) }

    // get episode() { return this.data.episode }

    /**
     * The title of the episode this entry is holding
     * @type {string}
     * @readonly
     */
    get episodeTitle() { return this.data.episodeTitle }

    /**
     * The time this episode is going to release (german time)
     * @type {Date}
     * @readonly
     */
    get releaseTime() { return new Date(parseInt(this.data.time) * 1000) }

    /**
     * Gets the anime / manga content for this calendar entry
     * @returns {Promise<(Anime|Manga)>}
     */
    getContent() { return this.client.getContentById(this.contentId) }
    
}

module.exports = CalendarEntry