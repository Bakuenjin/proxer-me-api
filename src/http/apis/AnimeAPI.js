'use strict'

const BaseAPI = require('./BaseAPI')
const AnimeStream = require('../../structures/AnimeStream')
const StreamLink = require('../../structures/StreamLink')
const { API_CLASS, API_FUNCTIONS } = require('../../util/Constants').ANIME_API

/**
 * Represents the anime 'class' of the http API from Proxer.me
 * @extends {BaseAPI}
 */
class AnimeAPI extends BaseAPI {
    constructor(httpClient) {
        super(httpClient)
    }

    /**
     * Gathers information about the streams this anime has.
     * @param {number} id - The unique ID of the anime.
     * @param {number} episode The episode number of the anime.
     * @param {string} language - The language of the streams.
     * @returns {Promise<AnimeStream[]>}
     */
    async streams(id, episode, language) {
        const body = {
            id: id,
            episode: episode,
            language: language
        }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.STREAMS, body)
        const aniStreams = data.map(it => new AnimeStream(it))
        return aniStreams
    }

    /**
     * Gathers information about the streams this anime has including the Proxer streams.
     * @param {number} id - The unique ID of the anime.
     * @param {number} episode The episode number of the anime.
     * @param {string} language - The language of the streams.
     * @returns {Promise<AnimeStream[]>}
     */
    async proxerStreams(id, episode, language) {
        const body = {
            id: id,
            episode: episode,
            language: language
        }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.PROXER_STREAMS, body)
        const aniStreams = data.map(it => new AnimeStream(it))
        return aniStreams
    }

    /**
     * Gathers the link of a stream.
     * @param {number} id - The unique ID of the anime stream to retrieve the link from.
     * @returns {Promise<StreamLink>}
     */
    async link(id) {
        const body = { id: id }
        const link = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LINK, body)
        return new StreamLink({ link: link }) 
    }

    /**
     * Gathers the link of a streams together with a VAST tag.
     * @param {number} id - The unique ID of the anime stream to retrieve the link from.
     * @returns {Promise<StreamLink>}
     */
    async vastLink(id) {
        const body = { id: id }
        const data = await this.httpClient.post(API_CLASS, API_FUNCTIONS.LINK_WITH_VAST, body)
        return new StreamLink(data)
    }
}

module.exports = AnimeAPI