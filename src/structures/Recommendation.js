'use strict'

const Content = require('./Content')

/**
 * Represents a recommendation of an anime / manga.
 * @extends {Content}
 */
class Recommendation extends Content {
    constructor(data) {
        super(data)
        this.data = data
    }

    /**
     * The amount of users that voted positive about this recommendation.
     * @type {number}
     * @readonly
     */
    get positiveCount() { return parseInt(this.data.count_positive) }

    /**
     * The amount of users that voted negative about this recommendation.
     * @type {number}
     * @readonly
     */
    get negativeCount() { return parseInt(this.data.count_negative) }

    /**
     * Has the currently logged in user casted a vote for this recommendation?
     * * `0` = negative Vote
     * * `1` = positive Vote
     * * `null` = No vote or no logged in user
     * @type {(number|null)}
     * @readonly
     */
    get hasVoted() { this.data.positive ? parseInt(this.data.positive) : null }
}

module.exports = Recommendation