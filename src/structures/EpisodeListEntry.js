'use strict'

/**
 * Represents an entry of the EpisodeList class.
 */
class EpisodeListEntry {
    constructor(data) {
        this.data = data
    }

    /**
     * The number of this episode entry
     * @type {number}
     * @readonly
     */
    get number() { return parseInt(this.data.no) }

     /**
     * The language of this entry
     * @type {string}
     * @readonly
     */
    get language() { return this.data.type }

    /**
     * The name of the hosters of this episode
     * @type {string[]}
     * @readonly
     */
    get hoster() { return this.data.types.split(',') }

    /**
     * The links of the hosters logo images
     * @type {string[]}
     * @readonly
     */
    get hosterImages() { return this.data.typeimg.split(',') }
}

module.exports = EpisodeListEntry