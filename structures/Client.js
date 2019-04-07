'use strict'

const { classes, contentCategories } = require('../util/Constants')

const APIManager = require('../http/APIManager')
const Content = require('./Content')
const Anime = require('./Anime')
const Manga = require('./Manga')
const Company = require('./Company')
const TranslatorGroup = require('./TranslatorGroup')
const Character = require('./Character')
const Person = require('./Person')
const Tag = require('./Tag')

class Client {
    constructor(apiKey) {

        /**
         * The API manager of the client.
         */
        this.api = new APIManager(this, apiKey)
    }

    /**
     * Cast a search for anime/manga based on (optional) parameters
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
    search(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.ENTRY_SEARCH, optionalValues).then((data) => {
                const searchResult = []
                for (let result of data) {
                    if (result.kat == contentCategories.ANIME)
                        searchResult.push(new Anime(this, result))
                    else if (result.kat == contentCategories.MANGA)
                        searchResult.push(new Manga(this, result))
                }
                resolve(searchResult)
            }).catch(reject)
        })
    }

    /**
     * Casts a categorical search for anime/manga based on (optional) parameters
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
    categoricalSearch(optionalValues = { kat: contentCategories.ANIME }) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.ENTRY_LIST, optionalValues).then((data) => {
                const searchResult = []
                if (optionalValues.kat == contentCategories.ANIME) {
                    for (let result of data) {
                        result.kat = contentCategories.ANIME
                        searchResult.push(new Anime(this, result))
                    }
                }
                else {
                    for (let result of data) {
                        result.kat = contentCategories.MANGA
                        searchResult.push(new Manga(this, result))
                    }
                }
                resolve(searchResult)
            }).catch(reject)
        })
    }

    /**
     * Scans the string for valid tags and returns them seperated by the numeral sign.
     * @param {(string|string[])} data - Should contain space-seperated tags. Can have numeral sign in front of tag.
     * @returns {Promise<object>}
     */
    filterTagIds(data) {
        return new Promise((resolve, reject) => {
            let payload = ""
            if (typeof data === "string")
                payload = data
            else if (Array.isArray(data))
                payload = data.join(" ")
            else reject(new TypeError("data needs to be String or String[]"))
            const body = {
                search: payload
            }
            this.api.post(classes.LIST, classes.list.TAG_IDS, body)
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
    searchTags(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.TAGS, optionalValues).then((data) => {
                const tagResults = []
                for (let tagObj of data)
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
     * @param {number} [optionalValues.limit] - The amount of results for each page. Default: 100.
     * @returns {Promise<TranslatorGroup[]}
     */
    searchTranslatorGroups(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.TRANSLATOR_GROUPS, optionalValues).then((data) => {
                const tgResults = []
                for (let tgObj of data)
                    tgResults.push(new TranslatorGroup(this, tgObj))
                resolve(tgResults)
            }).catch(reject)
        })
    }

    /**
     * Lists all companies based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the company name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the company name should include
     * @param {string} [optionalValues.country] - Allows filtering companies via language
     * @param {string} [optionalValues.type] - Allows filtering by the type of the companies work
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Company[]>}
     */
    searchCompanies(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.INDUSTRIES, optionalValues).then((data) => {
                const companyResults = []
                for (let companyObj of data)
                    companyResults.push(new Company(this, companyObj))
                resolve(companyResults)
            }).catch(reject)
        })
    }

    /**
     * Lists all characters based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the character name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the character name should include
     * @param {string} [optionalValues.search] - Defines the substring the character description should include
     * @param {string} [optionalValues.subject] - Defines the section of the description that should be returned
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Character[]>}
     */
    searchCharacters(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.CHARACTERS, optionalValues).then((data) => {
                const charResults = []
                for (let charObj of data)
                    charResults.push(new Character(charObj))
                resolve(charResults)
            }).catch(reject)
        })
    }

    /**
     * Lists all persons based on (optional) parameters
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the persons name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the persons name should include
     * @param {string} [optionalValues.search] - Defines the substring the persons description should include
     * @param {string} [optionalValues.subject] - Defines the section of the description that should be returned
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Person[]>}
     */
    searchPersons(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.PERSONS, optionalValues).then((data) => {
                const pResults = []
                for (let pObj of data)
                    pResults.push(new Person(pObj))
                resolve(pResults)
            }).catch(reject)
        })
    }

    /**
     * Gets the anime / manga content for the specified ID.
     * @param {number} id - The unique ID of this content
     * @returns {(Anime|Manga)}
     */
    getContentById(id) {
        return new Promise((resolve, reject) => {
            const body = { id: id }
            this.api.post(classes.INFO, classes.info.ENTRY, body).then((data) => {
                if (data.kat == contentCategories.ANIME)
                    resolve(new Anime(this, data))
                else if (data.kat == contentCategories.MANGA)
                    resolve(new Manga(this, data))
                else reject(new Error("Missing or wrong content category."))
            })
        })
    }

    
}

module.exports = Client