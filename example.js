const fetch = require('./index')

// @test

// Using fetch request
fetch('http://jsonplaceholder.typicode.com/posts')
.then(console.log)

// Get response to JSON format
fetch('http://jsonplaceholder.typicode.com/posts')
.then(res=>res.json())
.then(console.log)
.catch(console.log)

// Request with compresstion
// it handle gzip, deflate and br
fetch('http://jsonplaceholder.typicode.com/posts',{
    headers:{
        'accept-encoding':'gzip, deflate, br'
    }
})
.then(res=>res.json())
.then(console.log)
.catch(console.log)

// Request with redirect `manual`
// default is `follow`
fetch('http://jsonplaceholder.typicode.com/guide',{
    redirect:'manual'
})
.then(res=>res.text())
.then(console.log)
.catch(console.log)

// Request with previous cookie
// it also save cookie from `set-cookie` response
// when options.credential set to not `omit`
// data will be stored in ./data/${hostname}/default.json
// also you can set `options.userDataDir` and `options.profileDirectory`
// it will create as ./${options.userDataDir}/${hostname}/${options.profileDirectory}.json
fetch("https://mitra.tokopedia.com/")
.then((res) => res.text())
.then(console.log)
.catch(console.log);
