const ProxerMe = require('../src')
const testData = require('./test')

// const client = ProxerMe.connect(testData.apiKey)
const constants = ProxerMe.getConstants()

function wait(ms) {
    return new Promise((resolve, reject) => {
        try { setTimeout(() => { resolve() }, ms) }
        catch (err) { reject(err) }
    })
}

async function test() {
    try {
        const userClient = await ProxerMe.login(testData.apiKey, testData.username, testData.password)
        console.log("login successful: " + userClient.id)

        await wait(2345)

        const user = await userClient.getUserById(161212)
        console.log(user.name)
        console.log(user.avatar)

        await wait(3456)

        const topTenItems = await user.getTopTen({ kat: constants.contentCategory.ANIME })
        for (let ttItem of topTenItems) {
            console.log(ttItem.name)
        }

        await wait(4567)

        const anime = await topTenItems[0].getContent()
        console.log(anime.calculateRating())

        await wait(1234)

        await userClient.logout()
        console.log("User client logged out!")
    } 
    catch (err) { console.log(err) }

}

test()
// try { test() }
// catch (err) { console.log(err) }