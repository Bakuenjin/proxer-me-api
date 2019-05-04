'use strict'

const ReleaseList = require('./ReleaseList')
const EpisodeListEntry = require('./EpisodeListEntry')

/**
 * Represents a list of anime episodes.
 * @extends  {ReleaseList}
 */
class EpisodeList extends ReleaseList {
    constructor(data) {
        super(data)

        this.data.episodes = data.episodes.map(it => new EpisodeListEntry(it))
    }

    get episodes() { return this.data.episodes }
}

module.exports = EpisodeList