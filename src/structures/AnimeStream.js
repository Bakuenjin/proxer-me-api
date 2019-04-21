'use strict'

const Base = require('./Base')
const StreamLink = require('./StreamLink')
const User = require('./User')
const TranslatorGroup = require('./TranslatorGroup')
const { classes } = require('../util/Constants')

/**
 * Represents an anime stream on proxer.me
 * @extends {Base}
 */
class AnimeStream extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the anime
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the anime
     * @type {string}
     * @readonly
     */
    get name() { return this.data.entryname }

    /**
     * The amount of episodes this anime contains
     * @type {number}
     * @readonly
     */
    get episodeCount() { return parseInt(this.data.count) }

    /**
     * The hoster for this stream
     * @type {string}
     * @readonly
     */
    get hoster() { return this.data.type }

    /**
     * The name of the hoster
     * @type {string}
     * @readonly
     */
    get hostName() { return this.data.name }

    /**
     * The image of the host
     * @type {string}
     * @readonly
     */
    get hosterImg() { return this.data.img }

    /**
     * Is this a legal hoster with a valid licence of this anime
     * @type {boolean}
     * @readonly
     */
    get legal() { return this.data.legal == "1" }

    /**
     * Is this stream public viewable (accessable without a proxer.me account)
     * @type {boolean}
     * @readonly
     */
    get public() { return this.data.public == "1" }

    /**
     * The ID of the user that uploaded this stream
     * @type {number}
     * @readonly
     */
    get uploaderId() { return parseInt(this.data.uploader) }
 
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
     * The specific type the hoster is serving the stream in
     * @type {string}
     * @readonly
     */
    get streamType() { return this.data.htype }

    /**
     * Get the link for the stream.
     * @returns {Promise<StreamLink>} The stream link object
     */
    getLink() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.ANIME, classes.anime.LINK, body).then((data) => {
                const streamLinkObj = { link: data }
                resolve(new StreamLink(streamLinkObj))
            }).catch(reject)
        })
    }

    /**
     * Get the VAST link for the stream.
     * @returns {Promise<StreamLink>} The stream link object
     */
    getVastLink() {
        return new Promise((resolve, reject) => {
            const body = { id: this.id }
            this.client.api.post(classes.ANIME, classes.anime.LINK_WITH_VAST, body).then((data) => {
                resolve(new StreamLink(data))
            }).catch(reject)
        })
    }

    /**
     * Gathers information about the user that uploaded this stream.
     * @returns {Promise<User>}
     */
    getUploader() { return this.client.getUserById(this.uploaderId) }

    /**
     * Gathers information about the translator group that translated this stream.
     * @returns {Promise<TranslatorGroup>}
     */
    getTranslatorGroup() { return this.client.getTranslatorGroupById(this.translatorId) }
}

module.exports = AnimeStream