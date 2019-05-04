'use strict'

/**
 * Represents user settings and implements functionality to change options easily.
 */
class Settings {
    constructor(data) {
        /**
         * @private
         */
        this.data = data

        /**
         * @private
         */
        this.modifiedData = {}
    }

    /**
     * All (local) settings of the user.
     * @type {object}
     * @readonly
     */
    get all() { return this.data }

    get profile() { return this.data.profil }

    get topten() { return this.data.profil_topten }

    get anime() { return this.data.profil_anime }

    get manga() { return this.data.profil_manga }

    get latestComments() { return this.data.profil_latestcomments }

    get forum() { return this.data.profil_forum }

    get connections() { return this.data.profil_connections }

    get newConnections() { return this.data.profil_connections_new }

    get about() { return this.data.profil_about }

    get history() { return this.data.profil_chronik }

    get guestbook() { return this.data.profil_board }

    get postGuestbook() { return this.data.profil_board_post }

    get gallery() { return this.data.profil_gallery }

    get article() { return this.data.profil_article }

    get hideTags() { return this.data.hide_tags }

    get allowAds() { return this.data.ads_active }

    get adsInterval() { return this.data.ads_interval }
}

module.exports = Settings