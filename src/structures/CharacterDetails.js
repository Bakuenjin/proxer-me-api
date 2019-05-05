'use strict'

const CharacterDescription = require('./CharacterDescription')
const CharacterName = require('./CharacterName')
const CharacterPerson = require('./CharacterPerson')
const CharacterLink = require('./CharacterLink')

class CharacterDetails {
    constructor(data) {
        this.data = data
    }

    /**
     * The unique ID of the character.
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the character.
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
     * The hair color of the character as a hex-string.
     * 
     * E.g: `#ffaa00`
     * @type {string}
     * @readonly
     */
    get hairColor() { return this.data.hair_color }

    /**
     * The eye color of the character as a hex-string.
     * 
     * E.g: `#ffaa00`
     * @type {string}
     * @readonly
     */
    get eyeColor() { return this.data.eye_color }

    /**
     * The bloodtype of the character.
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
     * The height of the character in centimeter.
     * 
     * Can be `0` or `NaN` if unknown.
     * @type {number}
     * @readonly
     */    
    get height() { return parseInt(this.data.height) }

    /**
     * The weight of the character in kilograms.
     * 
     * Can be `0` or `Nan` if unknown.
     */
    get weight() { return parseInt(this.data.weight) }

    /**
     * All description areas this character has.
     * @type {CharacterDescription[]}
     * @readonly
     */
    get descriptions() { return this.data.description.map(it => new CharacterDescription(it)) }

    /**
     * All possible names this character has.
     * @type {CharacterName[]}
     * @readonly
     */
    get names() { return this.data.names.map(it => new CharacterName(it)) }

    /**
     * All connections to persons this character has.
     * @type {CharacterPerson[]}
     * @readonly
     */
    get persons() { return this.data.persons.map(it => new CharacterPerson(it)) }

    /**
     * All connections to anime or manga this character has.
     * @type {CharacterLink[]}
     * @readonly
     */
    get links() { return this.data.links.map(it => new CharacterLink(it)) }

}

module.exports = CharacterDetails