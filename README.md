# [fetch](https://ndiing.github.io/fetch/)

fetch

### Install

```
npm install @ndiinginc/fetch
```

### Usage

```js
const fetch = require("@ndiinginc/fetch");

// This page is redirecting
fetch("https://jsonplaceholder.typicode.com/guide")
    .then((response) => response.text())
    .then((html) => console.log(html));

// Avoid redirect
fetch("https://jsonplaceholder.typicode.com/guide", {
    redirect: "manul",
})
    .then((response) => response.text())
    .then((html) => console.log(html));

// Getting a Compressed resource
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    headers: {
        "Accept-Encoding": "gzip, deflate, br",
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

// Load previous cookie
fetch("https://mitra.tokopedia.com/")
    .then((response) => response.text())
    .then((text) => console.log(text));

// Unload previous cookie
fetch("https://mitra.tokopedia.com/", {
    credentials: "omit",
})
    .then((response) => response.text())
    .then((text) => console.log(text));

// Getting a resource
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => console.log(json));

//   Listing all resources
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => console.log(json));
// Creating a resource
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

// Updating a resource
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

//   Patching a resource
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PATCH",
    body: JSON.stringify({
        title: "foo",
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

//   Deleting a resource
fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
});

// This will return all the posts that belong to the first user
fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    .then((response) => response.json())
    .then((json) => console.log(json));
// This is equivalent to /comments?postId=1
fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
    .then((response) => response.json())
    .then((json) => console.log(json));
```
