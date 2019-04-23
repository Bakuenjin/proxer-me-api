'use strict'

const BaseAPI = require('./BaseAPI')
const Chapter = require('../../structures/Chapter')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').MANGA_API

/**
 * Represents the manga 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class MangaAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers information about a chapter of a manga specified by ID and number.
     * @param {number} id - The unique ID of the manga
     * @param {number} chapterNumber - The chapter number of the manga
     * @param {string} language - The language the chapter should be loaded in
     * @returns {Promise<Chapter>}
     */
    async chapter(id, chapterNumber, language) {
        const body = {
            id: id,
            episode: number,
            language: language
        }
        const data = this.httpClient.post(API_CLASS, API_FUNCTIONS.CHAPTER, body)
        data.chapterNumber = chapterNumber
        data.chapterLanguage = language
        return new Chapter(data)
    }

}

module.exports = MangaAPI