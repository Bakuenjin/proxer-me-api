'use strict'

const Page = require('../structures/Page')

class PageBuilder {
    constructor(mangaId, chapterId, server) {
        this.mangaId = mangaId
        this.chapterId = chapterId
        this.server = server
    }

    /**
     * Converts a single page object in the clean object orientated equivalent
     * @param {any[]} pageObj - The raw page object
     * @param {number} index - The index of the current page
     * @returns {Page}
     */
    build(pageObj, index) {
        const url = (isNaN(parseInt(this.server)) ?
            this.server :
            `manga${this.server}.proxer.me/f/${this.mangaId}/${this.chapterId}/${pageObj[0]}`)
        pageObj.index = index
        pageObj.url = url
        return new Page(pageObj)
    }

    /**
     * Converts an array of raw page objects into the clean object orientated equivalent
     * @param {object[]} pages - The raw page objects
     * @returns {Page[]}
     */
    buildAll(pages) {
        const finalPages = []
        for (let index in pages) {
            const pageObj = pages[index]
            finalPages.push(this.build(pageObj, index))
        }
        return finalPages
    }
}

module.exports = PageBuilder