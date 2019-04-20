'use strict'

const Base = require('./Base')
const User = require('./User')
const ForumThread = require('./ForumThread')
const { classes } = require('../util/Constants')

/**
 * Represents a single news entry on Proxer.me
 * @extends {Base}
 */
class News extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the news
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.nid) }

    /**
     * The unique ID of the user that submitted the news
     * @type {number}
     * @readonly
     */
    get userId() { return parseInt(this.data.uid) }

    /**
     * The unique ID of the forum thread for this news
     * @type {number}
     * @readonly
     */
    get forumThreadId() { return parseInt(this.data.mid) }

    /**
     * The unique ID of the forum category for this news
     * @type {number}
     * @readonly
     */
    get categoryId() { return parseInt(this.data.catid) }

    /**
     * A small description what this news element talks about
     * @type {number}
     * @readonly
     */
    get description() { return this.data.description }

    /**
     * The timestamp of the moment this news element got posted
     * @type {Date}
     * @readonly
     */
    get timestamp() { return new Date(parseInt(this.data.time) * 1000) }

    /**
     * The unique ID of the image of this news
     * @type {number}
     * @readonly
     */
    get imageId() { return parseInt(this.data.iamge_id) }

    /**
     * The image link for this news element
     * @type {string}
     * @readonly
     */
    get image() { return `cdn.proxer.me/news/${this.id}_${this.imageId}.png` }

    /**
     * The thumbnail of this news element
     * @type {string}
     * @readonly
     */
    get thumbnail() { return `cdn.proxer.me/news/th/${this.id}_${this.imageId}.png` }

    /**
     * The style of this image (Not 100% sure what is meant is CSS-conform)
     * @type {string}
     * @readonly
     */
    get imageStyle() { return this.data.image_style }

    /**
     * The title of the forum thread for this news element
     * @type {string}
     * @readonly
     */
    get forumSubject() { return this.data.subject }

    /**
     * The amount of views of the forum thread
     * @type {number}
     * @readonly
     */
    get forumHits() { return this.data.hits }

    /**
     * Generates a valid URL to open the current thread on a browser
     * @type {string}
     * @readonly
     */
    get forumLink() { return `proxer.me/forum/${this.categoryId}/${this.forumThreadId}` }

    /**
     * The name of the user that submitted this news element
     * @type {string}
     * @readonly
     */
    get username() { return this.data.uname }

    /**
     * The amount of comments this thread contains
     * @type {number}
     * @readonly
     */
    get commentCount() { return this.data.posts }

    /**
     * The name of the category of this news element
     * @type {string}
     * @readonly
     */
    get categoryName() { return this.data.catname }

    /**
     * Gathers additional information about the user of this news
     * @returns {Promise<User>}
     */
    getUser() { return this.client.getUserById(this.userId) }

    /**
     * Gets the forum thread corresponding to this news article.
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.p] - The page of posts to load. Default: 0
     * @param {number} [optionalValues.limit] - The amount of posts per page.
     * @returns {Promise<ForumThread>}
     */
    getForumThread(optionalValues = {}) { return this.client.getForumThreadById(this.forumThreadId, optionalValues) }
}

module.exports = News