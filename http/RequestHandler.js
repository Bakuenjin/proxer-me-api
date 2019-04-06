const fetch = require('node-fetch')
const buildRequest = require('./RequestBuilder')
const handleError = require('./ErrorHandler')

/**
 * Fetches data from the specified url.
 * @param {string} url - The url to fetch data from
 * @param {string} method - The fetching mode
 * @param {object} headers - The request headers
 * @param {object} body - The request payload
 * @returns {Promise<object>} 
 */
module.exports = (url, method, headers, body) => {
    return new Promise((resolve, reject) => {
        const requestObj = buildRequest(method, headers, body)
        fetch(url, requestObj).then((response) => {
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