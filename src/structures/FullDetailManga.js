'use strict'

const FullDetailContent = require('./FullDetailContent')
const Chapter = require('./Chapter')

class FullDetailManga extends FullDetailContent {
    constructor(client, data) {
        super(client, data)
    }

    /**
     * This function returns a manga chapter. To receive points a user needs to be logged in.
     * @param {number} episode - The chapter number that should be loaded
     * @param {string} language - The language for the chapters
     * @returns {Promise<Chapter>}
     */
    getChapter(episode, language) {
        // TODO - Implement the API call
    }
}

module.exports = FullDetailManga