<div align="center">
  <p>
    <h1>Proxer.me API</h1>
  </p>
</div>

## About

The **proxer-me-api** is a [Node.js](https://nodejs.org) module that allows you to interact with the [Proxer.me API](https://proxer.me/wiki/Proxer_API/v1).

## Installation

It will soon be available on NPM since it is getting more and more complete and tested.

Currently your only option is to clone this repository and work with it locally (you could do `npm install path/to/thisRepo` though).

## Example usage

### Establishing connection:

Basic connect:

```js
const proxerMe = require('proxer-me-api')

// Replace 'YOUR_TOKEN' with your personal API key.
const client = proxerMe.connect({ apiKey: 'YOUR_TOKEN' })

// Helpful when using alot of optional params!
const constants = proxerMe.CONSTANTS

// Now you can use the client to do all kinds of communication with the Proxer.me API
```

Logging in with an user:

```js
const proxerMe = require('proxer-me-api')

// Replace 'YOUR_TOKEN' with your personal API key.
const client = proxerMe.connect({ apiKey: 'YOUR_TOKEN' })

// Cast the login
const loginUser = await client.user.login('USERNAME', 'PASSWORD')

// Update the client to use the apiToken while communicating with the Proxer.me API
client.updateApiToken(loginUser.token)

// Now you can use the user-client to do all kinds of communication with the Proxer.me API including chat, messenger and user settings.
```

### Search for content:

```js
// Define your search parameter
const params = {
    name: 'Made in Abyss',
    type: constants.contentType.ANIME_SERIES
}

// Cast the search
const animes = await client.list.search(params)

// Display information
for (anime of animes) {
    const rating = Math.floor(anime.calculateRating(100))
    console.log(`\nName: ${anime.name}`)
    console.log(`Rating: ${rating}%`)
}

// Now you could go further and cast searches for the comments or forum threads for each anime or even get the stream links.
```

## Documentation

JSDoc generation can be found here (outdated, will be updated soon):
https://bakuenjin.github.io/proxer-me-api/

## Help

Encountering problems, misbehaviour or unsure how to use this?

Just add me on Discord: **Bakuenjin#0001**
