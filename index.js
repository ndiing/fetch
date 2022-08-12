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
 * @module fetch
 */

/**
 *
 */
class URLSearchParams2 {
    /**
     * URLSearchParams!=URLSearchParams2
     * URLSearchParams > Iterator
     * URLSearchParams2 > Object
     * @param {String} init
     */
    constructor(init = "") {
        init = ("" + init)
            .replace(/[^\?]+\?/, "")
            .replace(/#[^#]+/, "")
            .replace(/^\?/, "")
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
        const keys = this.keys();
        const values = [];
        for (const name of keys) {
            values.push([name, this[name]]);
        }

        return values;
    }

    /**
     *
     * @param {Function} callback
     */
    forEach(callback) {
        const keys = this.keys();
        for (const name of keys) {
            callback(this[name], name);
        }
    }

    /**
     *
     * @param {String} name
     * @returns {String}
     */
    get(name) {
        if (Array.isArray(this[name])) {
            return this[name][this[name].length - 1];
        }

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
        // URLSearchParams > Retrieve All Keys
        // URLSearchParams2 > Retrieve Last Keys
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
        // URLSearchParams > name=1&name=2&name=3&group=b
        // URLSearchParams2 > name=1,2,3&group=b
        const keys = this.keys();
        const values = [];
        for (const name of keys) {
            values.push([name, this[name]].join("="));
        }

        return values.join("&");
    }

    /**
     *
     * @returns {Array}
     */
    values() {
        const keys = this.keys();
        const values = [];
        for (const name of keys) {
            // URLSearchParams > Retrieve All Value
            // URLSearchParams2 > Retrieve Last Value
            const value = Array.isArray(this[name]) ? this[name][this[name].length - 1] : this[name];
            values.push(value);
        }

        return values;
    }
}

// console.log(new URLSearchParams("?name=1&name=2&name=3&group=b").entries());
// console.log(new URLSearchParams2("?name=1&name=2&name=3&group=b").entries());
// console.log(new URLSearchParams2("?q=&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));
// console.log(new URLSearchParams2("?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));
// console.log(new URLSearchParams2("q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));
// console.log(new URLSearchParams2("https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));
// console.log(new URLSearchParams2("https://www.google.com:8888/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));
// console.log(new URLSearchParams2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));
// console.log(new URLSearchParams2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8#content"));

/**
 *
 */
class URL2 {
    /**
     * URL!=URL2
     * URL > Absolute
     * URL2 > Relative
     * @param {String} url
     * @param {String} base
     */
    constructor(url = "", base = "") {
        // https://www.rfc-editor.org/rfc/rfc3986#appendix-B
        const absolute = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
        const hier = /^(([^:/?#]+):)(\/\/([^/?#]*))/;
        if (!hier.test(url)) {
            base = base || "http://localhost";
            url = base + url;
        }

        // prettier-ignore
        const [
            href,// 'https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8',
            protocol,// 'https:',
            scheme,// 'https',
            authority,// '//www.google.com',
            host,// 'www.google.com',
            pathname,// '/search',
            search='',// '?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8',
            query='',// 'q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8',
            hash='',
            fragment='',
        ] = ("" + url).match(absolute);
        // prettier-ignore
        let [
            ,
            hostname,
            ,
            port=protocol=='https:'?443:80,
        ] = host.match(/([^\:]+)(\:([^\:]+))?$/);
        port = parseInt(port);

        /**
         * @type {String}
         */
        this.href = href;

        /**
         * @type {String}
         */
        this.protocol = protocol;

        /**
         * @type {String}
         */
        this.scheme = scheme; //URL2

        /**
         * @type {String}
         */
        this.authority = authority; //URL2

        /**
         * @type {String}
         */
        this.origin = this.protocol + this.authority;

        /**
         * @type {String}
         */
        this.host = host;

        /**
         * @type {String}
         */
        this.hostname = hostname; //URL2

        /**
         * @type {Number}
         */
        this.port = port; //URL2 > Number

        /**
         * @type {String}
         */
        this.pathname = pathname || "/";

        /**
         * @type {String}
         */
        this.search = search;

        /**
         * @type {Object}
         */
        this.searchParams = new URLSearchParams2(this.search);

        /**
         * @type {String}
         */
        this.query = query; //URL2

        /**
         * @type {String}
         */
        this.hash = hash;

        /**
         * @type {String}
         */
        this.fragment = fragment; //URL2

        /**
         * @type {String}
         */
        this.path = this.pathname + this.search + this.hash; //URL2
    }
}

// console.log(new URL2("https://www.google.com/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8"));
// console.log(new URL2("https://www.google.com:8888/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8"));
// console.log(new URL2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8", "https://www.google.com"));
// console.log(new URL2("/search?q=new+url&oq=new+URL&aqs=chrome.0.69i59j0i512l9.2009j0j7&sourceid=chrome&ie=UTF-8", ""));

/**
 *
 */
class Headers {
    /**
     *
     * @param {Object} init
     */
    constructor(init = {}) {
        for (const name in init) {
            this.append(name, init[name]);
        }
    }

    /**
     *
     * @param {String} name
     * @param {String} value
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
        const keys = this.keys();
        const values = [];
        for (const name of keys) {
            let key=name
            key=key.replace(/(^|-)(\w)/g,($,$1,$2)=>$1+$2.toUpperCase())
            values.push([key, this[name]]);
        }

        return values;
    }

    /**
     *
     * @param {String} name
     * @returns {String}
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
        const keys = this.keys();
        const values = [];
        for (const name of keys) {
            values.push(this[name]);
        }

        return values;
    }
}

/**
 *
 */
class Request {
    constructor(input, options = {}) {
        if (input instanceof Request) {
            input = input.url;
            options = {
                ...input,
                ...options,
            };
        }
        input = new URL2(input);
        // this.body = options.body;

        // this.bodyUsed = options.bodyUsed;
        // this.cache = options.cache; //default, no-store, reload, no-cache, force-cache, and only-if-cached

        /**
         * @type {String}
         */
        this.credentials = options.credentials || "same-origin"; //omit, same-origin, include

        if (this.credentials !== "omit") {
            this.storage = StorageManager.storage(input.hostname);

            if (this.storage.cookie) {
                options.headers = {
                    Cookie: this.storage.cookie,
                    ...options.headers,
                };
            }
        }

        // this.destination = options.destination;

        // Default headers
        options.headers = {
            Host: input.host,
            ...options.headers
        }

        /**
         * @type {Object}
         */
        this.headers = new Headers(options.headers);
        // this.integrity = options.integrity;

        /**
         * @type {String}
         */
        this.method = options.method || "GET";
        // this.mode = options.mode || "cors"; //cors, no-cors, or same-origin
        // this.priority = options.priority;

        /**
         * @type {String}
         */
        this.redirect = options.redirect || "follow";
        // this.referrer = options.referrer;
        // this.referrerPolicy = options.referrerPolicy; //no-referrer, no-referrer-when-downgrade, same-origin, origin, strict-origin, origin-when-cross-origin, strict-origin-when-cross-origin, or unsafe-url

        /**
         * @type {String}
         */
        this.url = options.url || input.href;

        /**
         * @type {Undefined}
         */
        this.keepalive = options.keepalive;
        if (this.keepalive) {
            this.headers.set("Connection", "keep-alive");
        }

        // this.signal = options.signal;

        /**
         * @type {Undefined}
         */
        this.agent = options.agent;

        /**
         * @type {String}
         */
        this.hostname = options.hostname || input.hostname;

        /**
         * @type {Boolean}
         */
        this.insecureHTTPParser = options.insecureHTTPParser || true;

        /**
         * @type {String}
         */
        this.path = options.path || input.path;

        /**
         * @type {Number}
         */
        this.port = options.port || input.port;

        /**
         * @type {String}
         */
        this.protocol = options.protocol || input.protocol;

        /**
         * @type {Undefined}
         */
        this.timeout = options.timeout;

        let readable = options.body;
        if (!(readable instanceof Readable)) {
            readable = new Readable();
            readable.push(options.body);
            readable.push(null);
        }

        /**
         * @type {Object}
         */
        this.body = readable;
    }

    // arrayBuffer() {}

    // blob() {}

    // clone() {}

    // formData() {}

    // json() {}

    // text() {}
}

/**
 *
 */
class Response {
    constructor(body, options = {}) {
        // this.body = body;

        /**
         * @type {Undefined}
         */
        this.bodyUsed = options.bodyUsed;

        /**
         * @type {Object}
         */
        this.headers = new Headers(options.headers);

        // Set-Cookie:
        if (options.request.storage && this.headers.has("set-cookie")) {
            options.request.storage.cookie = this.headers.get("set-cookie");
        }

        /**
         * @type {Undefined}
         */
        this.redirected = options.redirected;

        /**
         * @type {Number}
         */
        this.status = options.status || 200;

        /**
         * @type {String}
         */
        this.statusText = options.statusText || http.STATUS_CODES[this.status];

        /**
         * @type {Boolean}
         */
        this.ok = this.status >= 200 && this.status < 300;

        /**
         * @type {String}
         */
        this.type = options.type || "basic";

        /**
         * @type {Undefined}
         */
        this.url = options.request?.url;

        let readable = body;
        const encoding = this.headers.get("content-encoding");

        if (!(body instanceof Readable)) {
            readable = new Readable();
            readable.push(body);
            readable.push(null);

            body = readable;

            if (encoding == "gzip") {
                readable = body.pipe(zlib.createGzip());
            } else if (encoding == "deflate") {
                readable = body.pipe(zlib.createDeflate());
            } else if (encoding == "br") {
                readable = body.pipe(zlib.createBrotliCompress());
            }

            body = readable;
        }

        if (encoding == "gzip") {
            readable = body.pipe(zlib.createGunzip());
        } else if (encoding == "deflate") {
            readable = body.pipe(zlib.createInflate());
        } else if (encoding == "br") {
            readable = body.pipe(zlib.createBrotliDecompress());
        }

        /**
         * @type {Object}
         */
        this.body = readable;

        if (options.request?.redirect == "follow" && this.headers.has("location")) {
            this.redirected = this.headers.get("location");
            return this.redirect(this.redirected);
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
                this.bodyUsed = true;
                resolve(Buffer.concat(buffer));
            });
        });
    }

    /**
     *
     * @returns {ArrayBuffer}
     */
    arrayBuffer() {
        return this.read().then((buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }

    /**
     *
     * @returns {Blob}
     */
    blob() {
        return this.read().then((buffer) => new Blob(buffer));
    }

    // clone() {}

    // error() {}

    // formData() {}

    /**
     *
     * @returns {Object}
     */
    json() {
        return this.read().then((buffer) => JSON.parse(buffer));
    }

    /**
     *
     * @param {String} url
     * @param {Number} status
     * @returns {Stream}
     */
    redirect(url, status) {
        return fetch(url);
    }

    /**
     *
     * @returns {String}
     */
    text() {
        return this.read().then((buffer) => buffer.toString());
    }
}

/**
 *
 * @param {String/Request} resource
 * @param {Object} options
 * @returns {Promise}
 */
function fetch(resource, options = {}) {
    return new Promise((resolve, reject) => {
        let request = resource;
        if (!(request instanceof Request)) {
            request = new Request(request, options);
        }

        const protocol = request.protocol == "https:" ? https : http;
        const req = protocol.request(request);
        req.on("error", reject);
        req.on("response", (res) => {
            const response = new Response(res, {
                status: res.statusCode,
                headers: res.headers,
                request,
            });

            resolve(response);
        });

        request.body.pipe(req);
    });
}

fetch.URLSearchParams2 = URLSearchParams2;
fetch.URL2 = URL2;
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;
module.exports = fetch;
