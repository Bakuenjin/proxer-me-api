const fs = require('fs')
const path = require('path')

const ProxerMe = require('../src')

const apiKey = require('./test')
const client = ProxerMe.connect(apiKey)
const constants = ProxerMe.CONSTANTS

const Anime = require('../src/structures/Anime')

const animeObj = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mock', 'anime.json')))
const testAnime = new Anime(client, animeObj)

// console.log(testAnime.genres)

// // getRelations working
// testAnime.getRelations().then((relations) => {
//     for(let relation of relations)
//         console.log(relation.)
// })

// // getTranslatorGroups working
// testAnime.getTranslatorGroups().then((groups) => {
//     for (let group of groups)
//         console.log(group)
// })

// // hasAdultGate working
// testAnime.hasAdultGate().then((result) => {
//     console.log(`Has adult gate? ${result}`)
// })

// // getCompanies working (more types than whats listed online?)
// testAnime.getCompanies().then((companies) => {
//     for (let comp of companies)
//         console.log(comp)
// })

// // getCharacters working
// testAnime.getCharacters().then((chars) => {
//     for (let char of chars)
//         console.log(char)
// })

// // getPersons working
// testAnime.getPersons().then((persons) => {
//     for (let person of persons)
//         console.log(person)
// })

// // getTags working
// testAnime.getTags()
//     .then(handleResolve)
//     .catch(handleReject)

// // getComments working
// testAnime.getComments()
//     .then(handleResolve)
//     .catch(handleReject)

// // getForumThreads working
// testAnime.getForumThreads()
//     .then(handleResolve)
//     .catch(handleReject)

// // seems to work LMAO
// testAnime.getFullDetails().then((fdc) => {
//     console.log(fdc)
//     console.log("\n\n\nTranslator Groups")
//     handleResolve(fdc.getTranslatorGroups())
//     console.log("Companies")
//     handleResolve(fdc.getCompanies())
//     console.log("Characters")
//     handleResolve(fdc.getCharacters())
//     console.log("Persons")
//     handleResolve(fdc.getPersons())
// }).catch(handleReject)

// function handleResolve(anything) {
//     for (let something of anything)
//         console.log(something)
// }

// function handleReject(err) {
//     console.log("oopsie, I did a fuwcky wucky")
//     console.log(err)
// }