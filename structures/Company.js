'use strict'

const Base = require('./Base')
const Project = require('./Project')
const { classes } = require('../util/Constants')

class Company extends Base {
    constructor(client, data) {
        super(client)
        if (data) this.data = data
    }
    
    /**
     * The unique ID of the industry
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The type of the industry
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * The name of the industry
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The country of the industry
     * @type {string}
     * @readonly
     */
    get country() { return this.data.country }

    /**
     * The cover image of the industry
     * @type {string}
     * @readonly
     */
    get image() { return `https://cdn.proxer.me/industry/${this.id}.jpg` }

    /**
     * Lists all projects of a company based on its id
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
            this.client.api.post(classes.LIST, classes.list.INDUSTRY_PROJECTS, optionalValues).then((data) => {
                const cpResults = []
                for (let cpObj of data)
                    cpResults.push(new Project(this.client, cpObj))
                resolve(cpResults)
            }).catch(reject)
        })
    }
}

module.exports = Company