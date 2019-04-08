'use strict'

const Base = require('./Base')
const Project = require('./Project')
const { classes } = require('../util/Constants')

class TranslatorGroup extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }

    /**
     * The unique ID of the translator group
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The name of the translator group
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The country of the translator group
     * @type {string}
     */
    get country() { return this.data.country }


    /**
     * The cover image of the translator group
     * @type {string|null}
     */
    get image() { return (this.data.image ? this.data.image : null) }

    /**
     * Lists all projects of a translator group based on its id
     * @param {object} optionalValues - Contains all optional params
     * @param {number} [optionalValues.type] - The translation status
     * @param {number} [optionalValues.isH] - Toggles hentai content
     * @param {number} [optionalValues.p] - The result page to load
     * @param {number} [optionalValues.limit] - The amount of results for each page
     * @returns {Promise<Project[]>}
     */
    searchProjects(optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.id = this.id
            this.client.api.post(classes.LIST, classes.list.TRANSLATOR_GROUP_PROJECTS, optionalValues).then((data) => {
                const tgpResults = []
                for (let tgpObj of data)
                    tgpResults.push(new Project(this.client, tgpObj))
                resolve(tgpResults)
            }).catch(reject)
        })
    }
}

module.exports = TranslatorGroup