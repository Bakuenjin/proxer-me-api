'use strict'

const Content = require('./Content')
const Company = require('./Company')
const TranslatorGroup = require('./TranslatorGroup')
const ContentThread = require('./ContentThread')
const Character  = require('./Character')
const Person = require('./Person')
const Season = require('./Season')
const Tag = require('./Tag')
const Name = require('./Name')

/**
 * Represents any anime/manga including alot of details
 * @extends {Content}
 */
class FullDetailContent extends Content {
    constructor(data) {
        super(data)
        this.data = data
    }

    /**
     * The fsk ratings for this content
     * @type {string[]}
     * @readonly
     */
    get fsk() { return this.data.fsk.split(" ") }

    /**
     * The description for this content
     * @type {string}
     * @readonly
     */
    get description() { return this.data.description }

    /**
     * The adaption type for this content. Null if this content does not have any adaptation source.
     * @type {(string|null)}
     * @readonly
     */
    get adaptionType() { return (this.data.adaption_type ? this.data.adaption_type : null) }

    /**
     * The adaption value for this content. Null if this content does not have any adaptation source.
     * @type {(number|null)}
     * @readonly
     */
    get adaptionValue() { return (this.data.adaption_value ? parseInt(this.data.adaption_value) : null) }

    /**
     * The amount of clicks accumulated (resets every three month)
     * @type {number}
     * @readonly
     */
    get clicks() { return parseInt(this.data.clicks) }

    /**
     * The licence type of that content.
     * 0 = Unknown, 1 = Not licensed, 2 = Licensed
     * @type {number}
     * @readonly
     */
    get licence() { return this.data.license }

    /**
     * Is this content rated 18+?
     * @type {boolean}
     * @readonly
     */
    get hasAdultGate() { return this.data.gate == "true" }

    /**
     * The languages this content is available at.
     * @returns {string[]}
     */
    get languages() { return this.data.lang }

    /**
     * The seasons of this content.
     * @returns {Season[]}
     */
    get seasons() { return this.data.seasons.map(it => new Season(it)) }

    /**
     * The translator groups involved in this content.
     * @returns {TranslatorGroup[]}
     */
    get translatorGroups() { return this.data.groups.map(it => new TranslatorGroup(it)) }

    /**
     * The companies involved in this content.
     * @returns {Company[]}
     */    
    get companies() { return this.data.publisher.map(it => new Company(it)) }

    /**
     * The tags of this content.
     * @returns {Tag[]}
     */
    get tags() { return this.data.tags.map(it => new Tag(it)) }

    /**
     * The characters of this content.
     * @returns {Character[]}
     */
    get characters() { return this.data.characters.map(it => new Character(it)) }

    /**
     * The persons involved with this content.
     * @returns {Person[]}
     */
    get persons() { return this.data.persons.map(it => new Person(it)) }

    /**
     * The threads of this content.
     * @returns {ContentThread[]}
     */
    get forumContent() { return this.data.forum.map(it => new ContentThread(it)) }

    /**
     * All possible names of this content.
     * @returns {object[]}
     */
    get names() { return this.data.names.map(it => new Name(it)) }

}

module.exports = FullDetailContent