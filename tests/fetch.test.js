const Database = require("@ndiinginc/dal");
const Cookie = require("@ndiinginc/cookie");
const fetch = require("../src/shared/fetch");

const db = new Database({
    client: "better-sqlite3",
    connection: { database: "./test.db" },
    // debug: true,
});
const cookie = new Cookie(db, {
    apiId: "test",
    sessionId: "test",
});

describe("fetch", () => {
    test("test", () => {});
    // test("fetch with cookie", async () => {
    //     fetch('https://www.google.com/',{
    //         cookie
    //     })
    //     // .then((response) => response.json())
    //     // .then((json) => console.log(json));
    // });
    // test("fetch with params", async () => {
    //     fetch('https://jsonplaceholder.typicode.com/posts/:id',{
    //         params:{id:2}
    //     })
    //     // .then((response) => response.json())
    //     // .then((json) => console.log(json));
    // });
    // test("fetch with params", async () => {
    //     fetch('https://jsonplaceholder.typicode.com/posts',{
    //         query:{userId:1}
    //     })
    //     // .then((response) => response.json())
    //     // .then((json) => console.log(json));
    // });
    // test("fetch with proxy", async () => {
    //     // process.env.HTTP_PROXY='http://127.0.0.1:8888'
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    // });
});
