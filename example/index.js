const fetch = require("../index");

{
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "POST", body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }), headers: { "Content-type": "application/json; charset=UTF-8" } })
        .then((response) => response.json())
        .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "PUT", body: JSON.stringify({ id: 1, title: "foo", body: "bar", userId: 1 }), headers: { "Content-type": "application/json; charset=UTF-8" } })
        .then((response) => response.json())
        .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "PATCH", body: JSON.stringify({ title: "foo" }), headers: { "Content-type": "application/json; charset=UTF-8" } })
        .then((response) => response.json())
        .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "DELETE" });
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
        .then((response) => response.json())
        .then((json) => console.log(json));
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then((response) => response.json())
        .then((json) => console.log(json));
}

// {
//     // penanganan redirect
//     fetch('http://google.com')
//     .then(console.log)
//     .catch(console.log)
// }

// {
//     // penanganan kompresi
//     fetch('https://jsonplaceholder.typicode.com/posts/1',{
//         headers:{
//             'accept-encoding':'br'
//         }
//     })
//     .then(res=>res.json())
//     .then(console.log)
//     .catch(console.log)

//     // penanganan kompresi
//     fetch('https://jsonplaceholder.typicode.com/posts/1',{
//         headers:{
//             'accept-encoding':'gzip'
//         }
//     })
//     .then(res=>res.json())
//     .then(console.log)
//     .catch(console.log)

//     // penanganan kompresi
//     fetch('https://jsonplaceholder.typicode.com/posts/1',{
//         headers:{
//             'accept-encoding':'deflate'
//         }
//     })
//     .then(res=>res.json())
//     .then(console.log)
//     .catch(console.log)
// }

// {
//     // penanganan cookies

//     const store = createStore('./data/google.json',{})

//     fetch('http://google.com',{
//         store
//     })
//     .then(console.log)
//     .catch(console.log)

//     console.log(store)
// }

// {
//     // penanganan proxy
//     // proxy auto detect ketika fiddler atau software monitoring lainnya dibuka

//     fetch('http://google.com',{
//     })
//     .then(console.log)
//     .catch(console.log)

// }
