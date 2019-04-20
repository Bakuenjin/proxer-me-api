'use strict'

const Base = require('./Base')
const { classes } = require('../util/Constants')

/**
 * Represents user settings and implements an interface to change options easily.
 * @extends {Base}
 */
class Settings extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * Changes the settings for the logged in user (locally)
     * @param {string} key - The settings key which value should be changed
     * @param {number} value - The new value
     */
    set(key, value) { this.data[key] = value }

    /**
     * Returns the value for the specific setting
     * @param {string} key - The settings they which value is requested
     * @returns {number}
     */
    get(key) { return parseInt(this.data[key]) }

    /**
     * Submits the local changes to the server
     * @returns {Promise}
     */
    submit() {
        return this.client.api.post(classes.UCP, classes.ucp.SET_SETTINGS, this.data)    
    }
}

module.exports = Settings