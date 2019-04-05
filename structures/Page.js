'use strict'

class Page {
    constructor(data, index, url) {
        if (data) this.data = data
        this.index = index
        this.url = url
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
    get pageNumber() { return this.index + 1 }

    /**
     * The url to the html page for this chapter page
     * @type {string}
     * @readonly
     */
    get url() { return this.link }

}

module.exports = Page