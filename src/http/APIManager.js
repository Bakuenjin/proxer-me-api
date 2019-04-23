'use strict'

const HttpClient = require('./HttpClient')
const AnimeAPI = require('./apis/AnimeAPI')
const AppsAPI = require('./apis/AppsAPI')
const ChatAPI = require('./apis/ChatAPI')
const ForumAPI = require('./apis/ForumAPI')
const MangaAPI = require('./apis/MangaAPI')
const MediaAPI = require('./apis/MediaAPI')
const MessengerAPI = require('./apis/MessengerAPI')

class APIManager {
    constructor(headerParams = { apiKey: false, apiToken: false, testMode: false }) {
        const httpClient = new HttpClient(headerParams)
        this.anime = new AnimeAPI(httpClient)
        this.apps = new AppsAPI(httpClient)
        this.chat = new ChatAPI(httpClient)
        this.forum = new ForumAPI(httpClient)
        this.manga = new MangaAPI(httpClient)
        this.media = new MediaAPI(httpClient)
        this.messenger = new MessengerAPI(httpClient)
    }
}

module.exports = APIManager