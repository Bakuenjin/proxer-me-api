<div align="center">
  <p>
    <h1>Proxer.me API</h1>
  </p>
</div>

## About

The **proxer-me-api** is a [Node.js](https://nodejs.org) module that allows you to interact with the [Proxer.me API](https://proxer.me/wiki/Proxer_API/v1).

The basic API implementation is **FINISHED** but it needs alot of testing now to make sure every part is functioning properly.

Since my API key for developing only allows access to List, Info and User, I had to eyeball alot for the implementation of the other classes.

## Installation

It isn't avaiable on NPM yet.

This package is missing alot of testing since my personal development key has only very limited access to this API.

But you can clone this repository and work with it!

## Example usage

Using the async/await syntax:

```js
const ProxerMe = require('proxer-me-api')

const client = ProxerMe.connect('YOUR_TOKEN') // Replace 'YOUR_TOKEN' with your personal API key.
const constants = ProxerMe.CONSTANTS // Helpful when using alot of optional params!

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
const constants = ProxerMe.CONSTANTS // Helpful when using alot of optional params!

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
