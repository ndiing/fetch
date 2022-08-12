const {URL2} = require('./index')
const fetch = require('./index')

const http = require("http");
// const { URL2 } = require("@ndiing/fetch");
// const fetch = require("@ndiing/fetch");

const reverseProxy = http.createServer().listen(80);
// localhost       == https://jsonplaceholder.typicode.com
// localhost/posts == https://jsonplaceholder.typicode.com/posts
// localhost/guide == https://jsonplaceholder.typicode.com/guide
reverseProxy.on("request", (req, res) => {
    // set base url
    const url = new URL2(req.url, "https://jsonplaceholder.typicode.com");
    req.headers = {
        ...req.headers,
        host: url.host,// rewrite host
    };
    req.body = req;// send readable stream
    const request = fetch("" + url, req);
    request.then((response) => {
        // pump response
        res.writeHead(response.status, response.headers);
        response.body.pipe(res);
    });
});
// just simple like that...

// Getting a resource
// fetch('https://google.com')
//   .then(console.log);

// const fetch = require('./index')

// // Getting a resource
// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// // 👇 Output

// // {
// //   id: 1,
// //   title: '...',
// //   body: '...',
// //   userId: 1
// // }
// // Listing all resources
// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// // 👇 Output

// // [
// //   { id: 1, title: '...' /* ... */ },
// //   { id: 2, title: '...' /* ... */ },
// //   { id: 3, title: '...' /* ... */ },
// //   /* ... */
// //   { id: 100, title: '...' /* ... */ },
// // ];
// // Creating a resource
// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// // 👇 Output

// // {
// //   id: 101,
// //   title: 'foo',
// //   body: 'bar',
// //   userId: 1
// // }
// // Important: resource will not be really updated on the server but it will be faked as if.

// // Updating a resource
// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PUT',
//   body: JSON.stringify({
//     id: 1,
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// // 👇 Output

// // {
// //   id: 1,
// //   title: 'foo',
// //   body: 'bar',
// //   userId: 1
// // }
// // Important: resource will not be really updated on the server but it will be faked as if.

// // Patching a resource
// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'PATCH',
//   body: JSON.stringify({
//     title: 'foo',
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// // 👇 Output

// // {
// //   id: 1,
// //   title: 'foo',
// //   body: '...',
// //   userId: 1
// // }
// // Important: resource will not be really updated on the server but it will be faked as if.

// // Deleting a resource
// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'DELETE',
// });
// // Important: resource will not be really updated on the server but it will be faked as if.

// // Filtering resources
// // Basic filtering is supported through query parameters.

// // // This will return all the posts that belong to the first user
// fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
//   .then((response) => response.json())
//   .then((json) => console.log(json));
// // Listing nested resources
// // One level of nested route is available.

// // // This is equivalent to /comments?postId=1
// fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
//   .then((response) => response.json())
//   .then((json) => console.log(json));