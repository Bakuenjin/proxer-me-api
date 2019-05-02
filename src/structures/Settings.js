'use strict'

/**
 * Represents user settings and implements functionality to change options easily.
 */
class Settings {
    constructor(data) {
        /**
         * @private
         */
        this.data = data

        /**
         * @private
         */
        this.modifiedData = {}
    }

    /**
     * All (local) settings of the user.
     * @type {object}
     * @readonly
     */
    get allSettings() { return this.data }

    /**
     * The settings that were modified since this Settings object was constructed or the apply() function was called.
     * @type {object}
     * @readonly
     */
    get modifiedSettings() { return this.modifiedData }

    /**
     * Changes the settings for the logged in user (locally).
     * @param {string} key - The settings key whose value should be changed
     * @param {number} value - The new value
     */
    set(key, value) {
        this.data[key] = value
        this.modifiedData[key] = value
    }

    /**
     * Returns the value for the specific setting.
     * @param {string} key - The settings key whose value is requested
     * @returns {number}
     */
    get(key) {
        let value
        if(this.isModified(key))
            value = this.modifiedData[key]
        else
            value = this.data[key]
        return parseInt(value)
    }

    /**
     * Checks if the specified setting has changed.
     * @param {string} key - The settings key to check for
     * @returns {boolean}
     */
    isModified(key) { return Object.keys(this.modifiedData).some(it => it === key) }

    /**
     * Clears the list of modified settings.
     * 
     * This should be called when the modified settings were sent to the proxer.me server.
     */
    apply() { this.modifiedData = {} }
}

module.exports = Settings