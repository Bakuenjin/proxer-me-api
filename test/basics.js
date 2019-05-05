const proxerMe = require('../src')
const utils = require('./utils')
const hidden = require('./hidden')

async function testLogin() {
    try {
        const client = proxerMe.connect({ apiKey: hidden.apiKey })

        // Logging into Proxer.me
        const user = await client.user.login(hidden.username, hidden.password)
        console.log(`Logged in ${hidden.username} (ID: ${user.id})`)
        client.updateApiToken(user.token)

        utils.sleep(3000)

        // Loading the friendlist of the current user
        const friends = await client.user.friends(user.id)
        console.log(friends[0])

        utils.sleep(3000)

        // Logging out
        await client.user.logout()
        console.log(`Logged out ${hidden.username}`)
    }
    catch (err) { console.log(err) }
}

async function testTestmode() {
    try {
        const client = proxerMe.connect()

        // Getting test-mode results
        const results = await client.list.search()
        console.log(results[0])
    }
    catch (err) { console.log(err) }
}

async function run() {
    await testLogin()
    utils.sleep(3000)
    await testTestmode()
}

run()