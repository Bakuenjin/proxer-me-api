'use strict'

const Base = require('./Base')
const Page = require('./Page')
const User = require('./User')
const TranslatorGroup = require('./TranslatorGroup')
const { classes } = require('../util/Constants')

/**
 * Represents a manga chapter
 */
class Chapter extends Base {
    constructor(client, data, pages) {
        super(client)
        if (data) this.data = data
        if (pages) this.pages = pages
        this.currentPageIndex = 0
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
     * @type {string|number}
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
     * The server id or link (needs further implementation, I am currently confused)
     * @type {string|number}
     * @readonly
     */
    get server() {
        // TODO - the actual implementation for the manga server stuff
        return null
    }

    /**
     * All pages this chapter contains.
     * You can use this and handle the page management yourself or
     * let the chapter object handle it for you.
     * @type {Page[]}
     * @readonly
     */
    get allPages() { return this.pages }

    /**
     * The currently selected page in this chapter
     * @type {Page}
     * @readonly
     */
    get currentPage() { return this.pages[this.currentPageIndex] }

    /**
     * The first page in this chapter
     * @type {Page}
     * @readonly
     */
    get firstPage() { return this.pages[0] }

    /**
     * The last page in this chapter
     * @type {Page}
     * @readonly
     */
    get lastPage() { return this.pages[this.length - 1] }
    
    /**
     * The amount of pages this chapter contains
     * @type {number}
     * @readonly
     */
    get length() { return this.pages.length }

    /**
     * Decrements the current page by 1 and returns it
     * @param {boolean} allowOverflow - Should decrement below 0 and handle edge case?
     * @returns {Page}
     */
    previous(allowOverflow = true) {
        if (this.currentPageIndex > 0)
            this.currentPageIndex--
        else if (allowOverflow && this.currentPageIndex <= 0)
            this.currentPageIndex = this.length - 1
        return this.currentPage
    }

    /**
     * Increments the current page by 1 and returns it
     * @param {boolean} allowOverflow - Should increment above length and handle adge case?
     * @returns {Page}
     */
    next(allowOverflow = true) {
        if (this.currentPageIndex < this.length - 1)
            this.currentPageIndex++
        else if (allowOverflow && this.currentPageIndex >= this.length)
            this.currentPageIndex = 0
        return this.currentPage
    }

    /**
     * Sets the current page to the specified index and returns it
     * @param {number} index - The index of the page
     * @returns {Page}
     */
    setCurrentPage(index = 0) {
        if(index >= 0 && index < this.length)
            this.currentPageIndex = index
        return this.currentPage
    }

    /**
     * Gathers information about the user that uploaded this chapter
     * @returns {Promise<User>}
     */
    getUploader() { return this.client.getUserById(this.uploaderId) }

    /**
     * Gathers information about the translator group that scanned this chapter
     * @returns {Promise<TranslatorGroup>}
     */
    getScanGroup() {  if(this.translatorId) return this.client.getTranslatorGroupById(this.translatorId) }

    /**
     * Loads the next chapter
     * @returns {Promise<Chapter>}
     */
    nextChapter() {
        return new Promise((resolve, reject) => {
            const body = {
                id: this.mangaId,
                episode: this.number + 1,
                language: this.language
            }
            this.client.api.post(classes.MANGA, classes.manga.CHAPTER, body).then((data) => {
                const pages = []
                for (let index in data.pages)
                    pages.push(new Page(data.pages[index], index))
                data.chapterNumber = chapter
                data.chapterLanguage = language
                resolve(new Chapter(this.client, data, pages))
            }).catch(reject)
        })
    }

    /**
     * Loads the previous chapter
     * @returns {Promise<Chapter>}
     */
    previousChapter() {
        return new Promise((resolve, reject) => {
            const body = {
                id: this.mangaId,
                episode: this.number - 1,
                language: this.language
            }
            this.client.api.post(classes.MANGA, classes.manga.CHAPTER, body).then((data) => {
                const pages = []
                for (let index in data.pages)
                    pages.push(new Page(data.pages[index], index))
                data.chapterNumber = body.episode
                data.chapterLanguage = body.language
                resolve(new Chapter(this.client, data, pages))
            }).catch(reject)
        })
    }
}

module.exports = Chapter