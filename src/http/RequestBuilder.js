'use strict'

/**
 * Converts a JavaScript Object into a FormData object.
 * @param {object} obj - A normal JS object
 */
function convertJsonToFormData(obj) {
    const formData = []
    const keys = Object.keys(obj)
    for(let key of keys) {
        formData.push(`${key}=${obj[key]}`)
    }
    return formData.join("&")
}

/**
 * Bundles and converts the data into a single POST request object.
 * @param {string} methodType - The request type
 * @param {object} headers - The headers for the request
 * @param {object} body - The request payload
 * @returns {object}
 */
exports.postRequest = (headers, body) => {
    return {
        method: 'POST',
        headers: headers,
        body: convertJsonToFormData(body)
    }
}

exports.getRequest = (headers) => {
    return {
        method: 'GET',
        headers: headers
    }
}