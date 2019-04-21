'use strict'

/**
 * Represents the 'About'-section of a user.
 */
class UserAbout {
    constructor(data) {
        if (data) this.data = data
    }

    /**
     * Returns the type of information a user has placed for the specified info type
     * @param {string} infoType - The type of info
     * @returns {string}
     */
    getInfo(infoType = "about") {
        return this.data["info_" + infoType]
    }
}

module.exports = UserAbout