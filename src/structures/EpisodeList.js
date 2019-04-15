'use strict'

const ReleaseList = require('./ReleaseList')
const EpisodeListEntry = require('./EpisodeListEntry')

class EpisodeList extends ReleaseList {
    constructor(client, data) {
        super(client, data)

        const episodes = []
        for (let episodeObj of data.episodes)
            episodes.push(new EpisodeListEntry(episodeObj))
        
        this.data = episodes
    }

    get episodes() { return this.data }
}