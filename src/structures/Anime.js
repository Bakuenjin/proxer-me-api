'use strict'

const Content = require('./Content')
const AnimeStream = require('./AnimeStream')

/**
 * Represents any anime on proxer.me
 * @extends {Content}
 */
class Anime extends Content {
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
        // TODO - Implement the actual API request to gather stream infos
    }

    /**
     * Returns all streams for a specific anime (including the proxer streams!).
     * @param {number} episode - The number of the episode
     * @param {string} language - The language of the streams
     * @returns {Promise<AnimeStream[]>}
     */
    getProxerStreams(episode, language) {
        // TODO - Implement the actual API request to gather stream infos with proxer streams
    }
}

module.exports = Anime