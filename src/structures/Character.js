'use strict'

const Individual = require('./Individual')

/**
 * Represents a character of an anime/manga
 * @extends {Individual}
 */
class Character extends Individual {
    constructor(data) {
        super(data)
    }

    /**
     * The image of the character
     * @type {string}
     * @readonly
     */
    get image() { return `cdn.proxer.me/character/${this.id}.jpg` }
}

module.exports = Character