'use strict'

exports.API_BASE = "https://proxer.me/api/v1/"

exports.contentCategories = {
    ANIME: 'anime',
    MANGA: 'manga'
}

exports.classes = {
    USER: 'user',
    LIST: 'list',
    INFO: 'info',
    UCP: 'ucp',
    NOTIFICATIONS: 'notifications',
    MEDIA: 'media',
    ANIME: 'anime',
    MANGA: 'manga',
    MESSENGER: 'messenger',
    FORUM: 'forum',
    APPS: 'apps',
    CHAT: 'chat',
    user: {
        LOGIN: 'login',
        LOGOUT: 'logout',
        USERINFO: 'userinfo',
        TOP_TEN: 'topten',
        LIST: 'list',
        LATEST_COMMENTS: 'comments',
        HISTORY: 'history',
        ABOUT: 'about',
        REQUEST_AUTHENTIFICATION: 'requestauth',
        CHECK_AUTHENTIFICATION: 'checkauth',
        FRIENDS: 'friends'
    },
    list: {
        ENTRY_SEARCH: 'entrysearch',
        ENTRY_LIST: 'entrylist',
        TAG_IDS: 'tagids',
        TAGS: 'tags',
        TRANSLATOR_GROUPS: 'translatorgroups',
        INDUSTRIES: 'industrys',
        TRANSLATOR_GROUP_PROJECTS: 'translatorgroupprojects',
        INDUSTRY_PROJECTS: 'industryprojects',
        CHARACTERS: 'characters',
        PERSONS: 'persons'
    },
    info: {
        FULL_ENTRY: 'fullentry',
        ENTRY: 'entry',
        NAMES: 'names',
        GATE: 'gate',
        LANGUAGES: 'lang',
        SEASON: 'season',
        GROUPS: 'groups',
        PUBLISHER: 'publisher',
        LIST_INFO: 'listinfo',
        COMMENTS: 'comments',
        RELATIONS: 'relations',
        ENTRY_TAGS: 'entrytags',
        ENTRY_GENRES: 'entrygenres',
        TRANSLATOR_GROUP: 'translatorgroup',
        INDUSTRY: 'industry',
        RECOMMENDATIONS: 'recommendations',
        SET_USERINFO: 'setuserinfo',
        GET_USERINFO: 'userinfo',
        CHARACTERS: 'characters',
        CHARACTER: 'character',
        PERSONS: 'persons',
        PERSON: 'person',
        FORUM: 'forum'
    },
    ucp: {
        LIST: 'list',
        LIST_SUM: 'listsum',
        TOP_TEN: 'topten',
        HISTORY: 'history',
        VOTES: 'votes',
        REMINDER: 'reminder',
        SET_REMINDER: 'setreminder',
        DELETE_REMINDER: 'deletereminder',
        DELETE_FAVORITE: 'deletefavorite',
        DELETE_VOTE: 'deletevote',
        SET_COMMENT_STATE: 'setcommentstate',
        DELETE_COMMENT: 'deletecomment',
        SETTINGS: 'settings',
        SET_SETTINGS: 'setsettings'
    },
    notifications: {
        COUNT: 'count',
        NEWS: 'news',
        GET: 'notifications',
        DELETE: 'delete'
    },
    media: {
        RANDOM_HEADER: 'randomheader',
        HEADER_LIST: 'headerlist',
        CALENDAR: 'calendar',
        VAST_TAG: 'vasttag'
    },
    anime: {
        STREAMS: 'streams',
        PROXER_STREAMS: 'proxerstreams',
        LINK: 'link',
        LINK_WITH_VAST: 'linkvast'
    },
    manga: {
        CHAPTER: 'chapter'
    },
    messenger: {
        CONSTANTS: 'constants',
        CONFERENCES: 'conferences',
        CONFERENCE_INFO: 'conferenceinfo',
        USER_INFO: 'userinfo',
        MESSAGES: 'messages',
        NEW_CONFERENCE: 'newconference',
        NEW_CONFERENCE_GROUP: 'newconferencegroup',
        REPORT: 'report',
        SET_MESSAGE: 'setmessage',
        SET_READ: 'setread',
        SET_UNREAD: 'setunread',
        SET_BLOCK: 'setblock',
        SET_UNBLOCK: 'setunblock',
        SET_FAVORITE: 'setfavour',
        UNSET_FAVORITE: 'setunfavour'
    },
    forum: {
        TOPIC: 'topic'
    },
    apps: {
        ERROR_LOG: 'errorlog'
    },
    chat: {
        ROOM_INFO: 'roominfo',
        ROOM_USERS: 'roomusers',
        PUBLIC_ROOMS: 'publicrooms',
        MY_ROOMS: 'myrooms',
        MESSAGES: 'messages',
        NEW_MESSAGES: 'newmessages',
        NEW_MESSAGE: 'newmessage',
        DELETE_MESSAGE: 'deletemessage',
        REPORT_MESSAGE: 'reportmessage',
        THANKYOU_MESSAGE: 'thankyoumessage'
    }
}

exports.errors = {
    FATAL: {
        "1000": "API version does not exist.",
        "1001": "API version was removed.",
        "1002": "API class does not exist.",
        "1003": "API function does not exist.",
        "1004": "The API keys does not own the privilege to execute this action.",
        "1005": "The used login token is invalid.",
        "1006": "The called function is locked.",
        "1007": "Proxer.me is currently undergoing maintenance.",
        "1008": "The API is currently undergoing maintenance."
    },
    SERVER_SIDE: {
        "2000": "IP was blocked by firewall.",
        "2001": "Error while fetching news."
    },
    CLIENT_SIDE: {
        "3000": "Login failed: Missing login credentials.",
        "3001": "Login failed: Invalid login credentials.",
        "3002": "Fetching notifications failed: User is not logged in.",
        "3003": "Fetching userinfo failed: User id does not exist.",
        "3004": "UCP error: User is not logged in.",
        "3005": "UCP error: Category does not exist.",
        "3006": "UCP error: Invalid id.",
        "3007": "Info error: Invalid id.",
        "3008": "Setting userinfo failed: Invalid type.",
        "3009": "Setting userinfo failed: User is not logged in.",
        "3010": "Setting userinfo failed: Content already exists in list.",
        "3011": "Setting userinfo failed: Favorite limit exceeded.",
        "3012": "Login failed: User is already logged in.",
        "3013": "Login failed: Another user is already logged in.",
        "3014": "User error: Access to information denied. (This might be caused by not beeing logged in with a user)",
        "3015": "List error: Category does not exist.",
        "3016": "List error: Medium does not exist.",
        "3017": "Media error: Style does not exist.",
        "3018": "Media error: Entry does not exist.",
        "3019": "Manga error: Chapter does not exist. (Maybe it simply is not uploaded or linked yet)",
        "3020": "Anime error: Episode does not exist. (Maybe is simply is not uploaded or linked yet)",
        "3021": "Anime error: Stream does not exist.",
        "3022": "UCP error: Episode does not exist.",
        "3023": "Messages error: User is not logged in.",
        "3024": "Messages error: Invalid conference. (missing permissions or invalid id)",
        "3025": "Messages error: Invalid or missing input.",
        "3026": "Messages error: Invalid or missing message.", 
        "3027": "Messages error: Invalid user.",
        "3028": "Messages error: User limit exceeded.",
        "3029": "Messages error: Invalid or missing topic.",
        "3030": "Messages error: At least one user needs to be added to a conference",
        "3031": "Chat error: Invalid room.",
        "3032": "Chat error: Missing permissions.",
        "3033": "Chat error: Invalid message. (this always corresponds to a specific message id)",
        "3034": "Chat error: User is not logged in.",
        "3035": "List error: Invalid language.",
        "3036": "List error: Invalid type.",
        "3037": "List error: Invalid id.",
        "3038": "Login failed: The user has 2FA activated. The secret key needs to be specified.",
        "3039": "Login failed: The user account got terminated.",
        "3040": "Login failed: The user account is banned.",
        "3041": "User error: An internal error occured.",
        "3042": "Apps error: An empty string was sent.",
        "3043": "List error: Invalid subject.",
        "3044": "Forum error: Invalid id.",
        "3045": "Apps error: Invalid id.",
        "3046": "List error: The top-access list got reset.",
        "3047": "User-Auth error: The user does not exist.",
        "3048": "User-Auth error: The code needs to be 100 characters long.",
        "3049": "User-Auth error: The code already exists.",
        "3050": "User-Auth error: The code does not exist.",
        "3051": "User-Auth error: The code got denied.",
        "3052": "User-Auth error: The code is not approved by the user yet.",
        "3053": "User-Auth error: The name can't be empty.",
        "3054": "User-Auth error: The code is already in use.",
        "3055": "Chat error: The user needs to exist for at least 7 days to aquire the permission to write in chat.",
        "3056": "Chat error: The user is blacklisted.",
        "3057": "Chat error: Missing permissions.",
        "3058": "Chat error: A user can't thank themself, baka.",
        "3059": "Chat error: Invalid text input.",
        "3060": "Forum error: The user does not have the permission to access this area.",
        "3061": "Info error: Deletion of a comment failed.",
        "3062": "UCP error: Applying changes failed.",
        "3063": "Anime error: The stream is not accessable for guests.",
        "3064": "User error: IP authentications needs to be done.",
        "3065": "Media error: There aren't any VAST tags available currently."
    }
}

exports.paramConstants = {
    contentLanguage: {
        GERMAN: 'de',
        ENGLISH: 'en'
    },
    contentCategory: {
        ANIME: 'anime',
        MANGA: 'manga'
    },
    contentType: {
        ANIME_SERIES: 'animeseries',
        MOVIE: 'movie',
        OVA: 'ova',
        MANGA_SERIES: 'mangaseries',
        ONESHOT: 'oneshot',
        DOUJIN: 'doujin',
        HENTAI_ANIME: 'hentai',
        HENTAI_MANGA: 'hmanga',
        ALL_ANIME: 'all-anime',
        ALL_MANGA: 'all-manga',
        ALL: 'all',
        ALL_HENTAI: 'all18'
    },
    contentFsk: {
        FSK0: 'fsk0',
        FSK6: 'fsk6',
        FSK12: 'fsk12',
        FSK16: 'fsk16',
        FSK18: 'fsk18',
        BAD_LANGUAGE: 'bad_language',
        VIOLENCE: 'violence',
        FEAR: 'fear',
        SEX: 'sex'
    },
    contentSearchSort: {
        RELEVANCE: 'relevance',
        CLICKS: 'clicks',
        RATING: 'rating',
        LENGTH: 'count',
        NAME: 'name'
    },
    contentListSort: {
        TITLE: 'title',
        CLICKS: 'clicks',
        RATING: 'rating'
    },
    contentLengthLimitType: {
        GREATER_EQUAL: 'up',
        LESSER_EQUAL: 'down'
    },
    contentTagRateFilter: {
        KNOWN_TAGS: 'rate_1',
        ALL_TAGS: 'rate_10'
    },
    contentTagSpoilerFilter: {
        NO_SPOILER: 'spoiler_0',
        SPOILER: 'spoiler_1',
        BOTH: 'spoiler_10'
    },
    contentIsHentai: {
        HENTAI: true,
        NO_HENTAI: false
    },
    contentState: {
        NOT_AIRED: 0,
        COMPLETED: 1,
        AIRING: 2,
        CANCELLED: 3,
        COMPLETED_BUT_NOT_SUBBED: 4
    },
    contentSeason: {
        UNKNOWN: 0,
        WINTER: 1,
        SPRING: 2,
        SUMMER: 3,
        FALL: 4
    },
    contentSeasonType: {
        START: 'start',
        END: 'end'
    },
    tagType: {
        DEFAULT: 'entry_tag',
        GENRES: 'entry_genre',
        HENTAI: 'entry_tag_h',
        GALLERY: 'gallery'
    },
    tagSubtype: {
        MISC: 'misc',
        PERSONALITY: 'persoenlichkeiten',
        FEELING: 'gefuehle',
        DRAWING: 'zeichnung',
        SUPERNATURAL: 'uebernatuerliches',
        SPORT: 'sport',
        HUMAN: 'menschen',
        FUTURE: 'zukunft',
        STORY: 'story',
        PROTAGONIST: 'prota'
    },
    translatorGroupCountry: {
        GERMANY: 'de',
        AMERICA: 'en',
        MISC: 'misc'
    },
    companyCountry: {
        GERMANY: 'de',
        AMERICA: 'en',
        JAPAN: 'jp',
        MISC: 'misc'
    },
    companyType: {
        PUBLISHER: 'publisher',
        STUDIO: 'studio',
        PRODUCER: 'producer',
        RECORD_LABEL: 'record_label',
        TALENT_AGENT: 'talent_agent',
        STREAMING: 'streaming'
    },
    projectIsHentai: {
        NO_HENTAI: -1,
        HENTAI: 1,
        BOTH: 0
    },
    projectType: {
        UNDEFINED: 0,
        COMPLETED: 1,
        AIRING: 2,
        PLANNED: 3,
        CANCELLED: 4,
        LICENSED: 5
    },
    characterSubject: {
        INTRO: 'intro',
        APPEARENCE: 'appearence',
        PERSONALITY: 'personality',
        SKILLS: 'skills',
        PAST: 'past',
        PRESENT: 'present',
        TRIVIA: 'trivia'
    },
    personSubject: {
        INTRO: 'intro',
        BIOGRAPHY: 'biography',
        AWARDS: 'awards',
        TRIVIA: 'trivia'
    },
    commentSort: {
        NEWEST: 'newest',
        RATING: 'rating'
    },
    relationIsHentai: {
        HENTAI: true,
        NO_HENTAI: false
    }
}