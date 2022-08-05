const http = require("http");
const https = require("https");
const url = require("url");
const Storage = require("@ndiing/storage");

/**
 * Nodejs fetch module
 *
 * ### Install
 * ```
 * npm install @ndiing/fetch
 * ```
 *
 *
 * ### Usage
 * ```js
 * const fetch = require("../index.js");
 * const { Storage } = require("../index.js");
 *
 * fetch("https://mitra.tokopedia.com/")
 * .then((res) => res.text())
 * .then(console.log)
 * .catch(console.error);
 *
 * // when set-cookies present in headers
 * // cookies stored in ./${userDataDir}/${hostname}/${profileDirector}.json
 * // in this case in ./data/mitra.tokopedia.com/default.json
 *
 * // how to check data
 * // manage data using pool
 * const pool = Storage.get("mitra.tokopedia.com")
 * console.log(pool.localStorage.getItem('user'));
 * console.log(pool.cookieStore.get('_abck'));
 * console.log(pool.cookie);
 *
 * ```
 *
 * @module fetch
 */

class Headers extends URLSearchParams {
    /**
     *
     * @param {Object} init -
     */
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
    /**
     *
     * @param {String} input -
     * @param {Object} options -
     * @param {String} options.method -
     * @param {String} options.body -
     * @param {Object} options.agent -
     * @param {String} options.hostname -
     * @param {Boolean} options.insecureHTTPParser -
     * @param {String} options.path -
     * @param {Number} options.port -
     * @param {String} options.protocol -
     * @param {Object} options.headers -
     */
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
    /**
     *
     * @param {Array} body -
     * @param {Object} options -
     */
    constructor(body = [], options = {}) {
        this.body = body;
        this.status = options.statusCode;
        this.statusText = options.statusMessage;
        this.headers = new Headers(options.headers);
    }

    /**
     * Returns a promise that resolves with an ArrayBuffer representation of the response body.
     * @returns {Array}
     */
    arrayBuffer() {
        return Buffer.concat(this.body);
    }

    /**
     * Returns a promise that resolves with the result of parsing the response body text as JSON.
     * @returns {Object}
     */
    json() {
        return JSON.parse(this.text());
    }

    /**
     * Returns a promise that resolves with a text representation of the response body.
     * @returns {String}
     */
    text() {
        return this.arrayBuffer().toString();
    }
}

/**
 * fetching resources
 * @param {String} resource -
 * @param {Object} options -
 * @param {String} options.method -
 * @param {String} options.body -
 * @param {Object} options.agent -
 * @param {String} options.hostname -
 * @param {Boolean} options.insecureHTTPParser -
 * @param {String} options.path -
 * @param {Number} options.port -
 * @param {String} options.protocol -
 * @param {Object} options.headers -
 * @returns {Promise}
 */
function fetch(resource = "", options = {}) {
    resource = url.parse(resource);
    const pool = Storage.get(resource.hostname, options);
    if (!options.headers) options.headers = {};
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

fetch.Storage = Storage;
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;
module.exports = fetch;
