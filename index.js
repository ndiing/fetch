const http = require("http");
const https = require("https");
const zlib = require("zlib");
const storage = require("@ndiing/storage");

/**
 * Nodejs fetch module
 * ### Install
 * ```
 * npm install @ndiing/fetch
 * ```
 * @see {@link ./examples/fetch.js}
* @module fetch
*/

/**
 *
 */
class Headers {
    /**
     * Create headers
     * @param {Any} init
     */
    constructor(init = {}) {
        for (const name in init) {
            this.append(name, init[name]);
        }
    }

    /**
     * Append value by name, if exists it's create an array of values
     * @param {Any} name
     * @param {Any} value
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
     * Delete headers by name
     * @param {Any} name
     */
    delete(name) {
        name = name.toLowerCase();
        delete this[name];
    }

    /**
     * Get array of [name,value]
     * @returns {Array}
     */
    entries() {
        const keys = this.keys();
        const values = [];
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            values.push([name.replace(/(^|[^\w])(\w)/g, ($, $1, $2) => $1 + $2.toUpperCase()), this[name]]);
        }
        return values;
    }

    /**
     * Get headers by name
     * @param {Any} name
     * @returns {Any}
     */
    get(name) {
        name = name.toLowerCase();
        return this[name];
    }

    /**
     * Check headers name exists
     * @param {Any} name
     * @returns {Boolean}
     */
    has(name) {
        name = name.toLowerCase();
        return !!this[name];
    }

    /**
     * Get array of headers names
     * @returns {Array}
     */
    keys() {
        return Object.getOwnPropertyNames(this);
    }

    /**
     * Set value by name
     * @param {Any} name
     * @param {Any} value
     */
    set(name, value) {
        name = name.toLowerCase();
        this[name] = value;
    }

    /**
     * Get Array of heades value
     * @returns {Array}
     */
    values() {
        const keys = this.keys();
        const values = [];
        for (let i = 0; i < keys.length; i++) {
            const name = keys[i];
            values.push(this[name]);
        }
        return values;
    }
}

/**
 * 
 */
class Request {
    constructor(input, options) {
        this.body = options.body;
        // this.bodyUsed = options.bodyUsed;
        // this.cache = options.cache;
        // this.credentials = options.credentials;
        // this.destination = options.destination;

        // this.integrity = options.integrity;
        /**
         * @type {String}
         */
        this.method = options.method;
        // this.mode = options.mode;
        // this.priority = options.priority;
        // this.redirect = options.redirect;
        // this.referrer = options.referrer;
        // this.referrerPolicy = options.referrerPolicy;
        // this.url=options.url

        // this.url = new URL(input);
        /**
         * @type {URL}
         */
        this.url = input;

        // default headers
        options.headers = {
            ...options.headers,
            host: this.url.host,
        };

        /**
         * @type {Object}
         */
        this.headers = new Headers(options.headers);

        const port = this.url.protocol == "https:" ? 443 : 80;

        // this.stream = options;

        // http.request
        /**
         * @type {Any}
         */
        this.agent = options.agent || null;

        /**
         * @type {String}
         */
        this.hostname = this.url.hostname;

        /**
         * @type {Boolean}
         */
        this.insecureHTTPParser = options.insecureHTTPParser || true;

        /**
         * @type {String}
         */
        this.path = this.url.pathname + this.url.search;

        /**
         * @type {Number}
         */
        this.port = parseInt(this.url.port || port);

        /**
         * @type {String}
         */
        this.protocol = this.url.protocol;

        /**
         * @type {Number}
         */
        this.timeout = options.timeout || 1000 * 60; //60s/1m
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
     * @param {Array} body 
     * @param {Object} options 
     */
    constructor(body = [], options = {}) {
        this.body = body;
        // this.body=options.body
        // this.bodyUsed = options.bodyUsed;
        this.headers = new Headers(options.headers);
        // this.ok = options.ok;
        // this.redirected = options.redirected;
        this.status = options.statusCode;
        this.statusText = options.statusMessage;
        // this.type = options.type;
        // this.url = this.request.url;
        // this.request={}
        this.stream = options;
    }

    /**
     * 
     * @returns {Buffer}
     */
    arrayBuffer() {
        return Buffer.concat(this.body);
    }
    // blob() {}
    // clone() {}
    // error() {}
    // formData() {}

    /**
     * 
     * @returns {Object}
     */
    async json() {
        return JSON.parse(this.arrayBuffer());
    }
    // redirect() {}

    /**
     * 
     * @returns {String}
     */
    async text() {
        return this.arrayBuffer().toString();
    }
}

/**
 * 
 * @param {String} resource -
 * @param {Object} options -
 * @returns {Promise}
 */
function fetch(resource = "", options = {}) {
    resource=new URL(resource)
    options.url=resource
    const pool=storage.get(resource.hostname,options)
    if(!options.headers){
        options.headers={}
    }
    options.headers.cookie=pool.cookie
    const request = new Request(resource, options);

    const protocol = request.url.protocol == "https:" ? https : http;

    return new Promise((resolve, reject) => {
        const req = protocol.request(request, async (res) => {
            const response = new Response([], res);
            response.url = request.url;

            if(response.headers.has('set-cookie')){
                pool.cookie=response.headers.get('set-cookie')
            }

            // 
            let stream = res;

            if (response.headers.get("content-encoding") == "br") {
                stream = zlib.createBrotliDecompress();
            } else if (response.headers.get("content-encoding") == "gzip") {
                stream = zlib.createGunzip();
            } else if (response.headers.get("content-encoding") == "deflate") {
                stream = zlib.createInflate();
            }

            if (stream !== res) {
                res.pipe(stream);
            }

            for await (const chunk of stream) {
                response.body.push(chunk);
            }
            // 

            resolve(response);
        });
        req.on("error", reject);
        if (request.body) {
            req.write(request.body);
        }
        req.end();
    });
}

fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;

module.exports = fetch;
