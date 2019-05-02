'use strict'

/**
 * Represents a history entry of a user (his watch/read history)
 */
class History {
    constructor(data) {
        this.data = data
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
}

module.exports = History