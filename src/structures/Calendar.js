'use strict'

const CalendarEntry = require('./CalendarEntry')

/**
 * Represents the proxer calendar that displays upcoming releases
 */
class Calendar {
    constructor(data) {
        this.data = data

        /**
         * All calendar entries sorted by weekday
         */
        this.days = {}

        for (calObj of this.data) {
            if (!this.days[calObj.weekday])
                this.days[calObj.weekday] = []
            this.days[calObj.weekday].push(new CalendarEntry(calObj))
        }
    }

    /**
     * Gets all calendar entries for a specified weekday.
     * @param {string} weekday - The day of the calendar
     * @returns {CalendarEntry[]}
     */
    getEntries(weekday) {
        if (this.days[weekday])
            return this.days[weekday]
        return []
    }
}

module.exports = Calendar