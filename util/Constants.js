'use strict'

exports.fskTypes = [
    'FSK0',
    'FSK6',
    'FSK12',
    'FSK16',
    'FSK18',
    'BAD_LANGUAGE',
    'VIOLENCE',
    'FEAR',
    'SEX'
]

exports.sortTypes = [
    'RELEVANCE',
    'CLICKS',
    'RATING',
    'COUNT',
    'NAME'
]

exports.tagRateFilterTypes = {
    DEFINED_TAGS: 'rate_1',
    INCLUDE_UNDEFINED_TAGS: 'rate_10'
}

exports.tagSpoilerFilterTypes = {
    NO_SPOILER: 'spoiler_0',
    SPOILER: 'spoiler_1',
    SPOILER_AND_NO_SPOILER: 'spoiler_10'
}

exports.categoryTypes = [
    'ANIME',
    'MANGA'
]

exports.seasonTypes = [
    'START',
    'END'
]

exports.sortOptionTypes = [
    'TITLE',
    'CLICKS',
    'RATING'
]

exports.sortTypes = [
    'ASC',
    'DESC'
]

exports.animeSeasonTypes = {
    UNKNOWN: 0,
    WINTER: 1,
    SPRING: 2,
    SUMMER: 3,
    FALL: 4
}

exports.mediumTypes = [
    'ANIMESERIES',
    'MOVIE',
    'OVA',
    'HENTAI',
    'MANGASERIES',
    'ONESHOT',
    'DOUJIN',
    'HMANGA'
]

exports.stateTypes = {
    PRE: 0,
    DONE: 1,
    ONGOING: 2,
    QUIT: 3,
    SUBOPEN: 4
}