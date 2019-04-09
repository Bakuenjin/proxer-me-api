/**
 * Represents the typical website header image.
 */
class Header {
    constructor(data) {
        if (data) this.data = data
    }

    /**
     * The unique ID of this header image
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.gid) }

    /**
     * The url to the header image
     * @type {string}
     * @readonly
     */
    get image() { return `cdn.proxer.me/gallery/originals/${this.data.catpath}/${this.data.imgfilename}` }
}

module.exports = Header