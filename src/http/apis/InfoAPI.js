'use strict'

const BaseAPI = require('./BaseAPI')
const Content = require('../../structures/Content')
const FullDetailContent = require('../../structures/FullDetailContent')
const Name = require('../../structures/Name')
const Season = require('../../structures/Season')
const TranslatorGroup = require('../../structures/TranslatorGroup')
const Company = require('../../structures/Company')
const Comment = require('../../structures/Comment')
const ContentTag = require('../../structures/ContentTag')
const Genre = require('../../structures/Genre')
const Character = require('../../structures/Character')
const Person = require('../../structures/Person')
const ContentThread = require('../../structures/ContentThread')
const UserListSearchResult = require('../../structures/UserListSearchResult')
const Recommendation = require('../../structures/Recommendation')
const PersonDetails = require('../../structures/PersonDetails')
const CharacterDetails = require('../../structures/CharacterDetails')
const EpisodeList = require('../../structures/EpisodeList')
const ChapterList = require('../../structures/ChapterList')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').INFO_API
const { contentCategories } = require('../../util/Constants')

/**
 * Represents the apps 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class InfoAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers all possible information about a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<FullDetailContent>}
     */
    async fullContent(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.FULL_ENTRY, body)
        return new FullDetailContent(data)
    }

    /**
     * Gathers basic information about a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Content>}
     */
    async content(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ENTRY, body)
        return new Content(data)
    }
    
    /**
     * Gathers all possible names of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Name[]>}
     */
    async names(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.NAMES, body)
        const results = data.map(it => new Name(it))
        return results
    }

    /**
     * Is the content specified by ID rated R18+?
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<boolean>}
     */
    async hasAdultGate(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.GATE, body)
        return data == "true"
    }

    /**
     * Gathers all available languages of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<string[]>}
     */
    async languages(id) {
        const body = { id: id }
        return await this.httpClient.post(API_CLASS, API_FUNCTIONS.ENTRY, body)
    }

    /**
     * Gathers all relevant seasons of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Season[]>}
     */
    async seasons(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.SEASON, body)
        const results = data.map(it => new Season(it))
        return results
    }

    /**
     * Gathers all relevant translator groups of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<TranslatorGroup[]>}
     */
    async translatorGroups(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.GROUPS, body)
        const results = data.map(it => new TranslatorGroup(it))
        return results
    }

    /**
     * Gathers all relevant companies of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Company[]>}
     */
    async companies(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.PUBLISHER, body)
        const results = data.map(it => new Company(it))
        return results
    }

    /**
     * Gathers all comments of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @param {object} optionalValues - The optional params.
     * @param {number} [optionalValues.p] - The page to load from the comments. Starts at 0, default is 0.
     * @param {number} [optionalValues.limit] - The amount of comments per page. Default: 25.
     * @param {string} [optionalValues.sort] - The way to sort the comments. Use value `rating` to sort by rating. Default: sorted by new.
     * @returns {Promise<Comment[]>}
     */
    async comments(id, optionalValues = {}) {
        optionalValues.id = id
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.COMMENTS, optionalValues)
        const results = data.map(it => new Comment(it))
        return results
    }

    /**
     * Gathers all relations the content specified by ID has.
     * @param {number} id - The unique ID of the content.
     * @param {object} optionalValues - The optional params.
     * @param {boolean} [optionalValues.isH] - Should this contain hentai? Default: `false`.
     * @returns {Promise<Content[]>}
     */
    async relations(id, optionalValues = {}) {
        optionalValues.id = id
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.RELATIONS, optionalValues)
        const results = data.map(it => new Content(it))
        return results
    }

    /**
     * Gathers all characters of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Character[]>}
     */
    async characters(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CHARACTERS, body)
        const results = data.map(it => new Character(it))
        return results
    }

    /**
     * Gathers all persons that were involved in the content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Person[]>}
     */
    async characters(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.PERSONS, body)
        const results = data.map(it => new Person(it))
        return results
    }

    /**
     * Gathers all relevant tags of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<ContentTag[]>}
     */
    async contentTags(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ENTRY_TAGS, body)
        const results = data.map(it => new ContentTag(it))
        return results
    }

    /**
     * Gathers all relevant genres of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Genre[]>}
     */
    async contentGenres(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.ENTRY_GENRES, body)
        const results = data.map(it => new Genre(it))
        return results
    }

    /**
     * Gathers information about a translator group specified by ID.
     * @param {number} id - The unique ID of the translator group.
     * @returns {Promise<TranslatorGroup>}
     */
    async translatorGroup(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TRANSLATOR_GROUP, body)
        return new TranslatorGroup(data)
    }

    /**
     * Gathers information about a company specified by ID.
     * @param {number} id - The unique ID of the company.
     * @returns {Promise<Company>}
     */
    async company(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.INDUSTRY, body)
        return new Company(data)
    }

    /**
     * Gathers information about all forum threads of a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<ContentThread[]>}
     */
    async contentThreads(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.FORUM, body)
        const results = data.map(it => new ContentThread(it))
        return results
    }

    /**
     * Gathers recommendations for a content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<Recommendation[]>}
     */
    async recommendations(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.RECOMMENDATIONS, body)
        const results = data.map(it => new Recommendation(it))
        return results
    }

    /**
     * Searches the lists of the logged in user for the content specified by ID.
     * @param {number} id - The unique ID of the content.
     * @returns {Promise<UserListSearchResult>}
     */
    async searchUserList(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.GET_USERINFO, body)
        return new UserListSearchResult(data)
    }

    /**
     * Adds a content specified by ID to the specified list of the user.
     * @param {number} id - The unique ID of the content.
     * @param {string} listType - The name of the list to add this content to.
     */
    async addUserList(id, listType) {
        const body = { id: id, type: listType }
        await this.httpClient.post(API_CLASS, API_FUNCTIONS.SET_USERINFO, body)
    }

    /**
     * Gathers additional details about a person.
     * @param {number} id - The unique ID of the person.
     * @returns {Promise<PersonDetails>}
     */
    async person(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.PERSON, body)
        return new PersonDetails(data)
    }

    /**
     * Gathers additional details about a character.
     * @param {number} id - The unique ID of the character.
     * @returns {Promise<CharacterDetails>}
     */
    async character(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.CHARACTER, body)
        return new CharacterDetails(data)
    }

    /**
     * Gathers a list of episodes / chapters for the content.
     * @param {number} id - The uniqie ID of the content.
     * @param {object} optionalValues - The optional params.
     * @param {number} [optionalValues.p] - The page to load. Starts at 0, default is 0.
     * @param {number} [optionalValues.limit] - The amount of episodes/chapter to load per page. Default: 50.
     * @param {number} [optionalValues.includeNotAvailableChapters] - (Only relevant for ChapterLists)
     * Should this list include chapters that aren't available yet?
     * 
     * Default: `false`.
     * @returns {Promise<(EpisodeList|ChapterList)>}
     */
    async contentInfoList(id, optionalValues = {}) {
        optionalValues.id = id
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LIST_INFO, optionalValues)
        return (data.kat == contentCategories.ANIME ? new EpisodeList(data) : new ChapterList(data))
    }
}

module.exports = InfoAPI