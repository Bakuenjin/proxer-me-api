'use strict'

const Base = require('./Base')

class TranslatorGroup extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the translator group
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the translator group
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The country of the translator group
     * @type {string}
     */
    get country() { return this.data.country }


    /**
     * The cover image of the translator group
     * @type {string|null}
     */
    get image() { return (this.data.image ? this.data.image : null) }
}

module.exports = TranslatorGroup