'use strict'

/**
 * Represents a single stream link for an anime stream
 */
class StreamLink {
    constructor(data) {
        this.data = data
    }

    /**
     * The actual stream link
     * @type {string}
     * @readonly
     */
    get url() { return this.data.link }

    /**
     * The vast tag for the stream. Is null when there isn't a vast tag.
     * @type {string|null}
     * @readonly
     */
    get vastTag() { return (this.data.adTag ? this.data.adTag : null) }

}

module.exports = StreamLink