'use strict'

const { seasonTypes } = require('../util/Constants')

/**
 * Represents an anime season.
 */
class Season {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the season
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the anime / manga
     * @type {number}
     * @readonly
     */
    get contentId() { return parseInt(this.data.eid) }

    /**
     * The name of this season:
     * 
     * `winter` | `spring` | `summer` | `fall`
     * 
     * To receive the season as a number, use the `number` property.
     * @type {string}
     * @readonly
     */
    get name() { return seasonTypes[this.number] }

    /**
     * The year of this season
     * @type {number}
     * @readonly
     */
    get year() { return parseInt(this.data.year) }

    /**
     * The number of this season:
     * 
     * * 0 = winter
     * * 1 = spring
     * * 2 = summer
     * * 3 = fall
     * 
     * To receive the season as a string, use the `name` property.
     * @type {number}
     * @readonly
     */
    get number() { return parseInt(this.data.season) }
}

module.exports = Season