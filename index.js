const http = require("http");
const https = require("https");
const zlib = require("zlib");
const { Readable } = require("stream");
const { Blob } = require("buffer");
const StorageManager = require("@ndiing/storage");

/**
 * ### Install
 * ```
 * npm install @ndiing/fetch
 * ```
 * ### Usage
 * ```js
 * // json
 * fetch("https://jsonplaceholder.typicode.com/posts")
 * .then(res=>res.json())
 * .then(console.log)
 *
 * // text
 * fetch("https://jsonplaceholder.typicode.com")
 * .then(res=>res.text())
 * .then(console.log)
 *
 * // End-to-end compression
 * fetch("https://jsonplaceholder.typicode.com/posts",{
 *     headers:{
 *         'Accept-Encoding': 'gzip, deflate, br',
 *     }
 * })
 * .then(res=>res.json())
 * .then(console.log)
 *
 * // Redirections in HTTP
 * fetch("https://jsonplaceholder.typicode.com/guide",{
 *     redirect:'manual',//follow
 * })
 * .then(res=>res.text())
 * .then(console.log)
 *
 * // Request.credentials
 * fetch("https://mitra.tokopedia.com/")
 * .then(res=>res.text())
 * .then(console.log)
 * ```
 * @module fetch
 */

/**
 * ### Examples
 *
 * ```js
 * // Parse full URL
 * var searchParams=new URLSearchParams2('https://www.google.com/search?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
 * console.log(searchParams)
 *
 * // Parse with /path
 * var searchParams=new URLSearchParams2('/search?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
 * console.log(searchParams)
 *
 * // Parse URL.search
 * var searchParams=new URLSearchParams2('?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
 * console.log(searchParams)
 *
 * // Parse query
 * var searchParams=new URLSearchParams2('q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
 * console.log(searchParams)
 *
 * // Output are the same
 * // URLSearchParams2 will remove before/prefix `?` and after `#`
 * // URLSearchParams2 {
 * //     q: 'URLSearchParams',
 * //     oq: 'URLSearchParams',
 * //     aqs: 'chrome.0.69i59j0i512l4j69i60l3.24886j0j7',
 * //     sourceid: 'chrome',
 * //     ie: 'UTF-8'
 * // }
 * ```
 */
class URLSearchParams2 {
    /**
     *
     * @param {String} init
     */
    constructor(init = "") {
        init = ("" + init)
            .replace(/[^\?]+\?/, "")
            .replace(/^\?/, "")
            .replace(/#[^#]+/, "")
            .matchAll(/([^\=&]+?)\=([^\=&]+?)?(&|$)/g);
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
     * @param {String} callback
     */
    forEach(callback) {
        for (const name of this.keys()) {
            callback(this.getAll(name), name);
        }
    }

    /**
     *
     * @param {String} name
     * @returns {String}
     */
    get(name) {
        return Array.isArray(this[name]) ? this[name][this[name].length - 1] : this[name];
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
    sort() {}

    /**
     *
     * @returns {String}
     */
    toString() {
        const values = [];
        for (const name of this.keys()) {
            values.push([name, this.getAll(name)].join("="));
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
            values.push(this.get(name));
        }
        return values;
    }
}

// // @test

// // Parse full URL
// var searchParams=new URLSearchParams2('https://www.google.com/search?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
// console.log(searchParams)

// // Parse with /path
// var searchParams=new URLSearchParams2('/search?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
// console.log(searchParams)

// // Parse URL.search
// var searchParams=new URLSearchParams2('?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
// console.log(searchParams)

// // Parse query
// var searchParams=new URLSearchParams2('q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')
// console.log(searchParams)

// // Output are the same
// // URLSearchParams2 will remove before/prefix `?` and after `#`
// // URLSearchParams2 {
// //     q: 'URLSearchParams',
// //     oq: 'URLSearchParams',
// //     aqs: 'chrome.0.69i59j0i512l4j69i60l3.24886j0j7',
// //     sourceid: 'chrome',
// //     ie: 'UTF-8'
// // }

/**
 * ### Examples
 *
 * ```js
 * // Parse url with port
 * var url = new URL2('https://www.google.com:3000/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')
 * console.log(url)
 *
 * // Parse url
 * var url = new URL2('https://www.google.com/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')
 * console.log(url)
 *
 * // Parse url without origin
 * var url = new URL2('/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')
 * console.log(url)
 * // Output will fallback to http://localhost
 * // URL2 {
 * //     href: 'http://localhost/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',
 * //     protocol: 'http:',
 * //     scheme: 'http',
 * //     authority: '//localhost',
 * //     origin: 'http://localhost',
 * //     host: 'localhost',
 * //     hostname: 'localhost',
 * //     port: 80,
 * //     pathname: '/search',
 * //     search: '?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',
 * //     query: 'q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',
 * //     searchParams: URLSearchParams2 {
 * //         q: 'url',
 * //         oq: 'URL',
 * //         aqs: 'chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9',
 * //         sourceid: 'chrome',
 * //         ie: 'UTF-8'
 * //     },
 * //     hash: '',
 * //     fragment: '',
 * //     path: '/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8'
 * // }
 * ```
 * @property {string} href=http://localhost
 * @property {string} protocol=http:
 * @property {string} scheme=http
 * @property {string} authority=//localhost
 * @property {string} origin=http://localhost
 * @property {string} host=localhost
 * @property {string} hostname=localhost
 * @property {number} port=80
 * @property {string} pathname=/
 * @property {string} search
 * @property {string} query
 * @property {object} searchParams
 * @property {string} hash
 * @property {string} fragment
 * @property {string} path=/
 */
class URL2 {
    constructor(url = "", base = "http://localhost") {
        // https://www.rfc-editor.org/rfc/rfc3986#appendix-B
        if (!/^(([^:/?#]+):)(\/\/([^/?#]*))/.test(url)) {
            url = base + url;
        }

        const regexp = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
        const [href, protocol, scheme, authority, host = "", pathname = "", search = "", query = "", hash = "", fragment = ""] = ("" + url).match(regexp);
        const [hostname, port] = ("" + host).split(":");

        this.href = href;
        this.protocol = protocol;
        this.scheme = scheme;
        this.authority = authority;
        this.origin = this.protocol + this.authority;
        this.host = host;
        this.hostname = hostname;
        this.port = parseInt(port || (protocol == "https:" ? 443 : 80));
        this.pathname = pathname || "/";
        this.search = search;
        this.query = query;
        this.searchParams = new URLSearchParams2(this.query);
        this.hash = hash;
        this.fragment = fragment;
        this.path = this.pathname + this.search + this.hash;
    }

    // static createObjectURL() {}

    // static revokeObjectURL() {}

    // toJSON() {}

    /**
     *
     * @returns {String}
     */
    toString() {
        return this.href;
    }
}

// // @test

// // Parse url with port
// var url = new URL2('https://www.google.com:3000/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')
// console.log(url)

// // Parse url
// var url = new URL2('https://www.google.com/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')
// console.log(url)

// // Parse url without origin
// var url = new URL2('/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')
// console.log(url)
// // Output will fallback to http://localhost
// // URL2 {
// //     href: 'http://localhost/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',
// //     protocol: 'http:',
// //     scheme: 'http',
// //     authority: '//localhost',
// //     origin: 'http://localhost',
// //     host: 'localhost',
// //     hostname: 'localhost',
// //     port: 80,
// //     pathname: '/search',
// //     search: '?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',
// //     query: 'q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',
// //     searchParams: URLSearchParams2 {
// //         q: 'url',
// //         oq: 'URL',
// //         aqs: 'chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9',
// //         sourceid: 'chrome',
// //         ie: 'UTF-8'
// //     },
// //     hash: '',
// //     fragment: '',
// //     path: '/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8'
// // }

/**
 * Headers
 */
class Headers {
    /**
     * The `Headers()` constructor creates a new `Headers` object.
     * @param {object} init - An object containing any HTTP headers that you want to pre-populate your Headers object with. This can be a simple object literal with String values, an array of name-value pairs, where each pair is a 2-element string array; or an existing Headers object. In the last case, the new Headers object copies its data from the existing Headers object.
     */
    constructor(init = {}) {
        if (Array.isArray(init)) {
            for (const [name, value] of init) {
                this.append(name, value);
            }
        } else {
            for (const name in init) {
                this.append(name, init[name]);
            }
        }
    }

    /**
     * The `append()` method of the `Headers` interface appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
     * @param {String} name - The name of the HTTP header you want to add to the `Headers` object.
     * @param {String} value - The value of the HTTP header you want to add.
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
     * The `delete()` method of the `Headers` interface deletes a header from the current `Headers` object.
     * @param {String} name
     */
    delete(name) {
        name = name.toLowerCase();
        delete this[name];
    }

    /**
     * The `Headers.entries()` method returns an `array` allowing to go through all key/value pairs contained in this object. The both the key and value of each pairs are `String` objects.
     * @returns {Array}
     */
    entries() {
        const values = [];
        for (const name of this.keys()) {
            values.push([
                //
                name.replace(/(^|-)(\w)/g,($,$1,$2)=>$1+$2.toUpperCase()),
                this.get(name),
            ]);
        }
        return values;
    }

    /**
     * The `get()` method of the `Headers` interface returns a byte string of all the values of a header within a `Headers` object with a given name. If the requested header doesn't exist in the `Headers` object, it returns null.
     * @param {String} name - The name of the HTTP header whose values you want to retrieve from the Headers object. If the given name is not the name of an HTTP header, this method throws a TypeError. The name is case-insensitive.
     * @returns {String/Array}
     */
    get(name) {
        name = name.toLowerCase();
        return this[name]||null;
    }

    /**
     * The `has()` method of the `Headers` interface returns a boolean stating whether a `Headers` object contains a certain header.
     * @param {String} name
     * @returns {Boolean}
     */
    has(name) {
        name = name.toLowerCase();
        return !!this[name];
    }

    /**
     * The `Headers.keys()` method returns an `array` allowing to go through all keys contained in this object. The keys are `String` objects.
     * @returns {Array}
     */
    keys() {
        return Object.getOwnPropertyNames(this);
    }

    /**
     * The `set()` method of the `Headers` interface sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
     * @param {String} name - The name of the HTTP header you want to set to a new value. If the given name is not the name of an HTTP header, this method throws a TypeError.
     * @param {String} value - The new value you want to set.
     */
    set(name, value) {
        name = name.toLowerCase();
        this[name] = value;
    }

    /**
     * The `Headers.values()` method returns an `array` allowing to go through all values contained in this object. The values are `String` objects.
     * @returns {Array}
     */
    values() {
        const values = [];
        for (const name of this.keys()) {
            values.push(this.get(name));
        }
        return values;
    }

    /**
     *
     * @returns {String}
     */
    toString() {
        let values = "";
        for (const name of this.keys()) {
            values += `${name}: ${this.get(name)}\r\n`;
        }
        return values;
    }
}

// // @test
// const httpHeaders = { 'Content-Type' : 'image/jpeg', 'X-My-Custom-Header' : 'Zeke are cool' };
// const myHeaders = new Headers(httpHeaders);
// console.log(myHeaders)

// const secondHeadersObj = new Headers(myHeaders);
// secondHeadersObj.get('Content-Type'); // Would return 'image/jpeg' — it inherits it from the first headers object

// const headers = [
//     ["Set-Cookie", "greeting=hello"],
//     ["Set-Cookie", "name=world"],
// ];
// const myHeaders = new Headers(headers);
// console.log(myHeaders);

// const headers = new Headers({
//     Host: "${this.input.host}",
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
//     Accept: "*/*",
//     "Accept-Language": "*",
//     "Accept-Encoding": "*",
//     "Cache-Control": "max-age=0",
// });
// console.log(''+headers)

/**
 * The `Request` interface of the `Fetch API` represents a resource request.
 *
 * options.headers
 * ```http
 * host: ${this.input.host}
 * user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36
 * accept: *\/*
 * accept-language: *
 * accept-encoding: *
 * cache-control: max-age=0
 * ```
 * @property {String} input - <p>Defines the resource that you wish to fetch. This can either be:</p><ul><li>A string containing the direct URL of the resource you want to fetch.</li><li>A Request object, effectively creating a copy. Note the following behavioral updates to retain security while making the constructor less likely to throw exceptions:</ul><ul><li>If this object exists on another origin to the constructor call, the Request.referrer is stripped out.</li><li>If this object has a Request.mode of navigate, the mode value is converted to same-origin.</li></ul></li>
 * @property {Object} options
 * @property {String} options.body
 * @property {String} options.bodyUsed
 * @property {String} options.cache - default, reload, no-cache
 * @property {String} options.credentials=same-origin - omit, same-origin, include
 * @property {String} options.destination
 * @property {String} options.headers
 * @property {String} options.integrity
 * @property {String} options.method=GET
 * @property {String} options.mode=cors - cors, no-cors, same-origin, navigate
 * @property {String} options.priority
 * @property {String} options.redirect=follow - follow, error, or manual
 * @property {String} options.referrer
 * @property {String} options.referrerPolicy
 * @property {String} options.url
 * @property {String} options.agent
 * @property {String} options.hostname
 * @property {String} options.insecureHTTPParser=true
 * @property {String} options.path
 * @property {String} options.port
 * @property {String} options.protocol
 * @property {String} options.timeout
 */
class Request {
    constructor(input = "", options = {}) {
        // input=url
        // input=Request
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
        if (!(options.body instanceof Readable)) {
            this.body = new Readable();
            this.body.push(options.body);
            this.body.push(null);
        }

        this.bodyUsed = options.bodyUsed;
        this.cache = options.cache; //default, reload, no-cache
        this.credentials = options.credentials || "same-origin"; //omit, same-origin, include
        this.destination = options.destination;

        options.headers = {
            Host: this.input.host,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            Accept: "*/*",
            // 'Accept-Language': 'en-US,en;q=0.5',
            "Accept-Language": "*",
            // 'Accept-Encoding': 'gzip, deflate, br',
            "Accept-Encoding": "*",
            // 'Referer': 'https://developer.mozilla.org/testpage.html',
            // 'Connection': 'keep-alive',
            // 'Upgrade-Insecure-Requests': '1',
            // 'If-Modified-Since': 'Mon, 18 Jul 2016 02:36:04 GMT',
            // 'If-None-Match': '"c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"',
            "Cache-Control": "max-age=0",
            ...options.headers,
        };
        this.headers = new Headers(options.headers);

        this.integrity = options.integrity;
        this.method = options.method || "GET";
        this.mode = options.mode || "cors"; //cors, no-cors, same-origin, navigate
        this.priority = options.priority; //high, low, auto
        this.redirect = options.redirect ?? "follow"; //follow, error, or manual
        this.referrer = options.referrer || "about:client";
        this.referrerPolicy = options.referrerPolicy;
        this.url = options.url || this.input.href;

        this.agent = options.agent;
        this.hostname = options.hostname || this.input.hostname;
        this.insecureHTTPParser = options.insecureHTTPParser ?? true;
        this.path = options.path || this.input.path;
        this.port = options.port || this.input.port;
        this.protocol = options.protocol || this.input.protocol;
        this.timeout = options.timeout || 1000 * 60 * 60;
    }

    // arrayBuffer() {}

    // blob() {}

    // clone() {}

    // formData() {}

    // json() {}

    // text() {}
}

// // @test
// const oldRequest = new Request("https://github.com/mdn/content/issues/12959", { headers: { From: "webmaster@example.org" } });
// oldRequest.headers.get("From"); // "webmaster@example.org"
// console.log(oldRequest);
// const newRequest = new Request(oldRequest, { headers: { From: "developer@example.org" } });
// newRequest.headers.get("From"); // "developer@example.org"
// console.log(newRequest);

// const request = new Request("/myEndpoint", {
//     method: "POST",
//     body: "Hello world",
// });

// request.body; // ReadableStream
// console.log(request);

/**
 * Response
 * @property {String} body
 * @property {String} bodyUsed
 * @property {String} headers
 * @property {String} redirected
 * @property {String} status
 * @property {String} statusText
 * @property {String} ok
 * @property {String} type
 * @property {String} url
 */
class Response {
    constructor(body, options = {}) {
        this.bodyUsed = options.bodyUsed;
        this.headers = new Headers(options.headers);
        this.redirected = options.redirected;
        this.status = options.status || 200;
        this.statusText = options.statusText || http.STATUS_CODES[this.status];
        this.ok = options.ok || (this.status >= 200 && this.status < 300);
        this.type = options.type || "cors";
        this.url = options.url || options.request?.url;

        // options{request{input}}
        if (body instanceof Blob) {
            body = Buffer.from([body]);
        }
        this.body = body;
        if (!(body instanceof Readable)) {
            this.body = new Readable();
            this.body.push(body);
            this.body.push(null);
        }

        // DecompressionStream(format)
        if (this.headers.get("Content-Encoding") == "gzip") {
            this.body = this.body.pipe(zlib.createGunzip());
        } else if (this.headers.get("Content-Encoding") == "deflate") {
            this.body = this.body.pipe(zlib.createInflate());
        } else if (this.headers.get("Content-Encoding") == "br") {
            this.body = this.body.pipe(zlib.createBrotliDecompress());
        }

        // Location: /index.html
        if (options.request?.redirect == "follow" && this.headers.has("Location")) {
            const url = new URL2(this.headers.get("Location"), options.request?.input?.origin);
            return this.redirect(url);
        }
    }

    read() {
        return new Promise((resolve, reject) => {
            const buffer = [];
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
     * @returns {arrayBuffer}
     */
    arrayBuffer() {
        return this.read().then((buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }

    /**
     *
     * @returns {blob}
     */
    blob() {
        return this.read().then((buffer) => new Blob(buffer));
    }

    // clone() {}

    // error() {}

    // formData() {}

    /**
     *
     * @returns {json}
     */
    json() {
        return this.read().then((buffer) => JSON.parse(buffer));
    }

    /**
     *
     * @param {*} url
     * @param {*} status
     * @returns {Response}
     */
    redirect(url, status) {
        return fetch(url);
    }

    /**
     *
     * @returns {text}
     */
    text() {
        return this.read().then((buffer) => "" + buffer);
    }
}

// // @test
// const myBlob = new Blob();
// const myOptions = { status: 200, statusText: 'SuperSmashingGreat!' };
// const myResponse = new Response(myBlob, myOptions);
// console.log(myResponse)

// const myString = '';
// const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
// const myResponse = new Response(myString, myOptions);
// console.log(myResponse);

/**
 *
 * @param {String} resource
 * @param {Object} options
 * @returns {Promise}
 */
function fetch(resource = "", options = {}) {
    return new Promise((resolve, reject) => {
        const request = new Request(resource, options);
        const storage = StorageManager.storage(request.hostname);

        // console.log(storage.cookie)
        if (request.credentials !== "omit" && storage.cookie) {
            request.headers.set("Cookie", storage.cookie);
        }

        const protocol = request.protocol == "https:" ? https : http;
        const req = protocol.request(request);
        req.on("error", reject);
        req.on("response", (res) => {
            const response = new Response(res, {
                headers: res.headers,
                status: res.statusCode,
                request,
            });

            if (response.headers.has("Set-Cookie")) {
                storage.cookie = response.headers.get("Set-Cookie");
            }

            resolve(response);
        });
        request.body.pipe(req);
    });
}

// // @test

// // json
// fetch("https://jsonplaceholder.typicode.com/posts")
// .then(res=>res.json())
// .then(console.log)

// // text
// fetch("https://jsonplaceholder.typicode.com")
// .then(res=>res.text())
// .then(console.log)

// // End-to-end compression
// fetch("https://jsonplaceholder.typicode.com/posts",{
//     headers:{
//         'Accept-Encoding': 'gzip, deflate, br',
//     }
// })
// .then(res=>res.json())
// .then(console.log)

// // Redirections in HTTP
// fetch("https://jsonplaceholder.typicode.com/guide",{
//     redirect:'manual',//follow
// })
// .then(res=>res.text())
// .then(console.log)

// // Request.credentials
// fetch("https://mitra.tokopedia.com/");
// .then(res=>res.text())
// .then(console.log)

fetch.URLSearchParams2 = URLSearchParams2;
fetch.URL2 = URL2;
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;

module.exports = fetch;
