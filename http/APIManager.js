const Base = require('../structures/Base')
const { API_BASE, contentCategories, classes } = require('../util/Constants')

const Content = require('../structures/Content')
const Anime = require('../structures/Anime')
const AnimeStream = require('../structures/AnimeStream')
const StreamLink = require('../structures/StreamLink')
const Manga = require('../structures/Manga')
const Chapter = require('../structures/Chapter')
const Industry = require('../structures/Industry')
const TranslatorGroup = require('../structures/TranslatorGroup')
const Project = require('../structures/Project')
const Tag = require('../structures/Tag')
const User = require('../structures/User')

const request = require('./RequestHandler')
const UrlBuilder = require('./UrlBuilder')

// MOCK requirements
// const fs = require('fs')
// const path = require('path')

class APIManager extends Base {
    constructor(client, apiKey) {
        super(client)
        this.urlBuilder = new UrlBuilder(API_BASE)
        this.defaultHeaders = {
            "proxer-api-key": apiKey,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    // ++++ USER ++++

    /**
     * Logs the user into proxer.me
     * @param {string} username - The username for the user that wants to log in
     * @param {string} password - The password for the user that wants to log in
     * @param {string} secretkey - The 2FA key for the user that wants to log in
     * @returns {Promise<User>}
     */
    userLogin(username, password, secretkey) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.USER, classes.user.LOGIN)
            const body = {
                username: username,
                password: password,
                secretkey: secretkey
            }
            request(url, 'POST', this.defaultHeaders, body).then((data) => {
                // Would create user here
                resolve(new User())
            }).catch(reject)
        })
    }

    // TODO - The other user API calls.

    // ++++ LIST ++++

    /**
     * Cast a search based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.name] - The name of the content. Scans for exact and loose matches.
     * @param {string} [optionalValues.language] - The languages of the content. Default: both.
     * @param {string} [optionalValues.type] - The type of the content
     * @param {string[]} [optionalValues.genre] - The genres of the content
     * @param {string[]} [optionalValues.nogenre] - The genres the content should not have
     * @param {string[]} [optionalValues.taggenre] - The tag genres of the content (new system)
     * @param {string[]} [optionalValues.notaggenre] - The tag genres the content should not have (new system)
     * @param {string} [optionalValues.fsk] - The fsk rating of the content
     * @param {string} [optionalValues.sort] - How the results should be sorted
     * @param {number} [optionalValues.length] - The amount of episodes the content should have
     * @param {string[]} [optionalValues.tags] - The tags of the content
     * @param {string[]} [optionalValues.notags] - The tags the content should not have
     * @param {string} [optionalValues.tagratefilter] - Defines what type of tags should be taken into account
     * @param {string} [optionalValues.tagspoilerfilter] - Defines how spoiler tags should be handled
     * @param {number} [optionalValues.p] - Which result page should be loaded. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of content entries one page should contain. Default: 100.
     * @returns {Promise<Content[]>}
     */
    listEntrySearch(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.ENTRY_SEARCH)
            request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
                const searchResult = []
                for (let result of data) {
                    if (result.kat == contentCategories.ANIME)
                        searchResult.push(new Anime(this.client, result))
                    else if (result.kat == contentCategories.MANGA)
                        searchResult.push(new Manga(this.client, result))
                }
                resolve(searchResult)
            }).catch(reject)
        })
    }

    /**
     * Casts a categorial search based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.kat] - The category. Default: anime.
     * @param {string} [optionalValues.medium] - The medium type of the content
     * @param {string|boolean} [optionalValues.isH] - Should the result contain hentai
     * @param {number} [optionalValues.state] - The state of the content
     * @param {number} [optionalValues.year] - The year the content got publicated
     * @param {number} [optionalValues.season] - The season the content got publicated
     * @param {string} [optionalValues.season_type] - The type of the season
     * @param {string} [optionalValues.start] - The beginning of the content name
     * @param {string} [optionalValues.sort] - How the results should be sorted
     * @param {string} [optionalValues.sort_type] - Ascending or descending sorting. Default: ASC, false values: DESC
     * @param {number} [optionalValues.p] - Which result page should be loaded. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of content entries one page should contain. Default: 100.
     * @returns {Promise<Anime[]>|Promise<Manga[]>}
     */
    listEntryList(optionalValues = { kat: contentCategories.ANIME }) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.ENTRY_LIST)
            request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
                const searchResult = []
                if (optionalValues.kat == contentCategories.ANIME) {
                    for (let result of data) {
                        result.kat = contentCategories.ANIME
                        searchResult.push(new Anime(this.client, result))
                    }
                }
                else {
                    for (let result of data) {
                        result.kat = contentCategories.MANGA
                        searchResult.push(new Manga(this.client, result))
                    }
                }
                resolve(searchResult)
            }).catch(reject)
        })
    }

    /**
     * Scans the string for valid tags and returns them seperated by the numeral sign.
     * @param {string} search - Should contain space-seperated tags. Can have numeral sign in front of tag.
     * @returns {Promise<object>}
     */
    listTagIds(search) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.TAG_IDS)
            const body = { search: search }

            // TODO - Maybe restructure this into more functionality (tag class maybe?)
            request(url, 'POST', this.defaultHeaders, body)
                .then(resolve)
                .catch(reject)
        })
    }

    /**
     * Lists all tags based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.search] - Only tags whos name or description contains this value will be returned
     * @param {string} [optionalValues.type] - What type of tag should be returned
     * @param {string} [optionalValues.sort] - Returns list based on the element to sort by
     * @param {string} [optionalValues.sort_type] - Descending or Ascending. Default: ASC, invalid values: DESC
     * @param {string} [optionalValues.subtype] - The subtype of the tags
     * @returns {Promise<Tag[]>}
     */
    listTags(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.TAGS)
            request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
                const tagResults = []
                for(let tagObj of data)
                    tagResults.push(new Tag(tagObj))
                resolve(tagResults)
            }).catch(reject)
        })
    }

    /**
     * Lists all translator groups based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the translator groups name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the translator groups name should include
     * @param {string} [optionalValues.country] - Allows filtering translator groups via language
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<TranslatorGroup[]}
     */
    listTranslatorGroups(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.TRANSLATOR_GROUPS)
            request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
                const tgResults = []
                for (let tgObj of data)
                    tgResults.push(new TranslatorGroup(this.client, tgObj))
                resolve(tgResults)
            }).catch(reject)
        })
    }

    /**
     * Lists all projects of a translator group based on its id
     * @param {number} id - The id of the translator group
     * @param {object} optionalValues - Contains all optional params
     * @param {number} [optionalValues.type] - The translation status
     * @param {number} [optionalValues.isH] - Toggles hentai content
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Project[]>}
     */
    listTranslatorGroupProjects(id, optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.TRANSLATOR_GROUP_PROJECTS)
            if(optionalValues)
            request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
                const tgpResults = []
                for (let tgpObj of data)
                    tgpResults.push(new Project(this.client, tgpObj))
                resolve(tgpResults)
            }).catch(reject)
        })
    }

    /**
     * Lists all industry companies based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the company name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the company name should include
     * @param {string} [optionalValues.country] - Allows filtering companies via language
     * @param {string} [optionalValues.type] - Allows filtering by the type of the companies work
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Industry[]>}
     */
    listIndustries(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.LIST, classes.list.INDUSTRIES)
            request (url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
                const industryResults = []
                for (let industryObj of data)
                    industryResults.push(new Industry(this.client, industryObj))
                resolve(industryResults)
            }).catch(reject)
        })
    }

}

module.exports = APIManager