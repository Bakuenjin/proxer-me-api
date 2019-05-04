'use strict'

const DEFAULT_BASE = 10

/**
 * Calculates the rating based on:
 * * The sum of all casted ratings
 * * The amount of casted ratings
 * * The base for the rating (e.g 10/10 or 100%)
 * * The default base of 10 (constant)
 * 
 * The formular: `rateSum / rateCount / 10 * base`
 * @param {number} rateSum - The sum of all casted ratings
 * @param {number} rateCount - The amount of casted ratings
 * @param {number} base - The base for the rating (e.g 10 for **10 / 10** or 100 for **100%**)
 * @returns {number} The rating
 */
module.exports = (rateSum, rateCount, base = 10) => {
    if (rateCount == 0) return 0
    return (rateSum / rateCount / DEFAULT_BASE * base)
}