'use strict'

const Individual = require('./Individual')

/**
 * Represents a person that was involved in creating an anime/manga
 * @extends {Individual}
 */
class Person extends Individual {
    constructor(data) {
        super(data)
    }

    /**
     * The image of the person
     * @type {string}
     * @readonly
     */
    get image() { return `cdn.proxer.me/person/${this.id}.jpg` }
}

module.exports = Person