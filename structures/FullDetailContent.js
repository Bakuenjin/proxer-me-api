'use strict'

// NOTES TO SELF:
// FullDetailAnime / FullDetailManga that extends this class maybe?
// So basically like Content and Anime/Manga but as full details objects.


const Content = require('./Content')
const Company = require('./Company')
const TranslatorGroup = require('./TranslatorGroup')
const Character  = require('./Character')
const Person = require('./Person')
const Tag = require('./Tag')

class FullDetailContent extends Content {
    constructor(client, data) {
        super(client, data)
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
     * The adaption type for this content
     * @type {(string|null)}
     * @readonly
     */
    get adaptionType() { return (this.data.adaption_type ? this.data.adaption_type : null) }

    /**
     * The adaption value for this content
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
     * 0 = Unknown, 1 = not licensed, 2 = licensed
     * @type {number}
     * @readonly
     */
    get licence() { return this.data.license }

    /**
     * Is this content rated 18+?
     * @returns {boolean}
     */
    hasAdultGate() { return this.data.gate == "true" }

    /**
     * The languages this content is available at
     * @returns {string[]}
     */
    getLanguages() { return this.data.lang }

    // TODO - Create class maybe? Not happy with this solution
    getSeason() { return this.data.seasons }

    // TODO - Create class maybe? Not happy with this solution
    get genres() { return this.data.genres }

    /**
     * The translator groups involved in this content
     * @returns {TranslatorGroup[]}
     */
    getTranslatorGroups() {
        const groups = []
        for(let groupInfos of this.data.groups)
            groups.push(new TranslatorGroup(this.client, groupInfos))
        return groups
    }

    /**
     * The companies involved in this content
     * @returns {Company[]}
     */    
    getCompanies() {
        const comps = []
        for(let compInfos of this.data.publisher)
            comps.push(new Company(this.client, compInfos))
        return comps
    }

    /**
     * The tags of this content
     * @returns {Tag[]}
     */
    getTags() {
        const ts = []
        for(let tagInfos of this.data.tags)
            ts.push(new Tag(tagInfos))
        return ts
    }

    /**
     * The characters of this content
     * @returns {Character[]}
     */
    getCharacters() {
        const chars = []
        for(let charInfo of this.data.characters)
            chars.push(new Character(charInfo))
        return chars
    }

    /**
     * The persons involved with this content
     * @returns {Person[]}
     */
    getPersons() {
        const ps = []
        for(let pInfo of this.data.persons)
            ps.push(new Person(pInfo))
        return ps
    }

    // TODO - Create class maybe? Not happy with this solution
    getForumContent() { return this.data.forum }

    /**
     * Since this is the full detail content, it simply returns itself
     * @returns {FullDetailContent}
     */
    getFullDetails() { return this }

    /**
     * All possible names of this content
     * @returns {object[]}
     */
    getNames() { return this.data.names }

}

module.exports = FullDetailContent