'use strict'

const HttpClient = require('./HttpClient')
const AnimeAPI = require('./apis/AnimeAPI')
const AppsAPI = require('./apis/AppsAPI')
const ChatAPI = require('./apis/ChatAPI')
const ForumAPI = require('./apis/ForumAPI')
const MangaAPI = require('./apis/MangaAPI')
const MediaAPI = require('./apis/MediaAPI')
const MessengerAPI = require('./apis/MessengerAPI')
const NotificationsAPI = require('./apis/NotificationsAPI')
const UcpAPI = require('./apis/UcpAPI')
const UserAPI = require('./apis/UserAPI')
const ListAPI = require('./apis/ListAPI')
const InfoAPI = require('./apis/InfoAPI')

class APIManager {
    /**
     * Constructs a new APIManager to cast calls to the Proxer.me API.
     * @param {object} headerParams - Contains details about the headers.
     * 
     * When **customHttpClient** is set, eveything else gets ignored and the customHttpClient is used.
     * @param {string} [headerParams.apiKey] - The unique API key that allows you to access the official Proxer.me API.
     * 
     * If you don't have a valid API key and leave this blank, the Proxer.me API will be used in test mode with very limited access.
     * @param {string} [headerParams.apiToken] - The token used for communicating with the Proxer.me API as a user.
     * 
     * If no user is logged in, the UCP API should not be used.
     * @param {string} [headerParams.userAgent] - This overrides the default userAgent set by the HttpClient.
     * 
     * This should be used to identify the app you are building. 
     * It makes it easier for Proxer.me to analysize what traffic is coming from which application.
     * @param {HttpClient} [headerParams.customHttpClient] - **Overrides the default HttpClient!**
     * 
     * Defining a custom httpClient will result in all other parameters to be ignored.
     * This might be needed if your application needs to set some custom headers or casts to a mock server for testing.
     */
    constructor(headerParams = { apiKey: false, apiToken: false, userAgent: false, customHttpClient: false }) {
        this.httpClient = headerParams.customHttpClient ?
            headerParams.customHttpClient :
            new HttpClient(headerParams)

        this.anime = new AnimeAPI(this.httpClient)
        this.apps = new AppsAPI(this.httpClient)
        this.chat = new ChatAPI(this.httpClient)
        this.forum = new ForumAPI(this.httpClient)
        this.list = new ListAPI(this.httpClient)
        this.manga = new MangaAPI(this.httpClient)
        this.media = new MediaAPI(this.httpClient)
        this.messenger = new MessengerAPI(this.httpClient)
        this.ucp = new UcpAPI(this.httpClient)
        this.notifications = new NotificationsAPI(this.httpClient)
        this.user = new UserAPI(this.httpClient)
        this.info = new InfoAPI(this.httpClient)
    }

    /**
     * Updates the APIManagers httpClient to
     * @param {string} token - The token of the logged in user.
     */
    updateApiToken(token) { this.httpClient.defaultHeaders['proxer-api-token'] = token }

    /**
     * Removes the API token from the httpClient.
     * 
     * This should be done after logging a user out.
     */
    removeApiToken() { delete this.httpClient.defaultHeaders['proxer-api-token'] }
}

module.exports = APIManager