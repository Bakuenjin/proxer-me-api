'use strict'

const BaseAPI = require('./BaseAPI')
const Content = require('../../structures/Content')
// const Anime = require('../../structures/Anime')
// const Manga = require('../../structures/Manga')
const TagFilter = require('../../structures/TagFilter')
const Tag = require('../../structures/Tag')
const TranslatorGroup = require('../../structures/TranslatorGroup')
const Company = require('../../structures/Company')
const Project = require('../../structures/Project')
const Character = require('../../structures/Character')
const Person = require('../../structures/Person')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').LIST_API
// const { contentCategories } = require('../../util/Constants')

/**
 * Represents the list 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class ListAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Casts an advanced search for anime or manga.
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.name] - The name of the content. Scans for exact and loose matches.
     * @param {string} [optionalValues.language] - The languages of the content. Default: both.
     * @param {string} [optionalValues.type] - The type of the content
     * @param {string[]} [optionalValues.genre] - The genres of the content
     * @param {string[]} [optionalValues.nogenre] - The genres the content should not have
     * @param {string[]} [optionalValues.taggenre] - The tag genres of the content (new system)
     * @param {string[]} [optionalValues.notaggenre] - The tag genres the content should not have (new system)
     * @param {string} [optionalValues.fsk] - The fsk rating of the content
     * @param {string} [optionalValues.sort] - How the results should be sorted
     * @param {number} [optionalValues.length] - The limit number the anime either should have or shouldn't exceed.
     * @param {number} [optionalValues.lengthType] - How the length should be used. Default: smaller or equal limit.
     * @param {string[]} [optionalValues.tags] - The tags of the content
     * @param {string[]} [optionalValues.notags] - The tags the results should not contain. Default: none.
     * @param {string} [optionalValues.tagratefilter] - What tag types should be taken into account.
     * @param {string} [optionalValues.tagspoilerfilter] - How spoilers should be taken into account. Default: No spoiler.
     * @param {number} [optionalValues.p] - The result page to load. Default: 0.
     * @param {number} [optionalValues.limit] - How many content entries should be loaded? Default: 100.
     * @returns {Promise<Content[]>}
     */
    async search(optionalValues = {}) {
        if (optionalValues.tags) optionalValues.tags = optionalValues.tags.join(" ")
        if (optionalValues.notags) optionalValues.notags = optionalValues.notags.join(" ")
        if (optionalValues.genre) optionalValues.genre = optionalValues.genre.join(" ")
        if (optionalValues.nogenre) optionalValues.nogenre = optionalValues.nogenre.join(" ")
        if (optionalValues.taggenre) optionalValues.taggenre = optionalValues.taggenre.join(" ")
        if (optionalValues.notaggenre) optionalValues.notaggenre = optionalValues.notaggenre.join(" ")
        if (optionalValues.lengthType) {
            optionalValues["length-limit"] = optionalValues.lengthType
            delete optionalValues.lengthType
        } 
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ENTRY_SEARCH, optionalValues)
        const results = data.map(it => new Content(it))
        return results
    }

    /**
     * Casts a search for a specific content type (anime or manga).
     * @param {object} optionalValues - The optional params
     * @param {string} [optionalValues.kat] - Tha category of the search results. Default: anime.
     * @param {string} [optionalValues.medium] - The medium type of the content
     * @param {boolean} [optionalValues.isH] - Should the result contain hentai? Default: false.
     * @param {number} [optionalValues.state] - The state of the content. Default: No state filtering.
     * @param {number} [optionalValues.year] - The year the content got publicated.
     * @param {number} [optionalValues.season] - The season the content got publicated.
     * @param {string} [optionalValues.season_type] - What type of connection the content and season has. Default: start.
     * @param {string} [optionalValues.start] - The beginning of the content name.
     * @param {string} [optionalValues.sort] - How the results should be sorted.
     * @param {string} [optionalValues.sort_type] - Ascending or descending sorting. Default: ASC, false values: DESC.
     * @param {number} [optionalValues.p] - Which result page should be loaded. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of content entries one page should contain. Default: 100.
     * @returns {Promise<Content[]>}
     */
    async categoricalSearch(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ENTRY_LIST, optionalValues)
        const results = data.map(it => new Content(it))
        return results
    }

    /**
     * Filters the the valid and invalid tags of a string.
     * @param {string} searchText - The text that should contain tag ids.
     * @returns {Promise<TagFilter>}
     */
    async tagIds(searchText) {
        const body = { search: searchText }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TAG_IDS, body)
        const result = new TagFilter(data)
        return result
    }

    /**
     * Lists all tags based on (optional) parameters.
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.search] - Only tags whos name or description contains this value will be returned
     * @param {string} [optionalValues.type] - What type of tag should be returned
     * @param {string} [optionalValues.sort] - Returns list based on the element to sort by
     * @param {string} [optionalValues.sort_type] - Descending or Ascending. Default: ASC, invalid values: DESC
     * @param {string} [optionalValues.subtype] - The subtype of the tags
     * @returns {Promise<Tag[]>}
     */
    async tags(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TAGS, optionalValues)
        const results = data.map(it => new Tag(it))
        return results
    }

    /**
     * Lists all translator groups based on (optional) parameters.
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the translator groups name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the translator groups name should include
     * @param {string} [optionalValues.country] - Allows filtering translator groups via language
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page. Default: 100.
     * @returns {Promise<TranslatorGroup[]>}
     */
    async translatorGroups(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TRANSLATOR_GROUPS, optionalValues)
        const results = data.map(it => new TranslatorGroup(it))
        return results
    }

    /**
     * Lists all projects of a translator group based on its id.
     * @param {number} id - The unique ID of the translator group
     * @param {object} optionalValues - Contains all optional params
     * @param {number} [optionalValues.type] - The translation status
     * @param {number} [optionalValues.isH] - Toggles hentai content
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Project[]>}
     */
    async translatorGroupProjects(id, optionalValues = {}) {
        optionalValues.id = id
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TRANSLATOR_GROUP_PROJECTS, optionalValues)
        const results = data.map(it => new Project(it))
        return results
    }

    /**
     * Lists all companies based on (optional) parameters.
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the company name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the company name should include
     * @param {string} [optionalValues.country] - Allows filtering companies via language
     * @param {string} [optionalValues.type] - Allows filtering by the type of the companies work
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Company[]>}
     */
    async industries(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.INDUSTRIES, optionalValues)
        const results = data.map(it => new Company(it))
        return results
    }

    /**
     * Lists all projects of a company based on its id.
     * @param {number} id - The unique ID of the company.
     * @param {object} optionalValues - Contains all optional params
     * @param {number} [optionalValues.type] - The translation status
     * @param {number} [optionalValues.isH] - Toggles hentai content
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Project[]>}
     */
    async industryGroupProjects(id, optionalValues = {}) {
        optionalValues.id = id
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.INDUSTRY_PROJECTS, optionalValues)
        const results = data.map(it => new Project(it))
        return results
    }

    /**
     * Lists all characters based on (optional) parameters.
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the character name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the character name should include
     * @param {string} [optionalValues.search] - Defines the substring the character description should include
     * @param {string} [optionalValues.subject] - Defines the section of the description that should be returned
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Character[]>}
     */
    async characters(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CHARACTERS, optionalValues)
        const results = data.map(it => new Character(it))
        return results
    }

    /**
     * Lists all persons based on (optional) parameters.
     * @param {object} optionalValues - Contains all optional params
     * @param {string} [optionalValues.start] - Defines the substring the persons name should begin with
     * @param {string} [optionalValues.contains] - Defines the substring the persons name should include
     * @param {string} [optionalValues.search] - Defines the substring the persons description should include
     * @param {string} [optionalValues.subject] - Defines the section of the description that should be returned
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Person[]>}
     */
    async persons(optionalValues = {}) {
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.PERSONS, optionalValues)
        const results = data.map(it => new Person(it))
        return results
    }
}

module.exports = ListAPI