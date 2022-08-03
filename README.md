# Fetch
nodejs fetch resource like `window.fetch`

### Install
```
npm install @ndiing/fetch
```

### Usage


```js
const fetch = require('@ndiing/fetch')

fetch('http://jsonplaceholder.typicode.com/posts')
.then(res=>res.json())
.then(console.log)
.catch(console.error)

// when recive Set-Cookie header
// cookies will be store in ./data/${hostname}/default.json
// or setting default `userDataDir` and `profileDirectory`
// in request options

// Access data pool by `hostname`
const pool=storage.get('jsonplaceholder.typicode.com')
// console.log(pool.cookie)
```