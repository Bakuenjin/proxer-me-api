'use strict'

class ChapterListEntry {
    constructor(data) {
        this.data = data
    }

    /**
     * The number of this chapter entry
     * @type {number}
     * @readonly
     */
    get number() { return parseInt(this.data.no) }

    /**
     * The title of this entry
     * @type {string}
     * @readonly
     */
    get title() {  return this.data.title }

     /**
     * The language of this entry
     * @type {string}
     * @readonly
     */
    get language() { return this.data.type }

     /**
     * The status of this entry:
     * 
     * 0 = Chapter exists,
     * 2 = Chapter exists but isn't linked yet.
     * @type {number}
     * @readonly
     */
    get status() { return parseInt(this.data.merker) }
}

module.exports = ChapterListEntry