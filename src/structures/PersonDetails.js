'use strict'

const PersonDescription = require('./PersonDescription')
const PersonName = require('./PersonName')
const PersonSite = require('./PersonSite')
const PersonContent = require('./PersonContent')
const PersonCharacter = require('./PersonCharacter')


/**
 * Represents a Person with additional details.
 */
class PersonDetails {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the person.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the person.
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The gender of the person. (`misc`, `f` or `m`)
     * @type {string}
     * @readonly
     */
    get gender() { return this.data.gender }

    /**
     * The bloodtype of the person.
     * @type {string}
     * @readonly
     */
    get bloodtype() { return this.data.bloodtype }

    /**
     * The birthday of the person.
     * 
     * Format: `YYYY-MM-DD`
     * @type {string}
     * @readonly
     */
    get birthday() { return this.data.birthday }

    /**
     * The birthplace of the person.
     * @type {string}
     * @readonly
     */
    get birthplace() { return this.data.birthplace }

    /**
     * The nationality of the person.
     * 
     * Examples:
     * * `DE` = germany
     * * `JP` = japan
     * @type {string}
     * @readonly
     */
    get nationality() { return this.data.nationality }

    /**
     * The place where the person lives.
     * @type {string}
     * @readonly
     */
    get residence() { return this.data.residence }

    /**
     * The work this person is doing.
     * 
     * Possible values:
     * * `musician` - Creating music for anime for example.
     * * `seiuu` - Works as a voice actor.
     * * `mangaka` - The creator of the manga.
     * * `director` - Directing the anime.
     * * `misc` - Everything else.
     * @type {string}
     * @readonly
     */
    get occupations() { return this.data.occupations.map(it => it.type) }
    
    /**
     * The description parts of this person.
     * @type {PersonDescription[]}
     * @readonly
     */
    get descriptions() { return this.data.description.map(it => new PersonDescription(it)) }

    /**
     * The different names for this person
     * @type {PersonName[]}
     * @readonly
     */
    get names() { return this.data.description.map(it => new PersonName(it)) }

    /**
     * The different websites this person has.
     * @type {PersonSite[]}
     * @readonly
     */
    get sites() { return this.data.sites.map(it => new PersonSite(it)) }

    /**
     * The content this person worked with (anime or manga).
     * @type {PersonContent[]}
     * @readonly
     */
    get contents() { return this.data.entrys.map(it => new PersonContent(it)) }

    /**
     * The different characters this person stands in relation to.
     * @type {PersonCharacter[]}
     * @readonly
     */
    get characters() { return this.data.characters.map(it => new PersonCharacter(it)) }
}

module.exports = PersonDetails