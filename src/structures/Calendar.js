'use strict'

const CalendarEntry = require('./CalendarEntry')

/**
 * Represents the proxer calendar that displays upcoming releases
 */
class Calendar {
    constructor(client, data) {
        if (data) this.data = data

        /**
         * All calendar entries ordered by weekday
         */
        this.days = {}

        for (calObj of this.data) {
            if (!this.days[calObj.weekday])
                this.days[calObj.weekday] = []
            this.days[calObj.weekday].push(new CalendarEntry(client, calObj))
        }
    }

    /**
     * Gets all calendar entries
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