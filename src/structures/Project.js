'use strict'

const Base = require('./Base')

class Project extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the project
     * @type {number}
     * @readonly
     */
    get id() { return this.data.id }

    /**
     * The name of the project
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The genres of this project
     * @type {string[]}
     * @readonly
     */
    get genres() { return this.data.genres.split(' ') }

    /**
     * The fsk symboles of this project
     * @type {string[]}
     * @readonly
     */
    get fsk() { return this.data.fsk }

    /**
     * The medium type of this project
     * @type {string}
     * @readonly
     */
    get medium() { return this.data.medium }

    /**
     * Translation status of this project
     */
    get type() { return this.data.type }

    /**
     * The state of this project
     * @type {number}
     * @readonly
     */
    get state() { return parseInt(this.data.state) }

    /**
     * The sum of all ratings for this project
     * @type {number}
     * @readonly
     */
    get rateSum() { return parseInt(this.data.rate_sum) }

    /**
     * The amount of ratings for this project
     * @type {number}
     * @readonly
     */
    get rateCount() { return parseInt(this.data.rate_count) }

    /**
     * The rating of this project
     * @param {number} base - The base for the rating calculation
     * @returns {number}
     */
    calculateRating(base = 10) {
        if(this.rateCount == 0) return 0
        const defaultBase = 10
        return (this.rateSum / this.rateCount / defaultBase * base)
    }
}

module.exports = Project