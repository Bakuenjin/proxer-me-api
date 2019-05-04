'use strict'

/**
 * Represents an avatar from any Proxer.me user.
 */
class Avatar {
    constructor(imageId) {
        this.id = imageId
    }

    /**
     * The thumbnail of a profile picture.
     * 
     * This image is usually significantly smaller than the full-size image.
     * @type {string}
     * @readonly
     */
    get thumbnail() { return `https://cdn.proxer.me/avatar/tn/${this.id}` }

    /**
     * The full-size image of a profile picture.
     * @type {string}
     * @readonly
     */
    get fullImage() { return `https://cdn.proxer.me/avatar/${this.id}` }
}

module.exports = Avatar