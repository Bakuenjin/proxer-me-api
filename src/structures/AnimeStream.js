'use strict'

/**
 * Represents an anime stream on proxer.me
 */
class AnimeStream {
    constructor(data) {
        this.data = data
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
}

module.exports = AnimeStream