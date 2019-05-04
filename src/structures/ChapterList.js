'use strict'

const ReleaseList = require('./ReleaseList')
const ChapterListEntry = require('./ChapterListEntry')

/**
 * Represents a list of manga chapters.
 * @extends {ReleaseList}
 */
class ChapterList extends ReleaseList {
    constructor(data) {
        super(data)

        this.data.episodes = data.episodes.map(it => new ChapterListEntry(it))
    }

    /**
     * An array of chapterEntries.
     * @type {ChapterListEntry[]}
     * @readonly
     */
    get chapters() { return this.data.episodes }
}

module.exports = ChapterList