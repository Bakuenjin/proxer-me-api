'use strict'

const FormData = require('form-data')

/**
 * Converts a JavaScript Object into a FormData object.
 * @param {object} obj - A normal JS object
 */
function convertJsonToFormData(obj) {
    const formData = new FormData()
    const keys = Object.keys(obj)
    for(let key of keys) {
        formData.append(key, obj[key])
    }
    return formData
}

/**
 * Bundles and converts the data into a single request object.
 * @param {string} methodType - The request type
 * @param {object} headers - The headers for the request
 * @param {object} body - The request payload
 * @returns {object}
 */
module.exports = (methodType, headers, body) => {
    return {
        methodType: methodType,
        headers: headers,
        body: convertJsonToFormData(body)
    }
}