'use strict'

const { classes, contentCategories } = require('../util/Constants')

const APIManager = require('../http/APIManager')
const Content = require('./Content')
const Anime = require('./Anime')
const Manga = require('./Manga')

class Client {
    constructor(apiKey) {
        this.api = new APIManager(this, apiKey)
    }

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
    search(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.ENTRY_SEARCH, optionalValues).then((data) => {
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
    categoricalSearch(optionalValues = { kat: contentCategories.ANIME }) {
        return new Promise((resolve, reject) => {
            this.api.post(classes.LIST, classes.list.ENTRY_LIST, optionalValues).then((data) => {
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

    

}

module.exports = Client