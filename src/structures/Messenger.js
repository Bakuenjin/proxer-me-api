'use strict'

const Base = require('./Base')
const { classes } = require('../util/Constants')

class Messenger extends Base {
    constructor(client, constants) {
        super(client)
        if (constants) this.constants = constants
    }

    /**
     * Reads the constant information based on the entered type.
     * @param {string} type - The constant type that should be returned
     * @returns {number}
     */
    getConstant(type) { return this.constants[type] }

    /**
     * Gathers a list of the current conferences by the user.
     * @param {object} optionalValues - The optional values
     * @param {object} [optionalValues.type] - The conference type to filter by.
     * @param {object} [optionalValues.p] - The page of the list to load. Default: 0.
     * @returns {Promise<Conference[]>}
     */
    getConferences(optionalValues = {}) {
        
    }
}

module.exports = Messenger