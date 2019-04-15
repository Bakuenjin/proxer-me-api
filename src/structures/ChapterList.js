'use strict'

const ReleaseList = require('./ReleaseList')
const ChapterListEntry = require('./ChapterListEntry')

class ChapterList extends ReleaseList {
    constructor(client, data) {
        super(client, data)

        const chapters = []
        for (let chapterObj of data.episodes)
            chapters.push(new ChapterListEntry(chapterObj))
        
        this.data = chapters
    }

    /**
     * An array of chapterEntries
     * @type {ChapterListEntry[]}
     * @readonly
     */
    get chapters() { return this.data }
}