'use strict'

const Base = require('./Base')
const { contentCategories } = require('../util/Constants')

/**
 * Represents any type of media content (Anime / Manga)
 * @extends {Base}
 */
class Content extends Base {
    constructor(client, data) {
        super(client)
        if(data) this.data = data
    }

    /**
     * The unique ID of the media content
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the media content
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The genres of this media content
     * @type {string[]}
     * @readonly
     */
    get genres() { return this.data.genres.split(' ') }

    /**
     * The medium type of this media content
     * @type {string}
     * @readonly
     */
    get medium() { return this.data.medium }

    /**
     * The amount of episodes this media content contains
     * @type {number}
     * @readonly
     */
    get episodeCount() { return parseInt(this.data.count) }

    /**
     * The state of this media content
     * @type {number}
     * @readonly
     */
    get state() { return parseInt(this.data.state) }

    /**
     * The sum of all ratings for this media content
     * @type {number}
     * @readonly
     */
    get rateSum() { return parseInt(this.data.rate_sum) }

    /**
     * The amount of ratings for this media content
     * @type {number}
     * @readonly
     */
    get rateCount() { return parseInt(this.data.rate_count) }

    /**
     * The languages this media content is translated to
     * @type {string[]}
     * @readonly
     */
    get languages() { return this.data.language.split(',') }

    /**
     * Is this content an anime
     * @type {boolean}
     * @readonly
     */
    get isAnime() { return this.data.kat == contentCategories.ANIME }

    /**
     * Is this content a manga
     * @type {boolean}
     * @readonly
     */
    get isManga() { return this.data.kat == contentCategories.MANGA }

    /**
     * The rating of this media content
     * @param {number} base - The base for the rating calculation
     * @returns {number}
     */
    calculateRating(base = 10) {
        const defaultBase = 10
        return (this.rateSum / this.rateCount / defaultBase * base)
    }

    /**
     * USE WITH CAUTION, VERY SERVER HEAVY!
     * This function gathers and returns absolutly every data this content has.
     * @returns {Promise<HighDetailContent>}
     */
    getFullDetails() {
        // TODO - Implement the actual API call for gathering full details about the content entry
    }

    /**
     * This function gathers and returns additional content
     * @returns {Promise<DetailContent>}
     */
    getDetails() {
        // TODO - Implement the actual API call for gathering additional details
    }

    getNames() {

    }

    /**
     * this function gathers information about the R18 status of this content
     * @returns {boolean}
     */
    hasAdultGate() {
        // TODO - Implement the actual API call for gathering R18 information
    }
}

module.exports = Content