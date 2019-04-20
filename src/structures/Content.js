'use strict'

const Base = require('./Base')
const { classes, contentCategories } = require('../util/Constants')
const FullDetailContent = require('./FullDetailContent')
const FullDetailAnime = require('./FullDetailAnime')
const FullDetailManga = require('./FullDetailManga')
const TranslatorGroup = require('./TranslatorGroup')
const Company = require('./Company')
const Character = require('./Character')
const Person = require('./Person')
const Comment = require('./Comment')
const ContentThread = require('./ContentThread')
const Season = require('./Season')
const Tag = require('./Tag')

/**
 * Represents any type of media content (Anime / Manga)
 * @extends {Base}
 */
class Content extends Base {
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
    get genres() { return this.data.genre.split(' ') }

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
     * The category of this media content
     * @type {string}
     * @readonly
     */
    get category() { return this.data.kat }

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
     * The rating of this media content.
     * @param {number} base - The base for the rating calculation
     * @returns {number}
     */
    calculateRating(base = 10) {
        if (this.rateCount == 0) return 0
        const defaultBase = 10
        return (this.rateSum / this.rateCount / defaultBase * base)
    }

    /**
     * USE WITH CAUTION, VERY SERVER HEAVY!
     * 
     * This function gathers and returns absolutly every data this content has.
     * @returns {Promise<FullDetailContent>}
     */
    getFullDetails() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.FULL_ENTRY, body).then((data) => {
                if (data.kat == contentCategories.ANIME)
                    resolve(new FullDetailAnime(this.client, data))
                else if (data.kat == contentCategories.MANGA)
                    resolve(new FullDetailManga(this.client, data))
            }).catch(reject)
        })
    }

    /**
     * Get all types of names or synonymes of a content.
     * @returns {Promise<object>}
     */
    getNames() {
        const body = { id: this.id }
        return this.client.api.post(classes.INFO, classes.info.NAMES, body)
    }

    /**
     * Gathers information about the R18 status of this content.
     * @returns {Promise<boolean>}
     */
    hasAdultGate() {
        const body = { id: this.id }
        return this.client.api.post(classes.INFO, classes.info.GATE, body)
    }

    /**
     * Get all available languages of this content (on proxer).
     * @returns {Promise<string[]>}
     */
    getLanguages() {
        const body = { id: this.id }
        return this.client.api.post(classes.INFO, classes.info.LANGUAGES, body)
    }

    /**
     * Get the seasons for this anime.
     * @returns {Promise<Season[]>}
     */
    getSeasons() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.SEASON, body).then((data) => {
                const seasons = []
                for (let seasonObj of data)
                    seasons.push(new Season(seasonObj))
                resolve(seasons)
            }).catch(reject)
        })
    }

    /**
     * Get all involved translator groups for this content.
     * @returns {Promise<TranslatorGroup[]>}
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

    /**
     * Get all involved companies for this content.
     * @returns {Promise<Company[]>}
     */
    getCompanies() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.PUBLISHER, body).then((data) => {
                const compResults = []
                for (let compObj of data)
                    compResults.push(new Company(this.client, compObj))
                resolve(compResults)
            }).catch(reject)
        })
    }

    /**
     * Get comments for this content.
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.p] - The page to load. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of comments per page. Default: 25.optionalValues
     * @param {string} [optionalValues.sort] - Changes the sort type. Default: newest.
     * @returns {Promise<Comment[]>}
     */
    getComments(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.id = this.id
            this.client.api.post(classes.INFO, classes.info.COMMENTS, optionalValues).then((data) => {
                const commResults = []
                for (let commObj of data)
                    commResults.push(new Comment(this.client, commObj))
                resolve(commResults)
            }).catch(reject)
        })
    }

    /**
     * Get all relational contents for this content (can include both, anime and manga).
     * @param {object} optionalValues - The optional params
     * @param {object} [optionalValues.isH] - Should hentai be included in the relation results?
     * @returns {Promise<Content[]>}
     */
    getRelations(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.id = this.id
            this.client.api.post(classes.INFO, classes.info.RELATIONS, optionalValues).then((data) => {
                const Anime = require('./Anime')
                const Manga = require('./Manga')
                const contentResults = []
                for (let contentObj of data) {
                    if (contentObj.kat == contentCategories.ANIME)
                        contentResults.push(new Anime(this.client, contentObj))
                    else if (contentObj.kat == contentCategories.MANGA)
                        contentResults.push(new Manga(this.client, contentObj))
                }
                resolve(contentResults)
            }).catch(reject)
        })
    }

    /**
     * Get all tags of this content.
     * @returns {Promise<Tag[]>}
     */
    getTags() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.ENTRY_TAGS, body).then((data) => {
                const tagResults = []
                for (let tagObj of data)
                    tagResults.push(new Tag(tagObj))
                resolve(tagResults)
            }).catch(reject)
        })
    }

    /**
     * Get all characters of this content.
     * @returns {Promise<Character[]>}
     */
    getCharacters() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.CHARACTERS, body).then((data) => {
                const charResults = []
                for (let charObj of data)
                    charResults.push(new Character(charObj))
                resolve(charResults)
            }).catch(reject)
        })
    }

    /**
     * Get all persons involved in this content.
     * @returns {Promise<Person[]>}
     */
    getPersons() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.PERSONS, body).then((data) => {
                const pResults = []
                for (let pObj of data)
                    pResults.push(new Person(pObj))
                resolve(pResults)
            }).catch(reject)
        })
    }

    /**
     * Get all forum threads for this content.
     * @returns {Promise<ContentThread[]>}
     */
    getThreads() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.INFO, classes.info.FORUM, body).then((data) => {
                const ftResults = []
                for (let ftObj of data)
                    ftResults.push(new ContentThread(this.client, ftObj))
                resolve(ftResults)
            }).catch(reject)
        })
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Sets the watched progress for this content.
     * @param {number} value - The progress number for this content
     * @returns {Promise}
     */
    setProgress(value) {
        const body = { id: this.id, value: value }
        return this.client.api.post(classes.UCP, classes.ucp.SET_COMMENT_STATE, body)
    }

    /**
     * NEEDS A LOGGED IN USER!
     * Sets a reminder for this content with a specified episode and language.
     * @param {number} episode - The episode for the reminder
     * @param {string} language The language for the content
     * @returns {Promise}
     */
    setReminder(episode, language) {
        const body = {
            id: this.id,
            episode: episode,
            language: language,
            kat: this.category
        }
        return this.client.api.post(classes.UCP, classes.ucp.SET_REMINDER, body)
    }
}

module.exports = Content