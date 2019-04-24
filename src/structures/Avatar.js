'use strict'

class Avatar {
    constructor(imageId) {
        this.id = imageId
    }

    get thumbnail() { return `https://cdn.proxer.me/avatar/tn/${this.id}` }

    get fullImage() { return `https://cdn.proxer.me/avatar/${this.id}` }
}

module.exports = Avatar