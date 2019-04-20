'use strict'

const Base = require('./Base')
const Conference = require('./Conference')
const { classes } = require('../util/Constants')

/**
 * Represents the Proxer.me messenger.
 * @extends {Base}
 */
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
     * (If there already is an existing conference between these two users, the message is just appended to the existing conference)
     * 
     * Resolves with the id of the conference.
     * @param {string} username - The user that should receive this message (A conference is created and this user is added)
     * @param {string} text - The message to initialize this conference with
     * @returns {Promise}
     */
    newConference(username, text) {
        return new Promise((resolve, reject) => {
            const body = {
                username: username,
                text: text
            }
            this.client.api.post(classes.MESSENGER, classes.messenger.NEW_CONFERENCE, body).then((data) => {
                resolve(parseInt(data))
            }).catch(reject)
        })
    }

    /**
     * Creates a new conference group with the specified users.
     * 
     * Resolves with the id of the newly created conference-group.
     * @param {string[]} users - An array of usernames to add to this conference
     * @param {string} title - The title (topic) of this conference
     * @param {object} optionalValues - All optional params
     * @param {string} [optionalValues.text] - A message to initialize the conference with. (/commands are ignored)
     * @returns {Promise<number>}
     */
    newConferenceGroup(users, title, optionalValues = {}) {
        return new Promise((resolve, reject) => {
            optionalValues.users = users
            optionalValues.title = title
            this.client.api.post(classes.MESSENGER, classes.messenger.NEW_CONFERENCE_GROUP, optionalValues).then((data) => {
                resolve(parseInt(data))
            }).catch(reject)
        })
    }
}

module.exports = Messenger