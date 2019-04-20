'use strict'

const Content = require('./Content')
const Chapter = require('./Chapter')
const { classes } = require('../util/Constants')
const ChapterList = require('./ChapterList')

/**
 * Represents any manga on proxer.me
 * @extends {Content}
 */
class Manga extends Content {
    constructor(client, data) {
        super(client, data)
    }

    /**
     * This function returns a manga chapter. To receive points a user needs to be logged in.
     * @param {number} chapterNumber - The chapter number that should be loaded
     * @param {string} language - The language for the chapter
     * @returns {Promise<Chapter>}
     */
    getChapter(chapterNumber, language) {
        return new Promise((resolve, reject) => {
            const body = {
                id: this.id,
                episode: chapterNumber,
                language: language
            }
            this.client.api.post(classes.MANGA, classes.manga.CHAPTER, body).then((data) => {
                data.chapterNumber = chapterNumber
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

module.exports = Manga