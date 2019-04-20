'use strict'

const FullDetailContent = require('./FullDetailContent')
const AnimeStream = require('./AnimeStream')
const EpisodeList = require('./EpisodeList')
const { classes } = require('../util/Constants')

/**
 * Represents an anime with every possible detail
 * @extends {FullDetailContent}
 */
class FullDetailAnime extends FullDetailContent {
    constructor(client, data) {
        super(client, data)
    }

    /**
     * Returns all streams for a specific anime (excluding the proxer streams!).
     * @param {number} episode - The number of the episode
     * @param {string} language - The language of the streams
     * @returns {Promise<AnimeStream[]>}
     */
    getStreams(episode, language) {
        return new Promise((resolve, reject) => {
            const body = {
                id: this.id,
                episode: episode,
                language: language
            }
            this.client.api.post(classes.ANIME, classes.anime.STREAMS, body).then((data) => {
                const streams = []
                for (let streamObj of data)
                    streams.push(new AnimeStream(this.client, streamObj))
                resolve(streams)
            }).catch(reject)
        })
    }

    /**
     * Returns all streams for a specific anime (including the proxer streams!).
     * @param {number} episode - The number of the episode
     * @param {string} language - The language of the streams
     * @returns {Promise<AnimeStream[]>}
     */
    getProxerStreams(episode, language) {
        return new Promise((resolve, reject) => {
            const body = {
                id: this.id,
                episode: episode,
                language: language
            }
            this.client.api.post(classes.ANIME, classes.anime.PROXER_STREAMS, body).then((data) => {
                const streams = []
                for (let streamObj of data)
                    streams.push(new AnimeStream(this.client, streamObj))
                resolve(streams)
            }).catch(reject)
        })
    }

    /**
     * Gathers a list of all episodes for this anime.
     * @param {object} optionalValues - The optional params
     * @param {number} [optionalValues.p] - The page to load. Default: 0.
     * @param {number} [optionalValues.limit] - The amount of episodes per page. Default: 50.
     * @returns {Promise<EpisodeList>}
     */
    getEpisodeList(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.id = this.id
            this.client.api.post(classes.INFO, classes.info.LIST_INFO, optionalValues).then((data) => {
                resolve(new EpisodeList(this.client, data))
            }).catch(reject)
        })  
    }
}

module.exports = FullDetailAnime