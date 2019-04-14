const ProxerMe = require('../src')

const client = ProxerMe.testMode()
const constants = ProxerMe.CONSTANTS

async function test() {
    try {
        const mangas = await client.search({
            type: constants.contentType.MANGA_SERIES,
            name: "Fairy Tail"
        })
    
        for (let manga of mangas)
            console.log(manga.id)
        const first = mangas[0]
    
        const chapter = await first.getChapter(3, constants.contentLanguage.ENGLISH)
        const pages = chapter.allPages
        console.log(pages[0].url)


        const nextChapter = await chapter.next()
        const nextPages = nextChapter.allPages
        console.log(nextPages[0].url)
    } catch (err) {
        console.log(err)
    }



}

test()