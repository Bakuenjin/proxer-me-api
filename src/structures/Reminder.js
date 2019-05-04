'use strict'

/**
 * Represents a reminder for a user for a specific content (anime / manga).
 */
class Reminder {
    constructor(data) {
        this.data = data
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
}

module.exports = Reminder