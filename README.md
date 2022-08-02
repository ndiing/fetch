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

// when request has set-cookie
// the cookie will be stored in ./data/hostname/default.json
// and used for next request

// Use Storage
const pool=Data.pool('jsonplaceholder.typicode.com')

// Get cookie
pool.cookie

// Set Cookie
pool.cookie='name=value'
pool.cookie=[
    'name=value',
    'name2=value2',
]

// Use localStorage
pool.localStorage

// localStorage methods
pool.localStorage.getItem('name')
pool.localStorage.setItem('name','value')

// and another method same with `window.localStorage`

// Use cookieStore
pool.cookiStore

// all method same with `window.cookieStore`
```
