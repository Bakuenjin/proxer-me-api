'use strict'

class Season {
    constructor(data) {
        if (data) this.data = data
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
     * winter | spring | summer | fall
     * @type {string}
     * @readonly
     */
    get name() {
        switch(this.number) {
            case 0: return 'winter'
            case 1: return 'spring'
            case 2: return 'summer'
            case 3: return 'fall'
        }
    }

    /**
     * The year of this season
     * @type {number}
     * @readonly
     */
    get year() { return parseInt(this.data.year) }

    /**
     * The number of this season:
     * 
     * 0 = winter, 1 = spring,
     * 2 = summer, 3 = fall
     * @type {number}
     * @readonly
     */
    get number() { return parseInt(this.data.season) }
}

module.exports = Season