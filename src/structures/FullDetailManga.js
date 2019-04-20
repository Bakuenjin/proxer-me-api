'use strict'

const FullDetailContent = require('./FullDetailContent')
const Chapter = require('./Chapter')
const ChapterList = require('./ChapterList')
const { classes } = require('../util/Constants')

/**
 * Represents a manga with every possible detail
 * @extends {FullDetailContent}
 */
class FullDetailManga extends FullDetailContent {
    constructor(client, data) {
        super(client, data)
    }

    /**
     * This function returns a manga chapter. To receive points a user needs to be logged in.
     * @param {number} chapter - The chapter number that should be loaded
     * @param {string} language - The language for the chapters
     * @returns {Promise<Chapter>}
     */
    getChapter(chapter, language) {
        return new Promise((resolve, reject) => {
            const body = {
                id: this.id,
                episode: chapter,
                language: language
            }
            this.client.api.post(classes.MANGA, classes.manga.CHAPTER, body).then((data) => {
                data.chapterNumber = chapter
                data.chapterLanguage = language
                resolve(new Chapter(this.client, data))
            }).catch(reject)
        })
    }

    /**
     * Gathers a list of all chapters for this manga.
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.p] - The page to load. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of episodes per page. Default: 50.
     * @param {boolean} [optionalValues.includeNotAvailableChapters] - Should this list include chapters that are not available on Proxer.me yet?
     * @returns {Promise<ChapterList>}
     */
    getChapterList(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.id = this.id
            this.client.api.post(classes.INFO, classes.info.LIST_INFO, optionalValues).then((data) => {
                resolve(new ChapterList(this.client, data))
            }).catch(reject)
        })  
    }
}

module.exports = FullDetailManga