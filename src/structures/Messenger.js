'use strict'

const Base = require('./Base')
const Conference = require('./Conference')
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
        return new Promise((resolve, reject) => {
            this.client.api.post(classes.MESSENGER, classes.messenger.CONFERENCES, optionalValues).then((data) => {
                resolve(new Conference(this.client, data))
            }).catch(reject)
        })
    }

    /**
     * Creates a new conference with a specific text and user.
     * (If there already is an existing conference between these two user, the message is just appended to the existing conference)
     * @param {string} username - The user that should receive this message (A conference is created and this user is added)
     * @param {string} text - The message to initialize this conference with
     * @returns {Promise}
     */
    newConference(username, text) {
        const body = {
            username: username,
            text: text
        }
        return this.client.api.post(classes.MESSENGER, classes.messenger.NEW_CONFERENCE, body)
    }

    /**
     * 
     * @param {string[]} users - An array of username to add to this conference
     * @param {string} title - The title (topic) of this conference
     * @param {object} optionalValues - All optional params
     * @param {object} [optionalValues.text] - A message to initialize the conference with. (/commands are ignored)
     * @returns {Promise}
     */
    newConferenceGroup(users, title, optionalValues = {}) {
        optionalValues.users = users
        optionalValues.title = title
        return this.client.api.post(classes.MESSENGER, classes.messenger.NEW_CONFERENCE_GROUP, optionalValues)
    }
}

module.exports = Messenger