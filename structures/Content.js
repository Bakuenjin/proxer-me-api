'use strict'

const Base = require('./Base')
const { classes, contentCategories } = require('../util/Constants')
const FullDetailContent = require('./FullDetailContent')
const TranslatorGroup = require('./TranslatorGroup')
const Company = require('./Company')

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
        if(this.rateCount == 0) return 0
        const defaultBase = 10
        return (this.rateSum / this.rateCount / defaultBase * base)
    }

    /**
     * USE WITH CAUTION, VERY SERVER HEAVY!
     * This function gathers and returns absolutly every data this content has.
     * @returns {Promise<HighDetailContent>}
     */
    getFullDetails() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.FULL_ENTRY, body).then((data) => {
                resolve(new FullDetailContent(this.client, data))
            }).catch(reject)
        })
    }

    /**
     * Get all types of names or synonymes of a content
     * @returns {Promise<object[]}
     */
    getNames() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.NAMES, body)
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * this function gathers information about the R18 status of this content
     * @returns {Promse<boolean>}
     */
    hasAdultGate() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.GATE, body)
                .then(resolve)
                .catch(reject)
        })
        // TODO - Implement the actual API call for gathering R18 information
    }

    /**
     * Get all available (on proxer) languages of this content
     * @returns {Promise<string[]>}
     */
    getLanguages() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.LANGUAGES, body)
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * Get the seasons for this anime
     * @returns {Promise<object[]>}
     */
    getSeason() {
        return new Promise((resolve, reject) => {
            // TODO - Season class probably
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.SEASON, body)
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * Get all involved translator groups for this content
     */
    getTranslatorGroups() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.GROUPS, body).then((data) => {
                const tgResults = []
                for (let tgObj of data)
                    tgResults.push(new TranslatorGroup(this.client, tgObj))
                resolve(tgResults)
            }).catch(reject)
        })
    }
}

module.exports = Content