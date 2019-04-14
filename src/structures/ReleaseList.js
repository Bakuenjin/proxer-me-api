'use strict'

const Base = require('./Base')

class ReleaseList extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    get contentId() { return this.data.id }

    get startNumber() { return this.data.start }

    get endNumber() { return this.data.end }

    get category() { return this.data.kat }

    get languages() { return this.data.lang }

    get userProgress() { return this.data.state }

}

module.exports = ReleaseList