'use strict'

class Page {
    constructor(data, index) {
        if (data) this.data = data
        this.index = index
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

}

module.exports = Page