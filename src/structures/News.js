'use strict'

const Base = require('./Base')
const User = require('./User')
const { classes } = require('../util/Constants')

class News extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    get id() { return parseInt(this.data.nid) }

    get userId() { return parseInt(this.data.uid) }

    get forumThreadId() { return parseInt(this.data.mid) }

    get categoryId() { return parseInt(this.data.catid) }

    get description() { return this.data.description }

    get time() { return new Date(parseInt(this.data.time) * 1000) }

    get imageId() { return parseInt(this.data.iamge_id) }

    get image() { return `cdn.proxer.me/news/${this.id}_${this.imageId}.png` }

    get thumbnail() { return `cdn.proxer.me/news/th/${this.id}_${this.imageId}.png` }

    get imageStyle() { return this.data.image_style }

    get forumSubject() { return this.data.subject }

    get forumHits() { return this.data.hits }

    get forumLink() { return `proxer.me/forum/${this.categoryId}/${this.forumThreadId}` }

    get username() { return this.data.uname }

    get commentCount() { return this.data.posts }

    get categoryName() { return this.data.catname }

    /**
     * Gathers additional information about the user of this news
     * @returns {Promise<User>}
     */
    getUser() { return this.client.getUserById(this.userId) }

    // TODO - Probably other getXY() functions depending on API functionality.
}

module.exports = News