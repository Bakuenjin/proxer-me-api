'use strict'

const Content = require('./Content')
const Chapter = require('./Chapter')
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
                resolve(new Chapter(data))
            }).catch(reject)
        })
    }
}

module.exports = Manga