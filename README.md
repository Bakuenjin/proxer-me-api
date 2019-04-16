<div align="center">
  <p>
    <h1>Proxer.me API</h1>
  </p>
</div>

## About

The **proxer-me-api** is a [Node.js](https://nodejs.org) module that allows you to interact with the [Proxer.me API](https://proxer.me/wiki/Proxer_API/v1).

The basic API implementation is **FINISHED** but it needs some more testing and polishing now to make sure every part is functioning properly.

Since my API key for developing only allows access to List, Info and User, I had to eyeball alot for the implementation of the other classes.

## Installation

It will soon be available on NPM since it is getting more and more complete and tested.

Currently your only option is to clone this repository and work with it locally (you could do `npm install path/to/thisRepo` though).

## Example usage

### Establishing connection:

Basic connect:

```js
const ProxerMe = require('proxer-me-api')

// Replace 'YOUR_TOKEN' with your personal API key.
const client = ProxerMe.connect('YOUR_TOKEN')

// Helpful when using alot of optional params!
const constants = ProxerMe.CONSTANTS

// Now you can use the client to do all kinds of communication with the Proxer.me API

const params = {
  name: 'Made in Abyss',
  type: constants.contentType.ANIME_SERIES
}
const results = await client.search(params)
```

Logging in with an user:

```js
const ProxerMe = require('proxer-me-api')

// Replace 'YOUR_TOKEN' with your personal API key, 'USERNAME' with your username and 'PASSWORD' with your password.
const userClient = await ProxerMe.login('YOUR_TOKEN', 'USERNAME', 'PASSWORD')

// Helpful when using alot of optional params!
const constants = ProxerMe.CONSTANTS

// Now you can use the user-client to do all kinds of communication with the Proxer.me API including chat, messenger and user settings.
await userClient.addContentToList(1337, constants.userSetInfoType.FAVORITES)
console.log("Added to favorites!")
```

### Search for content:

```js
// Define your search parameter
const params = {
    name: 'Steins;Gate',
    type: constants.contentType.ANIME_SERIES
}

// Cast the search
const animes = await client.search(params)

// Display information
for (anime of animes) {
    const rating = Math.floor(anime.calculateRating(100))
    console.log(`\nName: ${anime.name}`)
    console.log(`Rating: ${rating}%`)
}

// Now you could go further and cast searches for the comments or forum threads for each anime or even get the stream links.
```

## Documentation

JSDoc generation can be found here:
https://bakuenjin.github.io/proxer-me-api/

## Help

Encountering problems, misbehaviour or unsure how to use this?

Just add me on Discord: **Bakuenjin#0001**
