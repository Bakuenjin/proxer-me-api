<div align="center">
  <p>
    <h1>Proxer.me API</h1>
  </p>
</div>

## About
The **proxer-me-api** is a [Node.js](https://nodejs.org) module that allows you to interact with the [Proxer.me API](https://proxer.me/wiki/Proxer_API/v1).

It is currently in heavy development and covers around **90%** of the API.

Current progress:
- [User](https://proxer.me/wiki/Proxer_API/v1/User) implementation: **95%**
- [List](https://proxer.me/wiki/Proxer_API/v1/List) implementation: **100%**
- [Info](https://proxer.me/wiki/Proxer_API/v1/Info) implementation: **100%**
- [UCP](https://proxer.me/wiki/Proxer_API/v1/Ucp) implementation: **100%**
- [Notifications](https://proxer.me/wiki/Proxer_API/v1/Notifications) implementation: **100%**
- [Media](https://proxer.me/wiki/Proxer_API/v1/Media) implementation: **100%**
- [Anime](https://proxer.me/wiki/Proxer_API/v1/Anime) implementation: **100%**
- [Manga](https://proxer.me/wiki/Proxer_API/v1/Manga) implementation: **100%**
- [Messenger](https://proxer.me/wiki/Proxer_API/v1/Messenger) implementation: **100%**
- [Forum](https://proxer.me/wiki/Proxer_API/v1/Forum) implementation: **100%**
- [Apps](https://proxer.me/wiki/Proxer_API/v1/Apps) implementation: **100%**
- [Chat](https://proxer.me/wiki/Proxer_API/v1/Chat) implementation: **0%**

## Installation
It isn't avaiable on NPM yet.

This package is missing alot of testing since my personal development key has only very limited access to this API.

But you can clone this repository and work with it!

## Example usage
Using the async/await syntax:
```js
const ProxerMe = require('proxer-me-api')

const client = ProxerMe.connect('YOUR_TOKEN') // Replace 'YOUR_TOKEN' with your personal API key.
const constants = ProxerMe.getConstants() // Helpful when using alot of optional params!

try {
  // Configure your API call
  const params = {
    name: 'Fairy',
    length: 42
  }
  
  // Cast and await the call
  const entries = await client.search(params)
  
  // Work with the data!
  for (let entry of entries) {
    console.log(entry.name)
  }
}
catch (err) {
  console.log(err)
}
```

Using the Promise syntax:
```js
const ProxerMe = require('proxer-me-api')

const client = ProxerMe.connect('YOUR_TOKEN') // Replace 'YOUR_TOKEN' with your personal API key.
const constants = ProxerMe.getConstants() // Helpful when using alot of optional params!

// Configure your API call
const params = {
  name: 'Fairy',
  length: 42
}

// Cast the call
client.search(params).then((entries) => {

  // Work with the data!
  for (let entry of entries) {
    console.log(entry.name)
  }
  
}).catch((err) => {
  console.log(err))
})
```

## Documentation
JSDoc generation can be found here:
https://bakuenjin.github.io/proxer-me-api/

## Help
Encountering problems, misbehaviour or unsure how to use this?

Just add me on Discord: **Bakuenjin#0001**
