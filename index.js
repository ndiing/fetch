const http = require("http");
const https = require("https");
const url = require("url");
const storage = require("@ndiing/storage");

// Interfaces
class Headers extends URLSearchParams {
    constructor(init = {}) {
        super();
        for (const name in init) {
            const value = init[name];
            if (Array.isArray(value)) for (const val of value) this.append(name, val);
            else this.append(name, value);
        }
    }
}

class Request {
    constructor(input = "", options = {}) {
        // input = url.parse(input);
        const port = input.protocol == "https:" ? 443 : 80;
        this.method = "GET";
        this.body = undefined;
        this.agent = undefined;
        this.hostname = input.host;
        this.insecureHTTPParser = true;
        this.path = input.path;
        this.port = parseInt(input.port || port);
        this.protocol = input.protocol;
        this.headers = {
            Host: input.host,
            Connection: "keep-alive",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            Accept: "*/*", //"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "*", //"gzip, deflate, br",
            "Accept-Language": "*", //"en-US,en;q=0.9,id;q=0.8",
            ...options?.headers,
        };
    }
}

class Response {
    constructor(body = [], options = {}) {
        this.body = body;
        this.status = options.statusCode;
        this.statusText = options.statusMessage;
        this.headers = new Headers(options.headers);
    }

    // Returns a promise that resolves with an ArrayBuffer representation of the response body.
    arrayBuffer() {
        return Buffer.concat(this.body);
    }

    // Returns a promise that resolves with the result of parsing the response body text as JSON.
    json() {
        return JSON.parse(this.text());
    }

    // Returns a promise that resolves with a text representation of the response body.
    text() {
        return this.arrayBuffer().toString();
    }
}

// Methods
function fetch(resource = "", options = {}) {
    resource = url.parse(resource);
    const pool = storage.get(resource.hostname, options);
    if (pool.cookie) options.headers["Cookie"] = pool.cookie;
    const request = new Request(resource, options);
    const protocol = request.protocol == "https:" ? https : http;
    return new Promise((resolve, reject) => {
        const req = protocol.request(request, async (res) => {
            const response = new Response([], res);
            const cookies = response.headers.getAll("set-cookie");
            if (cookies && cookies.length) pool.cookie = cookies;
            for await (const chunk of res) response.body.push(chunk);
            resolve(response);
        });
        req.on("error", reject);
        if (request.body) req.write(request.body);
        req.end();
    });
}

fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;
module.exports = fetch;

// // # Fetch
// // nodejs fetch resource like `window.fetch`

// // ### Install
// // ```
// // npm install @ndiing/fetch
// // ```

// // ### Usage

// const fetch = require('@ndiing/fetch')

// fetch('http://jsonplaceholder.typicode.com/posts')
// .then(res=>res.json())
// .then(console.log)
// .catch(console.error)

// // when recive Set-Cookie header
// // cookies will be store in ./data/${hostname}/default.json
// // or setting default `userDataDir` and `profileDirectory`
// // in request options

// // Access data pool by `hostname`
// const pool=storage.get('jsonplaceholder.typicode.com')
// console.log(pool.cookie)
