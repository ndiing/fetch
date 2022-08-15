const http = require("http");
const https = require("https");
const zlib = require("zlib");
const { Readable } = require("stream");
const { Blob } = require("buffer");
const StorageManager = require("@ndiing/storage");

/**
 *
 */
class URLSearchParams2 {
    /**
     *
     * @param {String} init
     */
    constructor(init = "") {
        init = init
            .replace(/[^\?]+\?/g, "")
            .replace(/^\?/g, "")
            .replace(/#[^#]+/g, "")
            .matchAll(/([^\=&]+?)\=([^\=&]+?)(&|$)/g);
        for (const [, name, value] of init) {
            this.append(name, value);
        }
    }

    /**
     *
     * @param {String} name
     * @param {String} value
     */
    append(name, value) {
        if (this[name]) {
            if (Array.isArray(this[name])) {
                this[name].push(value);
            } else {
                this[name] = [this[name], value];
            }
        } else {
            this[name] = value;
        }
    }

    /**
     *
     * @param {String} name
     */
    delete(name) {
        delete this[name];
    }

    /**
     *
     * @returns {Array}
     */
    entries() {
        const values = [];
        for (const name of this.keys()) {
            values.push([name, this[name]]);
        }
        return values;
    }

    /**
     *
     * @param {Function} callback
     */
    forEach(callback) {
        for (const name of this.keys()) {
            callback(this[name], name);
        }
    }

    /**
     *
     * @param {String} name
     * @returns {String/array}
     */
    get(name) {
        return this[name];
    }

    /**
     *
     * @param {String} name
     * @returns {String/Array}
     */
    getAll(name) {
        return this[name];
    }

    /**
     *
     * @param {String} name
     * @returns {Boolean}
     */
    has(name) {
        return !!this[name];
    }

    /**
     *
     * @returns {Array}
     */
    keys() {
        return Object.getOwnPropertyNames(this);
    }

    /**
     *
     * @param {String} name
     * @param {String} value
     */
    set(name, value) {
        this[name] = value;
    }
    // sort() {}

    /**
     *
     * @returns {String}
     */
    toString() {
        const values = [];
        for (const name of this.keys()) {
            values.push([name, this[name]].join("="));
        }
        return values.join("&");
    }

    /**
     *
     * @returns {Array}
     */
    values() {
        const values = [];
        for (const name of this.keys()) {
            values.push(this[name]);
        }
        return values;
    }
}

// @test
// console.log(new URLSearchParams2("https://www.google.com:3000/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(new URLSearchParams2("https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(new URLSearchParams2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(new URLSearchParams2("?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(new URLSearchParams2("q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(''+new URLSearchParams2("q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8"));

/**
 * @see {@link https://www.rfc-editor.org/rfc/rfc3986#appendix-B}
 */
class URL2 {
    /**
     * @property {String} href=http://localhost
     */
    /**
     * @property {String} protocol=http:
     */
    /**
     * @property {String} scheme=http
     */
    /**
     * @property {String} authority=//localhost
     */
    /**
     * @property {String} host=localhost
     */
    /**
     * @property {String} pathname=/
     */
    /**
     * @property {String} search
     */
    /**
     * @property {String} query
     */
    /**
     * @property {String} hash
     */
    /**
     * @property {String} fragment
     */
    /**
     * @property {String} hostname=localhost
     */
    /**
     * @property {Number} port=80
     */
    /**
     * @property {String} origin=http://localhost
     */
    /**
     * @property {Object} searchParams
     */
    /**
     * @property {String} path=/
     */

    /**
     *
     * @param {String} url
     * @param {String} base=http://localhost
     */
    constructor(url = "", base = "http://localhost") {
        if (!/^(([^:/?#]+):)(\/\/([^/?#]*))/.test(url)) {
            url = base + url;
        }
        const regexp = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
        // prettier-ignore
        const [
            href,// 'https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url',
            protocol,// 'https:',
            scheme,// 'https',
            authority,// '//www.google.com',
            host,// 'www.google.com',
            pathname='',// '/search',
            search='',// '?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8',
            query='',// 'q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8',
            hash='',// '#url',
            fragment='',// 'url',
            // index: 0,
            // input: 'https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url',
            // groups: undefined
          ]=((''+url).match(regexp))
        const [hostname, port] = ("" + host).split(":");

        this.href = href;
        this.protocol = protocol;
        this.scheme = scheme;
        this.authority = authority;
        this.host = host;
        this.pathname = pathname || "/";
        this.search = search;
        this.query = query;
        this.hash = hash;
        this.fragment = fragment;
        this.hostname = hostname;
        this.port = parseInt(port || (this.protocol == "https:" ? 443 : 80));

        this.origin = this.protocol + this.authority;
        // this.password;
        this.searchParams = new URLSearchParams2(this.search);
        // this.username;
        this.path = this.pathname + this.search + this.hash;
    }
    // createObjectURL() {}
    // revokeObjectURL() {}
    // toJSON() {}

    /**
     *
     * @returns {String}
     */
    toString() {
        let searchParams = "" + this.searchParams;
        if (searchParams) {
            searchParams = "?" + searchParams;
        }
        return this.origin + this.pathname + searchParams + this.hash;
    }
}

// @test
// console.log(new URL2("https://www.google.com:3000/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(new URL2("https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(new URL2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));
// console.log(''+new URL2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59i512j0i512l6j69i60.1284j0j4&sourceid=chrome&ie=UTF-8#url"));

/**
 *
 */
class Headers {
    /**
     *
     * @param {Object/Array} init
     */
    constructor(init = {}) {
        // init={}
        // init=[]
        for (const name in init) {
            if (Array.isArray(init[name])) {
                for (const value of init[name]) {
                    this.set(name, value);
                }
            } else {
                this.set(name, init[name]);
            }
        }
    }

    /**
     *
     * @param {String} name
     * @param {String/Array} value
     */
    append(name, value) {
        name = name.toLowerCase();
        if (this[name]) {
            if (Array.isArray(this[name])) {
                this[name].push(value);
            } else {
                this[name] = [this[name], value];
            }
        } else {
            this[name] = value;
        }
    }

    /**
     *
     * @param {String} name
     */
    delete(name) {
        name = name.toLowerCase();
        delete this[name];
    }

    /**
     *
     * @returns {Array}
     */
    entries() {
        const values = [];
        for (const name of this.keys()) {
            values.push([name.replace(/(^|-)(\w)/g, ($, $1, $2) => $1 + $2.toUpperCase()), this[name]]);
        }
        return values;
    }

    /**
     *
     * @param {String} name
     * @returns {String/Array}
     */
    get(name) {
        name = name.toLowerCase();
        return this[name];
    }

    /**
     *
     * @param {String} name
     * @returns {Boolean}
     */
    has(name) {
        name = name.toLowerCase();
        return !!this[name];
    }

    /**
     *
     * @returns {Array}
     */
    keys() {
        return Object.getOwnPropertyNames(this);
    }

    /**
     *
     * @param {String} name
     * @param {String/Array} value
     */
    set(name, value) {
        name = name.toLowerCase();
        this[name] = value;
    }

    /**
     *
     * @returns {Array}
     */
    values() {
        const values = [];
        for (const name of this.keys()) {
            values.push(this[name]);
        }
        return values;
    }
}

// @test
// console.log(new Headers())
// console.log(new Headers(new Headers({
//     'content-type':'text/html'
// })))
// console.log(new Headers({
//     'content-type':'application/json'
// }).has('Content-Type'))

/**
 *
 */
class Request {
    /**
     * @property {String/Readable} body
     */
    /**
     * @property {String} credentials=same-origin
     */
    /**
     * @property {Object/Headers} headers
     */
    /**
     * @property {String} method=GET
     */
    /**
     * @property {String} redirect=follow
     */
    /**
     * @property {String} url
     */

    /**
     * @property {Object} agent
     */
    /**
     * @property {String} hostname
     */
    /**
     * @property {Boolean} insecureHTTPParser
     */
    /**
     * @property {String} path
     */
    /**
     * @property {Number} port
     */
    /**
     * @property {String} protocol
     */
    /**
     * @property {Number} timeout
     */
    /**
     * @property {Boolean} compression
     */

    /**
     *
     * @param {String/Request} input
     * @param {Object} options
     */
    constructor(input = "", options = {}) {
        if (input instanceof Request) {
            input = input.url;
            options = {
                ...input,
                ...options,
                headers: {
                    ...input?.headers,
                    ...options?.headers,
                },
            };
        }
        this.input = new URL2(input);
        this.body = options.body;
        if (!(this.body instanceof Readable)) {
            this.body = new Readable();
            this.body.push(options.body);
            this.body.push(null);
        }
        // this.bodyUsed = options.bodyUsed;
        // this.cache = options.cache;
        this.credentials = options.credentials ?? "same-origin"; //omit, same-origin, or include
        // this.destination = options.destination;
        options.headers = {
            // default headers
            // GET /home.html HTTP/1.1
            Host: this.input.host,
            // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0',
            // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            Accept: "*/*",
            // 'Accept-Language': 'en-US,en;q=0.5',
            "Accept-Language": "*",
            // 'Accept-Encoding': 'gzip, deflate, br',
            // 'Referer': 'https://developer.mozilla.org/testpage.html',
            // 'Connection': 'keep-alive',
            // 'Upgrade-Insecure-Requests': '1',
            // 'If-Modified-Since': 'Mon, 18 Jul 2016 02:36:04 GMT',
            // 'If-None-Match': '"c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"',
            // 'Cache-Control': 'max-age=0',
            ...options.headers,
        };
        this.headers = new Headers(options.headers);
        // this.integrity = options.integrity;
        this.method = options.method || "GET";
        // this.mode = options.mode;
        // this.priority = options.priority;
        this.redirect = options.redirect ?? "follow"; //follow, error, or manual
        // this.referrer = options.referrer;
        // this.referrerPolicy = options.referrerPolicy;
        this.url = "" + this.input;

        // nodejs req
        this.agent = options.agent;
        this.hostname = options.hostname ?? this.input.hostname;
        this.insecureHTTPParser = options.insecureHTTPParser ?? true;
        this.path = options.path ?? this.input.path;
        this.port = options.port ?? this.input.port;
        this.protocol = options.protocol ?? this.input.protocol;
        this.timeout = options.timeout ?? 1000 * 60 * 60;
        this.compression = options.compression;
        if (this.compression||this.headers.has('accept-encoding')) {
            this.headers.set("Accept-Encoding", "gzip, deflate, br");
        } else {
            this.headers.set("Accept-Encoding", "*");
        }

        this.storage = StorageManager.storage(this.hostname, options);
        if (this.credentials !== "omit" && this.storage.cookie) {
            this.headers.set("cookie", this.storage.cookie);
        }

    }
    // arrayBuffer() {}
    // blob() {}
    // clone() {}
    // formData() {}
    // json() {}
    // text() {}
}

// @test
// console.log(new Request())
// console.log(new Request(new Request()))

/**
 *
 */
class Response {
    /**
     * @property {Promise/Response} body
     */
    /**
     * @property {Object/Headers} headers
     */
    /**
     * @property {Number} status
     */

    /**
     *
     * @param {String/Readable} body
     * @param {Object} options
     * @returns {Promise/Response}
     */
    constructor(body = "", options = {}) {
        this.body = body;
        if (!(this.body instanceof Readable)) {
            this.body = new Readable();
            body = Buffer.from(body);
            this.body.push(body);
            this.body.push(null);
        }
        // this.bodyUsed = options.bodyUsed;
        this.headers = new Headers(options.headers);
        // this.ok = options.ok;
        // this.redirected = options.redirected;
        this.status = options.status || options.statusCode;
        // this.statusText = options.statusText;
        // this.type = options.type;
        // this.url = options.url;

        if (options.request?.storage?.cookie&&this.headers.has("set-cookie")) {
            options.request.storage.cookie = this.headers.get("set-cookie");
        }

        // redirect
        if (options.request?.redirect == "follow" && this.headers.has("location")) {
            let url = new URL2(this.headers.get("location"), options.request?.input?.origin);
            return this.redirect(url);
        }
    }

    /**
     * @private
     * @returns {Promise}
     */
    read() {
        return new Promise((resolve, reject) => {
            let buffer = [];

            // compression
            let encoding = this.headers.get("content-encoding");
            if (encoding == "gzip") {
                this.body = this.body.pipe(zlib.createGunzip());
            } else if (encoding == "deflate") {
                this.body = this.body.pipe(zlib.createInflate());
            } else if (encoding == "br") {
                this.body = this.body.pipe(zlib.createBrotliDecompress());
            }

            this.body.on("error", reject);
            this.body.on("data", (chunk) => {
                buffer.push(chunk);
            });
            this.body.on("end", () => {
                resolve(Buffer.concat(buffer));
            });
        });
    }

    /**
     *
     * @returns {Promise/arrayBuffer}
     */
    arrayBuffer() {
        return this.read().then((buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }

    /**
     *
     * @returns {Promise/blob}
     */
    blob() {
        return this.read().then((buffer) => new Blob([buffer]));
    }
    // clone() {}
    // error() {}
    // formData() {}

    /**
     *
     * @returns {Promise/json}
     */
    json() {
        return this.read().then((buffer) => JSON.parse(buffer));
    }

    /**
     *
     * @returns {Promise/Response}
     */
    redirect(url, status) {
        return fetch(url);
    }

    /**
     *
     * @returns {Promise/text/String}
     */
    text() {
        return this.read().then((buffer) => "" + buffer);
    }
}

// @test
// console.log(new Response())
// console.log(new Response(new Response().body))

/**
 *
 * @param {String/Request} resource
 * @param {Object} options
 * @returns {Promise/Response}
 */
function fetch(resource = "", options = {}) {
    return new Promise((resolve, reject) => {
        const request = new Request(resource, options);
        const protocol = request.protocol == "https:" ? https : http;
        const req = protocol.request(request);
        req.on("error", reject);
        req.on("response", (res) => {
            res.request=request
            const response = new Response(res, res);
            resolve(response);
        });
        request.body.pipe(req);
    });
}

fetch.URLSearchParams2=URLSearchParams2
fetch.URL2=URL2
fetch.Headers=Headers
fetch.Request=Request
fetch.Response=Response

module.exports=fetch

// @test

// request
// fetch('http://jsonplaceholder.typicode.com/posts')
// .then(console.log)

// request output json
// fetch('http://jsonplaceholder.typicode.com/posts')
// .then(res=>res.json())
// .then(console.log)
// .catch(console.log)

// request with compression
// fetch('http://jsonplaceholder.typicode.com/posts',{
//     headers:{
//         'accept-encoding':'gzip, deflate, br'
//     }
// })
// .then(res=>res.json())
// .then(console.log)
// .catch(console.log)

// request with redirect
// fetch('http://jsonplaceholder.typicode.com/guide')
// .then(res=>res.text())
// .then(console.log)
// .catch(console.log)

// request credentials!=='omit', handle cookie/set-cookie
// fetch("https://mitra.tokopedia.com/")
// .then((res) => res.text())
// .then(console.log)
// .catch(console.log);
