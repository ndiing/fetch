const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");

function read(file, data) {
    try {
        data = fs.readFileSync(file, "utf8");
        data = JSON.parse(data);
    } catch (error) {
        write(file, data);
    }
    return data;
}
function write(file, data) {
    const dir = path.dirname(file);
    try {
        fs.readdirSync(dir);
    } catch (error) {
        fs.mkdirSync(dir, { recursive: true });
    }
    data = JSON.stringify(data);
    fs.writeFileSync(file, data);
}
function queue() {
    return (function () {
        let pending = Promise.resolve();
        async function execute(cb) {
            try {
                await pending;
            } finally {
                return cb();
            }
        }
        return (cb) => (pending = execute(cb));
    })();
}

// Usage
// const task1 = queue()
// const task2 = queue()

// task1(() => new Promise(resolve=>setTimeout(resolve,1000,'task1 1'))).then(console.log)
// task1(() => new Promise(resolve=>setTimeout(resolve,1000,'task1 2'))).then(console.log)
// task1(() => new Promise(resolve=>setTimeout(resolve,1000,'task1 3'))).then(console.log)
// task2(() => new Promise(resolve=>setTimeout(resolve,1000,'task2 1'))).then(console.log)
// task2(() => new Promise(resolve=>setTimeout(resolve,1000,'task2 2'))).then(console.log)
// task2(() => new Promise(resolve=>setTimeout(resolve,1000,'task2 3'))).then(console.log)

class Storage {
    get length() {
        return Object.getOwnPropertyNames(this).length;
    }
    constructor(init = {}) {
        for (const name in init) this[name] = init[name];
    }
    clear() {
        for (const name of Object.getOwnPropertyNames(this)) this.removeItem(name);
    }
    getItem(name) {
        return this[name];
    }
    key(index) {
        return Object.getOwnPropertyNames()[index];
    }
    removeItem(name) {
        delete this[name];
    }
    setItem(name, value) {
        this[name] = value;
    }
}

// Set-Cookie: <cookie-name>=<cookie-value>
// Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
// Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<number>
// Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
// Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
// Set-Cookie: <cookie-name>=<cookie-value>; Secure
// Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly

// Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
// Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
// Set-Cookie: <cookie-name>=<cookie-value>; SameSite=None; Secure

// // Multiple attributes are also possible, for example:
// Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly

class CookieStore {
    get cookie() {
        return Object.getOwnPropertyNames(this)
            .map((name) => `${name}=${this[name].value}`)
            .join("; ");
    }
    set cookie(value) {
        if (!value) return;
        if (typeof value == "string")
            if (/(Expires|Max-Age|Domain|Path|Secure|HttpOnly|SameSite)/i.test(value)) value = [value];
            else value = value.split("; ");

        for (const cookieString of value) {
            const cookieObject = {};
            for (const cookie of cookieString.split("; ")) {
                const [name, value] = cookie.split("=");
                if (/^Expires$/i.test(name)) cookieObject.expires = value;
                else if (/^Max-Age$/i.test(name)) cookieObject.maxAge = value;
                else if (/^Domain$/i.test(name)) cookieObject.domain = value;
                else if (/^Path$/i.test(name)) cookieObject.path = value;
                else if (/^Secure$/i.test(name)) cookieObject.secure = true;
                else if (/^HttpOnly$/i.test(name)) cookieObject.httpOnly = true;
                else if (/^SameSite$/i.test(name)) cookieObject.sameSite = value;
                else {
                    cookieObject.name = name;
                    cookieObject.value = value;
                }
            }
            if (cookieObject.value) this.set(cookieObject);
            else this.delete(cookieObject);
        }
    }
    constructor(init = {}) {
        for (const name in init) this[name] = init[name];
    }
    cookieObject(name, value) {
        if (typeof name == "string") name = { name, value };
        return name;
    }
    delete(...args) {
        const cookie = this.cookieObject(...args);
        delete this[cookie.name];
    }
    get(...args) {
        const cookie = this.cookieObject(...args);
        return this[cookie.name];
    }
    getAll(...args) {
        const cookie = this.cookieObject(...args);
        return this[cookie.name];
    }
    set(...args) {
        const cookie = this.cookieObject(...args);
        this[cookie.name] = cookie;
    }
}

// Usage

// const cookieStore = new CookieStore();
// cookieStore.cookie = "sessionId=38afes7a8";
// cookieStore.cookie = "id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT";
// cookieStore.cookie = "id=a3fWa; Max-Age=2592000";
// cookieStore.cookie = "qwerty=219ffwef9w0f; Domain=somecompany.co.uk";
// cookieStore.cookie = "sessionId=e8bb43229de9; Domain=foo.example.com";
// cookieStore.cookie = "__Secure-ID=123; Secure; Domain=example.com";
// cookieStore.cookie = "__Host-ID=123; Secure; Path=/";
// cookieStore.cookie = "__Secure-id=1";
// cookieStore.cookie = "__Host-id=1; Secure";
// cookieStore.cookie = "__Host-id=1; Secure; Path=/; Domain=example.co";
// console.log(cookieStore.cookie);

// Implement Storage and CookieStore
class Data {
    get localStorage() {
        return this.data.localStorage;
    }
    get cookieStore() {
        return this.data.cookieStore;
    }

    get cookie() {
        return this.cookieStore.cookie;
    }
    set cookie(value) {
        this.cookieStore.cookie = value;
    }

    static pools = {};

    static pool(hostname, options = {}) {
        const { userDataDir = "./data", profileDirectory = "default" } = options;
        const file = `${userDataDir}/${hostname}/${profileDirectory}.json`;
        if (!this.pools[file]) this.pools[file] = new Data(file);

        return this.pools[file];
    }

    constructor(file = "", data = {}) {
        this.file = file;
        this.data = data;
        this.task = queue();
        this.data = read(this.file, this.data);
        // Create proxy
        // watch updated data
        const handler = {
            get: (target, name) => {
                if (
                    typeof target[name] == "object" && //
                    target[name] !== null &&
                    !Array.isArray(target[name])
                )
                    return new Proxy(target[name], handler);
                return target[name];
            },
            set: (target, name, value) => {
                const oldValue = target[name];
                if (oldValue == value) return true;
                Reflect.set(target, name, value);
                this.updated();
                return true;
            },
            deleteProperty: (target, name) => {
                const oldValue = target[name];
                if (oldValue == undefined) return true;
                Reflect.deleteProperty(target, name, value);
                this.updated();
                return true;
            },
        };
        // handler.get = handler.get.bind(this);
        // handler.set = handler.set.bind(this);
        // handler.deleteProperty = handler.deleteProperty.bind(this);
        this.data = {
            localStorage: new Storage(this.data?.localStorage ?? {}),
            cookieStore: new CookieStore(this.data?.cookieStore ?? {}),
        };
        this.data = new Proxy(this.data, handler);
        // access this.data
    }

    updated() {
        console.log(this);
        this.task(() => write(this.file, this.data));
    }
}

// Usage

// const data = new Data('./data.json',{});
// data.data.name=1
// data.localStorage.setItem('name1','value1')
// data.localStorage.setItem('name1','value1')
// data.localStorage.setItem('name2','value1')

// With pool
// console.log(Data.pool('localhost').cookieStore.cookie='name1=value1')

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
    const pool = Data.pool(resource.hostname, options);
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

fetch.read=read
fetch.write=write
fetch.queue=queue
fetch.Storage=Storage
fetch.CookieStore=CookieStore
fetch.Data=Data
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;
module.exports = fetch;

// # Fetch
// nodejs fetch resource like `window.fetch`

// ### Install
// ```
// npm install @ndiing/fetch
// ```

// ### Usage

// const fetch = require('@ndiing/fetch')

// fetch('http://jsonplaceholder.typicode.com/posts')
// .then(res=>res.json())
// .then(console.log)
// .catch(console.error)

// when request has set-cookie
// the cookie will be stored in ./data/hostname/default.json
// and used for next request

// Use Storage
// const pool=Data.pool('jsonplaceholder.typicode.com')

// Get cookie
// pool.cookie

// Set Cookie
// pool.cookie='name=value'
// pool.cookie=[
//     'name=value',
//     'name2=value2',
// ]

// Use localStorage
// pool.localStorage

// localStorage methods
// pool.localStorage.getItem('name')
// pool.localStorage.setItem('name','value')

// and another method same with `window.localStorage`

// Use cookieStore
// pool.cookiStore

// all method same with `window.cookieStore`