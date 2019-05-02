'use strict'

/**
 * Represents an entry of a user-comment.
 */
class UCPEntry{
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the entry
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.cid) }

    /**
     * The unique ID of the content
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.id) }

    /**
     * The name of the content
     * @type {string}
     * @readonly
     */
    get name() { return this.data.username }

    /**
     * The amount of episodes/chapters of the content
     * @type {number}
     * @readonly
     */
    get episodeCount() { return parseInt(this.data.count) }

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
    get contentState() { return this.data.estate }

    /**
     * The state of the comment
     * @type {string}
     * @readonly
     */
    get commentState() { return this.data.state }

    /**
     * The text of the content
     * @type {string}
     * @readonly
     */
    get commentText() { return this.data.comment }

    /**
     * The episode number the user watched
     * @type {number}
     * @readonly
     */
    get viewedEpisode() { return parseInt(this.data.episode) }

    /**
     * Additional details about the comment
     * @type {string}
     * @readonly
     */
    get details() { return this.data.data }

    /**
     * The rating the user placed for the content
     * @type {number}
     * @readonly
     */
    get rating() { return parseInt(this.data.rating) }

    /**
     * The timestamp when the user submitted this comment
     * @type {Date}
     * @readonly
     */
    get timestamp() { return new Date(parseInt(this.data.timestamp) * 1000) }
}

module.exports = UCPEntry