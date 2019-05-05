'use strict'

const Genre = require('./Genre')

/**
 * Represents a tag of any type of content (anime / manga).
 * @extends {Genre}
 */
class ContentTag extends Genre {
    constructor(data) {
        super(data)
        this.data = data
    }

    /**
     * Does this tag fit the content?
     * 
     * * 0 = Unknown
     * * 1 = Fits
     * @type {number}
     * @readonly
     */
    get rateFlag() { return parseInt(this.data.rate_flag) }

    /**
     * Is this tag a spoiler?
     * 
     * * 0 = No spoiler
     * * 1 = Spoiler
     * 
     * **WARNING:**
     * 
     * `No spoiler` is the default value and
     * thus possible spoiler tags could be labelled
     * as `No spoiler` despite beeing a spoiler due to missing votes.
     */
    get spoilerFlag() { return this.data.spoiler_flag }
}

module.exports = ContentTag