'use strict'

const Content = require('./Content')
const Chapter = require('./Chapter')
const Page = require('./Page')
const { classes } = require('../util/Constants')

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
                // const pages = []
                // for (let index in data.pages)
                //     pages.push(new Page(data.pages[index], index))
                data.chapterNumber = chapter
                data.chapterLanguage = language
                resolve(new Chapter(this.client, data))
            }).catch(reject)
        })
    }
}

module.exports = Manga