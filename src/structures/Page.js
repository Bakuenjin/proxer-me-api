'use strict'

/**
 * Represents a single page from a manga chapter
 */
class Page {
    constructor(data) {
        if (data) this.data = data
    }

    /**
     * The filename of the page
     * @type {string}
     * @readonly
     */
    get filename() { return this.data[0] }

    /**
     * The height of the page
     * @type {number}
     * @readonly
     */
    get height() { return parseInt(this.data[1]) }

    /**
     * The width of the page
     * @type {number}
     * @readonly
     */
    get width() { return parseInt(this.data[2]) }

    /**
     * The number of this page
     * @type {number}
     * @readonly
     */
    get pageNumber() { return this.data.index + 1 }

    /**
     * The url to the html page for this chapter page
     * @type {string}
     * @readonly
     */
    // TODO - actually do something here
    get url() { return this.data.url }

}

module.exports = Page