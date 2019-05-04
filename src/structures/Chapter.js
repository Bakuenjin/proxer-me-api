'use strict'

const Page = require('./Page')
const PageBuilder = require('../util/PageBuilder')

/**
 * Represents a manga chapter
 */
class Chapter{
    constructor(data) {
        this.data = data
        const pageBuilder = new PageBuilder(this.mangaId, this.id, this.server)
        this.data.pages = pageBuilder.buildAll(this.data.pages)
    }

    /**
     * The unique ID of the chapter
     * @type {number}
     * @readonly
     */
    get id() { return this.data.cid }

    /**
     * The unique ID of the manga
     * @type {number}
     * @readonly
     */
    get mangaId() { return this.data.eid }

    /**
     * The name of the manga
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The amount of chapters this manga contains
     * @type {number}
     * @readonly
     */
    get chapterCount() { return this.data.count }

    /**
     * The title of this chapter
     * @type {string}
     * @readonly
     */
    get title() { return this.data.title }

    /**
     * The ID of the user that uploaded this stream
     * @type {number}
     * @readonly
     */
    get uploaderId() { return this.data.uploader }

    /**
     * The name of the user that uploaded this stream
     * @type {string}
     * @readonly
     */
    get uploaderName() { return this.data.username }

    /**
     * The timestamp of the moment this stream got linked on proxer.me
     * @type {Date}
     * @readonly
     */
    get uploadTimestamp() { return new Date(parseInt(this.data.timestamp) * 1000) }

    /**
     * The ID of the translator group, null when no group is defined
     * @type {number|null}
     * @readonly
     */
    get translatorId() { return (this.data.tid ? parseInt(this.data.tid) : null) }

    /**
     * The name of the translator group, null when no group is defined
     * @type {string|null}
     * @readonly
     */
    get translatorName() { return (this.data.tname ? this.data.tname : null) }

    /**
     * The number of this chapter
     * @type {number}
     * @readonly
     */
    get number() { return this.data.chapterNumber }

    /**
     * The language of this chapter
     * @type {string}
     * @readonly
     */
    get language() { return this.data.chapterLanguage }

    /**
     * The server id or link
     * @type {string|number}
     * @readonly
     */
    get server() { return this.data.server }

    /**
     * All pages this chapter contains.
     * @type {Page[]}
     * @readonly
     */
    get allPages() { return this.data.pages }

    /**
     * The amount of pages this chapter contains
     * @type {number}
     * @readonly
     */
    get length() { return this.data.pages.length }
}

module.exports = Chapter