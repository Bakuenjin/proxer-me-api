const Base = require('../structures/Base')
const { API_BASE, classes } = require('../util/Constants')

const Anime = require('../structures/Anime')
const AnimeStream = require('../structures/AnimeStream')
const StreamLink = require('../structures/StreamLink')
const Manga = require('../structures/Manga')
const Chapter = require('../structures/Chapter')
const Industry = require('../structures/Industry')
const TranslatorGroup = require('../structures/TranslatorGroup')
const TranslatorGroupProject = require('../structures/TranslatorGroupProject')
const User = require('../structures/User')

const request = require('./RequestHandler')
const UrlBuilder = require('./UrlBuilder')

class APIManager extends Base {
    constructor(client, apiKey) {
        super(client)
        this.urlBuilder = new UrlBuilder(API_BASE)
        this.defaultHeaders = {
            "proxer-api-key": apiKey,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    /**
     * 
     * @param {string} username - The username for the user that wants to log in
     * @param {string} password - The password for the user that wants to log in
     * @param {string} secretkey - The 2FA key for the user that wants to log in
     * @returns {Promise<User>}
     */
    userLogin(username, password, secretkey) {
        return new Promise((resolve, reject) => {
            const url = this.urlBuilder.build(classes.USER, classes.user.LOGIN)
            const body = {
                username: username,
                password: password,
                secretkey: secretkey
            }
            request(url, 'POST', this.defaultHeaders, body).then((data) => {
                // Would create user here
                resolve(new User())
            }).catch(reject)
        })
    }
}

module.exports = APIManager