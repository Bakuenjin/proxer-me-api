'use strict'

const TopTenItem = require('./TopTenItem')

/**
 * Represents a top ten item from the currently logged in user.
 * @extends {TopTenItem}
 */
class UserClientTopTenItem extends TopTenItem {
    constructor(client, data) {
        super(client, data)
        this.data = data
    }

    /**
     * NEEDS A LOGGED IN USER!
     * 
     * Deletes this top-ten element from the currently logged in user.
     * If this top-ten element doesn't belong to the users top-ten, an error is thrown.
     */
    delete() {
        const body = { id: this.id }
        return this.client.api.post(classes.UCP, classes.ucp.DELETE_FAVORITE, body)
    }
}

module.exports = UserClientTopTenItem