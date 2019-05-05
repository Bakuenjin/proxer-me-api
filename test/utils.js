/**
 * Wraps the setTimeout into a Promise.
 * 
 * This makes it useable with the async/await pattern.
 * @param {number} ms - The time to wait in milliseconds.
 * @returns {Promise<void>}
 */
exports.sleep = (ms) => {
    return new Promise((resolve, reject) => {
        try { setTimeout(() => { resolve() }, ms) } 
        catch (err) { reject(err) } 
    })
}