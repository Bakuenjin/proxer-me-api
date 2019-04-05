'user strict'

class StreamLink {
    constructor(data) {
        if(data) this.data = data
    }

    /**
     * The actual stream link
     * @type {string}
     * @readonly
     */
    get link() { return this.data.link }

    /**
     * The vast tag for the stream, if it exists
     * @type {string|null}
     * @readonly
     */
    get vastTag() { return (this.data.adTag ? this.data.adTag : null) }

}

module.exports = StreamLink