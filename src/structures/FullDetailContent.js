'use strict'

const Base = require('./Base')
const Company = require('./Company')
const TranslatorGroup = require('./TranslatorGroup')
const ContentThread = require('./ContentThread')
const Character  = require('./Character')
const Person = require('./Person')
const Season = require('./Season')
const Tag = require('./Tag')

/**
 * Represents any anime/manga including alot of details
 * @extends {Base}
 */
class FullDetailContent extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
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
     * The fsk ratings for this content
     * @type {string[]}
     * @readonly
     */
    get fsk() { return this.data.fsk.split(" ") }

    /**
     * The description for this content
     * @type {string}
     * @readonly
     */
    get description() { return this.data.description }

    /**
     * The adaption type for this content. Null if this content does not have any adaptation source.
     * @type {(string|null)}
     * @readonly
     */
    get adaptionType() { return (this.data.adaption_type ? this.data.adaption_type : null) }

    /**
     * The adaption value for this content. Null if this content does not have any adaptation source.
     * @type {(number|null)}
     * @readonly
     */
    get adaptionValue() { return (this.data.adaption_value ? parseInt(this.data.adaption_value) : null) }

    /**
     * The amount of clicks accumulated (resets every three month)
     * @type {number}
     * @readonly
     */
    get clicks() { return parseInt(this.data.clicks) }

    /**
     * The licence type of that content.
     * 0 = Unknown, 1 = Not licensed, 2 = Licensed
     * @type {number}
     * @readonly
     */
    get licence() { return this.data.license }

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
     * The rating of this media content
     * @param {number} base - The base for the rating calculation
     * @returns {number}
     */
    calculateRating(base = 10) {
        if (this.rateCount == 0) return 0
        const defaultBase = 10
        return (this.rateSum / this.rateCount / defaultBase * base)
    }

    /**
     * Is this content rated 18+?
     * @returns {boolean}
     */
    hasAdultGate() { return this.data.gate == "true" }

    /**
     * The languages this content is available at.
     * @returns {string[]}
     */
    getLanguages() { return this.data.lang }

    /**
     * The seasons of this content.
     * @returns {Season[]}
     */
    getSeasons() {
        const seasons = []
        for (let seasonInfo of this.data.seasons) 
            seasons.push(new Season(seasonInfo))
        return seasons
    }

    /**
     * The genres of this content.
     * @returns {string[]}
     */
    getGenres() { return this.data.genres.split(" ") }

    /**
     * The translator groups involved in this content.
     * @returns {TranslatorGroup[]}
     */
    getTranslatorGroups() {
        const groups = []
        for(let groupInfos of this.data.groups)
            groups.push(new TranslatorGroup(this.client, groupInfos))
        return groups
    }

    /**
     * The companies involved in this content.
     * @returns {Company[]}
     */    
    getCompanies() {
        const comps = []
        for(let compInfos of this.data.publisher)
            comps.push(new Company(this.client, compInfos))
        return comps
    }

    /**
     * The tags of this content.
     * @returns {Tag[]}
     */
    getTags() {
        const ts = []
        for(let tagInfos of this.data.tags)
            ts.push(new Tag(tagInfos))
        return ts
    }

    /**
     * The characters of this content.
     * @returns {Character[]}
     */
    getCharacters() {
        const chars = []
        for(let charInfo of this.data.characters)
            chars.push(new Character(charInfo))
        return chars
    }

    /**
     * The persons involved with this content.
     * @returns {Person[]}
     */
    getPersons() {
        const ps = []
        for(let pInfo of this.data.persons)
            ps.push(new Person(pInfo))
        return ps
    }

    /**
     * The threads of this content.
     * @returns {ContentThread[]}
     */
    getForumContent() {
        const threads = []
        for (let threadObj of this.data.forum)
            threads.push(new ContentThread(this.client, threadObj))
        return threads
    }

    /**
     * All possible names of this content.
     * @returns {object[]}
     */
    getNames() { return this.data.names }

}

module.exports = FullDetailContent