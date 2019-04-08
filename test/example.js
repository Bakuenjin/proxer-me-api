const ProxerMe = require('../src')

const apiKey = "API_KEY_HERE"
const client = ProxerMe.connect(apiKey)
const constants = ProxerMe.getConstants()

// seems to work on my part, some strange behaviour server side though (happens with Postman too!)
client.search({name: "Fairy"}).then((contents) => {
    for (let anime of contents)
        console.log(anime)
}).catch(catcher)

// categoricalSearch working
client.categoricalSearch({kat: constants.contentCategory.MANGA, medium: constants.contentType.DOUJIN}).then((mangas) => {
    for (let manga of mangas)
        console.log(manga)
}).catch(catcher)

// searchTranslatorGroups working
client.searchTranslatorGroups({country: constants.translatorGroupCountry.AMERICA}).then((groups) => {
    for (let group of groups)
        console.log(group)
}).catch(catcher)

// searchCompanies working
client.searchCompanies({country: constants.companyCountry.JAPAN, type: constants.companyType.STUDIO}).then((companies) => {
    for (let company of companies)
        console.log(company)
}).catch(catcher)

// searchTags working
client.searchTags({type: constants.tagType.HENTAI}).then((tags) => {
    for(let tag of tags)
        console.log(tag)
}).catch(catcher)

// searchCharacters working
client.searchCharacters({contains: 'Kiri'}).then((chars) => {
    for (let char of chars)
        console.log(char)
}).catch(catcher)

// searchPersons working
client.searchPersons({contains: "mi"}).then((persons) => {
    for (let person of persons)
        console.log(person)
}).catch(catcher)

function catcher(err) {
    console.log("Catched an error!")
    console.log(err)
}