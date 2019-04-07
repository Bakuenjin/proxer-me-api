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
const requestBuilder = require('./RequestBuilder')
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

    /**
     * Constructs an API call via 'POST'.
     * @param {string} urlClass - The first chunk of the API call
     * @param {string} urlFunction - The second chunk of the API call
     * @param {Object} body - The payload for the API call
     * @returns {Promise<Object>}
     */
    post(urlClass, urlFunction, body = {}) {
        const url = this.urlBuilder.build(urlClass, urlFunction)
        const requestParams = requestBuilder.postRequest(this.defaultHeaders, body)
        console.log(requestParams)
        return request(url, requestParams)
    }

    /**
     * Constructs an API call via 'GET'
     * @param {string} urlClass - The first chunk of the API call
     * @param {string} urlFunction - The second chunk of the API call
     * @param {Object} queryValues - THe query values for the API call
     * @returns {Promise<Object>}
     */
    get(urlClass, urlFunction, queryValues = {}) {
        const url = this.urlBuilder.build(urlClass, urlFunction)
        const queryString = UrlBuilder.generateQueryString(queryValues)

        const queryUrl = url + "?" + queryString
        const requestParams = requestBuilder.getRequest(this.defaultHeaders)
        return request(queryUrl, requestParams)
    }

    // ++++ USER ++++

    // /**
    //  * Logs the user into proxer.me
    //  * @param {string} username - The username for the user that wants to log in
    //  * @param {string} password - The password for the user that wants to log in
    //  * @param {string} secretkey - The 2FA key for the user that wants to log in
    //  * @returns {Promise<User>}
    //  */
    // userLogin(username, password, secretkey) {
    //     return new Promise((resolve, reject) => {
    //         const url = this.urlBuilder.build(classes.USER, classes.user.LOGIN)
    //         const body = {
    //             username: username,
    //             password: password,
    //             secretkey: secretkey
    //         }
    //         request(url, 'POST', this.defaultHeaders, body).then((data) => {
    //             // Would create user here
    //             resolve(new User())
    //         }).catch(reject)
    //     })
    // }

    // TODO - The other user API calls.

    // /**
    //  * Scans the string for valid tags and returns them seperated by the numeral sign.
    //  * @param {string} search - Should contain space-seperated tags. Can have numeral sign in front of tag.
    //  * @returns {Promise<object>}
    //  */
    // listTagIds(search) {
    //     return new Promise((resolve, reject) => {
    //         const url = this.urlBuilder.build(classes.LIST, classes.list.TAG_IDS)
    //         const body = { search: search }

    //         // TODO - Maybe restructure this into more functionality (tag class maybe?)
    //         request(url, 'POST', this.defaultHeaders, body)
    //             .then(resolve)
    //             .catch(reject)
    //     })
    // }

    // /**
    //  * Lists all tags based on (optional) parameters
    //  * @param {object} optionalValues - Contains all optional params
    //  * @param {string} [optionalValues.search] - Only tags whos name or description contains this value will be returned
    //  * @param {string} [optionalValues.type] - What type of tag should be returned
    //  * @param {string} [optionalValues.sort] - Returns list based on the element to sort by
    //  * @param {string} [optionalValues.sort_type] - Descending or Ascending. Default: ASC, invalid values: DESC
    //  * @param {string} [optionalValues.subtype] - The subtype of the tags
    //  * @returns {Promise<Tag[]>}
    //  */
    // listTags(optionalValues = {}) {
    //     return new Promise((resolve, reject) => {
    //         const url = this.urlBuilder.build(classes.LIST, classes.list.TAGS)
    //         request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
    //             const tagResults = []
    //             for(let tagObj of data)
    //                 tagResults.push(new Tag(tagObj))
    //             resolve(tagResults)
    //         }).catch(reject)
    //     })
    // }

    // /**
    //  * Lists all translator groups based on (optional) parameters
    //  * @param {object} optionalValues - Contains all optional params
    //  * @param {string} [optionalValues.start] - Defines the substring the translator groups name should begin with
    //  * @param {string} [optionalValues.contains] - Defines the substring the translator groups name should include
    //  * @param {string} [optionalValues.country] - Allows filtering translator groups via language
    //  * @param {number} [optionalValues.p] - The result page to load
    //  * @param {number} [optionalValues.limit] - The amount of results for each page
    //  * @returns {Promise<TranslatorGroup[]}
    //  */
    // listTranslatorGroups(optionalValues = {}) {
    //     return new Promise((resolve, reject) => {
    //         const url = this.urlBuilder.build(classes.LIST, classes.list.TRANSLATOR_GROUPS)
    //         request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
    //             const tgResults = []
    //             for (let tgObj of data)
    //                 tgResults.push(new TranslatorGroup(this.client, tgObj))
    //             resolve(tgResults)
    //         }).catch(reject)
    //     })
    // }

    // /**
    //  * Lists all projects of a translator group based on its id
    //  * @param {number} id - The id of the translator group
    //  * @param {object} optionalValues - Contains all optional params
    //  * @param {number} [optionalValues.type] - The translation status
    //  * @param {number} [optionalValues.isH] - Toggles hentai content
    //  * @param {number} [optionalValues.p] - The result page to load
    //  * @param {number} [optionalValues.limit] - The amount of results for each page
    //  * @returns {Promise<Project[]>}
    //  */
    // listTranslatorGroupProjects(id, optionalValues = {}) {
    //     return new Promise((resolve, reject) => {
    //         const url = this.urlBuilder.build(classes.LIST, classes.list.TRANSLATOR_GROUP_PROJECTS)
    //         if(optionalValues)
    //         request(url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
    //             const tgpResults = []
    //             for (let tgpObj of data)
    //                 tgpResults.push(new Project(this.client, tgpObj))
    //             resolve(tgpResults)
    //         }).catch(reject)
    //     })
    // }

    // /**
    //  * Lists all industry companies based on (optional) parameters
    //  * @param {object} optionalValues - Contains all optional params
    //  * @param {string} [optionalValues.start] - Defines the substring the company name should begin with
    //  * @param {string} [optionalValues.contains] - Defines the substring the company name should include
    //  * @param {string} [optionalValues.country] - Allows filtering companies via language
    //  * @param {string} [optionalValues.type] - Allows filtering by the type of the companies work
    //  * @param {number} [optionalValues.p] - The result page to load
    //  * @param {number} [optionalValues.limit] - The amount of results for each page
    //  * @returns {Promise<Industry[]>}
    //  */
    // listIndustries(optionalValues = {}) {
    //     return new Promise((resolve, reject) => {
    //         const url = this.urlBuilder.build(classes.LIST, classes.list.INDUSTRIES)
    //         request (url, 'POST', this.defaultHeaders, optionalValues).then((data) => {
    //             const industryResults = []
    //             for (let industryObj of data)
    //                 industryResults.push(new Industry(this.client, industryObj))
    //             resolve(industryResults)
    //         }).catch(reject)
    //     })
    // }

}

module.exports = APIManager