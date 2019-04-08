<div align="center">
  <p>
    <h1>Proxer.me API</h1>
  </p>
</div>

## About
The **proxer-me-api** is a [Node.js](https://nodejs.org) module that allows you to interact with the [Proxer.me API](https://proxer.me/wiki/Proxer_API/v1).

It is currently in heavy development and only covers around **30%** of the API.

[List](https://proxer.me/wiki/Proxer_API/v1/List) and [Info](https://proxer.me/wiki/Proxer_API/v1/Info) are fully implemented though.

## Installation
Since the package is still lacking alot of coverage, it isn't avaiable on NPM yet.

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
Does not exist yet!
Once the base of this module is finished, a documentation will be added.

## Help
Encountering problems, misbehaviour or unsure how to use this?

Just add me on Discord: **Bakuenjin#0001**
