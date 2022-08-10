const http = require("http");
const https = require("https");
const zlib = require("zlib");
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
            values.push([name, this[name]]);
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
    /**
     *
     * @param {String} input
     * @param {Object} options
     */
    constructor(input, options = {}) {
        input = new URL2(input);

        /**
         * @type {Object}
         */
        this.headers = new Headers({
            Host: input.host,
            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36`,
            Accept: `*/*`,
            "Accept-Language": `*`,
            "Accept-Encoding": `*`,
            // "Accept-Encoding": `gzip, deflate, br`,
            // 'Referer': `https://developer.mozilla.org/testpage.html`,
            // 'Connection': `keep-alive`,
            // 'Upgrade-Insecure-Requests': `1`,
            // 'If-Modified-Since': `Mon, 18 Jul 2016 02:36:04 GMT`,
            // 'If-None-Match': `"c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"`,
            // 'Cache-Control': `max-age=0`,
            ...options.headers,
        });
        // this.body;
        // this.bodyUsed;
        // this.cache; // default, no-store, reload, no-cache, force-cache, and only-if-cached,

        /**
         * @type {String}
         */
        this.credentials = options.credentials || "include"; // omit, same-origin, include
        // this.destination;
        // this.integrity;

        /**
         * @type {String}
         */
        this.method = options.method || "GET";
        // this.mode;
        // this.priority;

        /**
         * @type {String}
         */
        this.redirect = options.redirect || "follow"; // follow, error, manual
        // this.referrer;
        // this.referrerPolicy;

        /**
         * @type {String}
         */
        this.url = options.url || input.href;

        /**
         * @type {Boolean}
         */
        this.keepalive = options.keepalive;
        if (this.keepalive) {
            this.headers.set("Connection", "keep-alive");
        }

        /**
         * @type {String}
         */
        this.protocol = options.protocol || input.protocol;

        /**
         * @type {String}
         */
        this.hostname = options.hostname || input.hostname;

        /**
         * @type {Number}
         */
        this.port = options.port || input.port;

        /**
         * @type {String}
         */
        this.path = options.path || input.path;

        /**
         * @type {String/Boolean/Object}
         */
        this.agent = options.agent;

        /**
         * @type {Boolean}
         */
        this.insecureHTTPParser = options.insecureHTTPParser || true;

        /**
         * @type {Number}
         */
        this.timeout = options.timeout;
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
    /**
     *
     * @param {Stream} body
     * @param {Object} options
     */
    constructor(body, options) {
        /**
         * @type {Object}
         */
        this.headers = new Headers(options.headers);
        // this.body;
        // this.bodyUsed;

        /**
         * @type {Number}
         */
        this.status = options.status || options.statusCode;

        /**
         * @type {String}
         */
        this.statusText = options.statusText || options.statusMessage;

        /**
         * @type {Boolean}
         */
        this.ok = options.status >= 200 && options.status < 300;
        // this.redirected;
        // this.type;
        // this.url;

        const contentEncoding = this.headers.get("content-encoding");
        let readableStream;
        if (contentEncoding == "gzip") {
            readableStream = zlib.createGunzip();
        } else if (contentEncoding == "deflate") {
            readableStream = zlib.createInflate();
        } else if (contentEncoding == "br") {
            readableStream = zlib.createBrotliDecompress();
        }
        if (readableStream) {
            body.pipe(readableStream);
        }

        /**
         * @type {Stream}
         */
        this.body = readableStream || body;
    }

    /**
     *
     * @returns {Promise}
     */
    buffer() {
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
    // arrayBuffer() {}
    // blob() {}
    // clone() {}
    // error() {}
    // formData() {}

    /**
     *
     * @returns {Promise}
     */
    json() {
        return new Promise((resolve, reject) => {
            this.buffer()
                .then((buffer) => resolve(JSON.parse(buffer)))
                .catch(reject);
        });
    }
    // redirect() {}

    /**
     *
     * @returns {Promise}
     */
    text() {
        return new Promise((resolve, reject) => {
            this.buffer()
                .then((buffer) => resolve("" + buffer))
                .catch(reject);
        });
    }
}

/**
 * ### Default `options.headers`
 * ```json
 * {
 *     "host": "${host}",
 *     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
 *     "accept": "*\/*",
 *     "accept-language": "*"
 * }
 * ```
 * @param {String} resource
 * @param {Object} options
 * @param {Object} options.headers
 * @param {String} options.credentials=include
 * @param {String} options.method=GET
 * @param {String} options.redirect=follow
 * @param {String} options.protocol=http:
 * @param {String} options.hostname=localhost
 * @param {Number} options.port=80
 * @param {String} options.path=/
 * @param {String} options.agent
 * @param {Boolean} options.insecureHTTPParser=true
 * @param {Number} options.timeout
 * @param {Boolean} options.keepalive
 * @returns {Promise}
 */
function fetch(resource, options = {}) {
    return new Promise((resolve, reject) => {
        const request = new Request(resource, options);
        const protocol = request.protocol == "https:" ? https : http;
        const storage = StorageManager.storage(request.hostname, options);

        if (request.credentials == "include" && storage.cookie) {
            request.headers.set("cookie", storage.cookie);
        }

        request.body = protocol.request(request);
        request.body.on("error", reject);
        request.body.on("response", (res) => {
            const response = new Response(res, {
                headers: res.headers,
                status: res.statusCode,
                statusText: res.statusMessage,
            });

            if (response.headers.has("set-cookie")) {
                storage.cookie = response.headers.get("set-cookie");
            }

            if (request.redirect == "follow" && response.headers.has("location")) {
                return fetch(response.headers.get("location")).then(resolve).catch(reject);
            }

            resolve(response);
        });

        if (options.body) {
            options.body = Buffer.from(options.body);
            request.body.write(options.body);
        }

        request.body.end();
    });
}

fetch.URLSearchParams2 = URLSearchParams2;
fetch.URL2 = URL2;
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;
module.exports = fetch;
