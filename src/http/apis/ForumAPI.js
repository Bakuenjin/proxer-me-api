'use strict'

const BaseAPI = require('./BaseAPI')
const ForumThread = require('../../structures/ForumThread')
const ForumPost = require('../../structures/ForumPost')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').FORUM_API

/**
 * Represents the forum 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class ForumAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers information about a forum thread specified by id.
     * @param {number} id - The unique ID of the forum thread
     * @param {object} optionalValues - All optional params
     * @param {number} [optionalValues.p] - The page of posts to load. Default: 0
     * @param {number} [optionalValues.limit] - The amount of posts per page. Default: 15.
     * @returns {Promise<ForumThread>}
     */
    async topic(id, optionalValues = {}) {
        optionalValues.id = id
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.TOPIC, optionalValues)
        const posts = []
        for (let postObj of data.posts)
            posts.push(new ForumPost(postObj))
        data.id = id
        data.posts = posts
        return new ForumThread(data)
    }
}

module.exports = ForumAPI