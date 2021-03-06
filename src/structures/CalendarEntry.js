'use strict'

/**
 * Represents an anime/manga as a calendar entry
 */
class CalendarEntry {
    constructor(data) {
        this.data = data
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
}

module.exports = CalendarEntry