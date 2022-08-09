const http = require("http");
const https = require("https");
const zlib = require("zlib");
const StorageManager = require("../storage/index");

/**
 * ### Install
 * ```
 * npm install @ndiing/fetch
 * ```
 * @see ./test.js
 * @module fetch
 */

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
            .replace(/[^\?]+\?/, "")
            .replace(/#[^#]+/, "")
            .replace(/^\?/, "")
            .matchAll(/([^\=&]+)\=([^&]+)/g);

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
        if (this[name] == undefined) {
            this[name] = value;
        } else {
            if (Array.isArray(this[name])) {
                this[name].push(value);
            } else {
                this[name] = [this[name], value];
            }
        }
    }

    /**
     *
     * @param {*} name
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
            callback(this[name], name, this);
        }
    }

    /**
     *
     * @param {String} name
     * @returns {String}
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
            values.push(this[name]);
        }
        return values;
    }
}

/**
 *
 */
class URL2 {
    // https://www.rfc-editor.org/rfc/rfc3986#appendix-B
    static regexp = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

    /**
     *
     * @param {String} url
     */
    constructor(url = "") {
        let [, protocol, , , host, pathname, search, , hash, ,] = url.match(URL2.regexp);
        this.hash = hash || "";
        this.host = host || "localhost";
        this.pathname = pathname || "/";
        this.protocol = protocol || "http:";
        this.search = search || "";
        let [hostname, port] = this.host?.split(":") || [];
        this.hostname = hostname;
        this.port = parseInt(port || (this.protocol == "https:" ? 443 : 80));
        this.origin = this.protocol + "//" + this.host;
        this.path = this.pathname + this.search + this.hash;
        this.href = this.origin + this.path;
        this.searchParams = new URLSearchParams2(this.search);
        // this.username = "";
        // this.password = "";
    }

    // createObjectURL() {}

    // revokeObjectURL() {}

    // toJSON() {}

    /**
     *
     * @returns {String}
     */
    toString() {
        return this.href;
    }
}

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
            this.set(name, init[name]);
        }
    }

    /**
     *
     * @param {String} name
     * @param {String} value
     */
    append(name, value) {
        name = name.toLowerCase();

        if (this[name] == undefined) {
            this[name] = value;
        } else {
            if (Array.isArray(this[name])) {
                this[name].push(value);
            } else {
                this[name] = [this[name], value];
            }
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
            let key = name;
            key = key.replace(/(^|-)(\w)/g, ($, $1, $2) => $1 + $2.toLowerCase());
            values.push([key, this[name]]);
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
     * @property {String} options.body
     * @property {String} options.credentials=include - `omit`, `same-origin`, `include`
     * @property {Object} options.headers
     * @property {String} options.method
     * @property {String} options.redirect=follow - `follow`, `error`, `manual`
     * @property {Boolean} options.keepalive
     * @property {String} options.url
     * @property {String} options.protocol
     * @property {String} options.hostname
     * @property {Number} options.port
     * @property {String} options.path
     * @property {Object} options.agent
     * @property {Boolean} options.insecureHTTPParser=true
     * @property {Number} options.timeout=60000
     */
    constructor(input = "", options = {}) {
        // this.input = input;
        input = new URL2(input);
        this.body = options.body;
        // this.bodyUsed = options.bodyUsed;
        // this.cache = options.cache;
        this.credentials = options.credentials || "include";
        // this.destination = options.destination;
        this.headers = new Headers(options.headers);
        // this.integrity = options.integrity;
        this.method = options.method || "GET";
        // this.mode = options.mode;
        // this.priority = options.priority;
        this.redirect = options.redirect || "follow";
        // this.referrer = options.referrer;
        // this.referrerPolicy = options.referrerPolicy;
        this.keepalive = options.keepalive;
        if (this.keepalive) {
            this.headers.set("connection", "keep-alive");
        }
        // else {
        //     this.headers.set("connection", "close");
        // }
        this.url = input.href;
        this.protocol = options.protocol || input.protocol;
        this.hostname = options.hostname || input.hostname;
        this.port = options.port || input.port;
        this.path = options.path || input.path;
        this.agent = options.agent;
        this.insecureHTTPParser = options.insecureHTTPParser || true;
        this.timeout = options.timeout || 60000;
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
     * @property {Stream} options.body
     * @property {Boolean} options.bodyUsed
     * @property {Object} options.headers
     * @property {Number} options.status
     * @property {String} options.statusText
     * @property {Boolean} options.ok
     */
    constructor(body, options = {}) {
        this.body = body;
        this.bodyUsed = false;
        this.headers = new Headers(options.headers);
        // this.redirected = options.redirected;
        this.status = options.statusCode || 200;
        this.statusText = options.statusMessage || http.STATUS_CODES[this.status];
        this.ok = this.status >= 200 && this.status < 300;
        // this.type = options.type;
        // this.url = options.url;

        if (this.headers.get("content-encoding") == "gzip") {
            this.body = zlib.createGunzip();
        } else if (this.headers.get("content-encoding") == "deflate") {
            this.body = zlib.createInflate();
        } else if (this.headers.get("content-encoding") == "br") {
            this.body = zlib.createBrotliDecompress();
        }

        if (this.body !== body) {
            body.pipe(this.body);
        }
    }

    // arrayBuffer() {}

    // blob() {}

    // clone() {}

    // error() {}

    // formData() {}

    /**
     *
     * @returns {Object}
     */
    json() {
        return new Promise((resolve, reject) => {
            const buffer = [];
            this.body.on("error", reject);
            this.body.on("data", (chunk) => {
                buffer.push(chunk);
            });
            this.body.on("end", () => {
                this.bodyUsed = true;
                resolve(JSON.parse(Buffer.concat(buffer)));
            });
        });
    }

    // redirect() {}

    /**
     *
     * @returns {String}
     */
    text() {
        return new Promise((resolve, reject) => {
            const buffer = [];
            this.body.on("error", reject);
            this.body.on("data", (chunk) => {
                buffer.push(chunk);
            });
            this.body.on("end", () => {
                this.bodyUsed = true;
                resolve(Buffer.concat(buffer).toString());
            });
        });
    }
}

/**
 *
 * @param {String} resource
 * @param {Object} options
 * @returns {Promise}
 */
function fetch(resource = "", options = {}) {
    const request = new Request(resource, options);
    const storage = StorageManager.storage(request.hostname, options);
    if (request.credentials == "include" && storage.cookie) {
        request.headers.append("cookie", storage.cookie);
    }
    const protocol = request.protocol == "https:" ? https : http;
    return new Promise((resolve, reject) => {
        const req = protocol.request(request);
        req.on("error", reject);
        req.on("response", (res) => {
            const response = new Response(res, {
                statusCode: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
            });
            if (response.headers.has("set-cookie")) {
                storage.cookie = response.headers.get("set-cookie");
            }
            if (request.redirect == "follow" && response.headers.has("location")) {
                return fetch(response.headers.get("location")).then(resolve).catch(reject);
            }
            resolve(response);
        });

        if (request.body) {
            req.write(request.body);
        }
        req.end();
    });
}

fetch.URLSearchParams2 = URLSearchParams2;
fetch.URL2 = URL2;
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;
module.exports = fetch;

// jsdoc2md fetch/index.js > fetch/README.md
