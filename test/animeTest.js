const ProxerMe = require('../src')
const testData = require('./test')

const client = ProxerMe.testMode()
const constants = ProxerMe.CONSTANTS

async function test() {
    try {
        const animes = await client.searchAnime()
        const anime = animes[0]
        console.log("Anime Name:" + anime.name)
        console.log("Rating: " + Math.round(anime.calculateRating(100)) + "%")

        await testData.sleep(2000)

        const streams = await anime.getStreams(2, constants.streamLanguage.ENGLISH_SUBBED)
        const stream = streams[0]
        console.log("Hoster Name: " + stream.hostName)
        console.log("Episodenzahl:" + stream.episodeCount)

        await testData.sleep(2000)

        const link = await stream.getLink()
        console.log("Stream Link: " + link.url)

        await testData.sleep(2000)

        const r18 = await anime.hasAdultGate()
        console.log("Is this anime 18+? " + r18)

        await testData.sleep(2000)

        const translatorGroups = await anime.getTranslatorGroups()
        const translatorGroup = translatorGroups[0]
        console.log("Translator Group Name: " + translatorGroup.name)
        console.log("Cover Image: " + translatorGroup.image)

        await testData.sleep(2000)

        const seasons = await anime.getSeasons()
        const season = seasons[0]
        console.log("Season name: " + season.name)
        console.log("Season year: " + season.year)
    }
    catch (err) { console.log(err) }
}

test()