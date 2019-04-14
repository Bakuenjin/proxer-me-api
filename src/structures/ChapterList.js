'use strict'

const Base = require('./Base')
const Chapter = require('./Chapter')

class ChapterList extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    
}