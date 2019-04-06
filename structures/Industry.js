'use strict'

const Base = require('./Base')

class Industry extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }
    
    /**
     * The unique ID of the industry
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The type of the industry
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The name of the industry
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The country of the industry
     * @type {string}
     * @readonly
     */
    get country() { return this.data.country }

    /**
     * The cover image of the industry
     * @type {string}
     * @readonly
     */
    get image() { return `https://cdn.proxer.me/industry/${this.id}.jpg` }
}

module.exports = Industry