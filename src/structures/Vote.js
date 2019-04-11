'use strict'

const Base = require('./Base')
const User = require('./User')
const { classes } = require('../util/Constants')

class Vote extends Base {
    constructor(client, data) {
        super(client)
        if(data) this.data = data
    }

    /**
     * The unique ID of the vote
     * @type {number}
     * @readonly
     */
    get id() { return parseInt(this.data.id) }

    /**
     * The unique ID of the user that submitted the comment
     * @type {number}
     * @readonly
     */
    get userId() { return parseInt(this.data.uid) }

    /**
     * The unique ID of the comment
     * @type {number}
     * @readonly
     */
    get commentId() { return parseInt(this.data.kid) }

    /**
     * The name of the entry this comment vote was casted on
     * @type {string}
     * @readonly
     */
    get name() { return this.data.name }

    /**
     * The name of the user
     * @type {string}
     * @readonly
     */
    get userName() { return this.data.username }

    /**
     * The actual comment content
     * @type {string}
     * @readonly
     */
    get commentText() { return this.data.comment }

    /**
     * The rating for the content
     * @type {number}
     * @readonly
     */
    get rating() { return parseInt(this.data.rating) }

    /**
     * The voting type
     * @type {string}
     * @readonly
     */
    get type() { return this.data.type }

    /**
     * Gather information about the user that submitted the comment.
     * @returns {Promise<User>}
     */
    getCommentUser() { return this.client.getUserById(this.userId) }

    /**
     * NEEDS A LOGGED IN USER!
     * Deletes this vote
     * @returns {Promise}
     */
    delete() {
        const body = { id: this.id }
        return this.client.api.post(classes.UCP, classes.ucp.DELETE_VOTE, body)
    }
}

module.exports = Vote