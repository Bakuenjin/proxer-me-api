'use strict'

const fetch = require('node-fetch')
const handleError = require('./ErrorHandler')

/**
 * Fetches data from the specified url.
 * @param {string} url - The url to fetch data from
 * @param {object} requestParams - The request parameters
 * @returns {Promise<object>} 
 */
module.exports = (url, requestParams) => {
    return new Promise((resolve, reject) => {
        fetch(url, requestParams).then((response) => {
            if (response.status == 200) {
                response.json().then((json) => {
                    if (json.error !== 0) reject(handleError(json.code))
                    else resolve(json.data)
                })
            }
            else reject(new Error("Connection status error!\nStatus: " + response.status))
        }).catch(reject)
    })
}