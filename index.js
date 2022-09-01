const http = require("http");
const https = require("https");
const { Readable } = require("stream");
const zlib = require("zlib");
const { Blob } = require("buffer");
const Database = require("@ndiinginc/database");
const URL2 = require("@ndiinginc/url");

/**
 * Normalize headers name
 */
const HTTP_HEADERS = {
    "www-authenticate": "WWW-Authenticate",
    "accept-ch": "Accept-CH",
    "accept-ch-lifetime": "Accept-CH-Lifetime",
    "sec-ch-ua": "Sec-CH-UA",
    "sec-ch-ua-arch": "Sec-CH-UA-Arch",
    "sec-ch-ua-bitness": "Sec-CH-UA-Bitness",
    "sec-ch-ua-full-version": "Sec-CH-UA-Full-Version",
    "sec-ch-ua-full-version-list": "Sec-CH-UA-Full-Version-List",
    "sec-ch-ua-mobile": "Sec-CH-UA-Mobile",
    "sec-ch-ua-model": "Sec-CH-UA-Model",
    "sec-ch-ua-platform": "Sec-CH-UA-Platform",
    "sec-ch-ua-platform-version": "Sec-CH-UA-Platform-Version",
    "content-dpr": "Content-DPR",
    dpr: "DPR",
    ect: "ECT",
    rtt: "RTT",
    etag: "ETag",
    "expect-ct": "Expect-CT",
    "x-xss-protection": "X-XSS-Protection",
    "last-event-id": "Last-Event-ID",
    nel: "NEL",
    te: "TE",
    "x-dns-prefetch-control": "X-DNS-Prefetch-Control",
    "x-ua-compatible": "X-UA-Compatible",
    dnt: "DNT",
};

/**
 *
 */
class Headers {
    /**
     *
     */
    constructor(init = {}) {
        for (const name in init) {
            this.set(name, init[name]);
        }
    }

    /**
     *
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
     */
    delete(name) {
        name = name.toLowerCase();
        delete this[name];
    }

    /**
     *
     */
    entries() {
        const values = [];

        for (const name of this.keys()) {
            const key = HTTP_HEADERS[name] ?? name.replace(/(^|-)(\w)/g, ($, $1, $2) => $1 + $2.toUpperCase());
            values.push([key, this[name]]);
        }
        return values;
    }

    /**
     *
     */
    get(name) {
        name = name.toLowerCase();
        return this[name];
    }

    /**
     *
     */
    has(name) {
        name = name.toLowerCase();
        return !!this[name];
    }

    /**
     *
     */
    keys() {
        return Object.getOwnPropertyNames(this);
    }

    /**
     *
     */
    set(name, value) {
        name = name.toLowerCase();
        this[name] = value;
    }

    /**
     *
     */
    values() {
        const values = [];

        for (const name of this.keys()) {
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
     */
    constructor(input, options = {}) {
        if (input instanceof Request) {
            input = "" + input.input;
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
        this.database = Database.get(options.origin ?? this.input.origin);
        this.body = options.body ?? "";

        // Create readable stream from buffer&string
        if (!(this.body instanceof Readable) && (typeof this.body == "string" || this.body instanceof Buffer)) {
            this.body = new Readable();
            this.body.push(options.body);
            this.body.push(null);
        }
        // this.bodyUsed;
        // this.cache;
        this.credentials = options.credentials ?? "same-origin"; //include
        // this.destination;
        options.headers = {
            Host: this.input.host,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            Accept: "*/*",
            // "Accept-Encoding": "gzip, deflate, br",
            ...options.headers,
        };
        this.headers = new Headers(options.headers);

        // this.database
        if (this.credentials !== "omit" && this.database.cookie) {
            this.headers.set("cookie", this.database.cookie);
        }

        // this.integrity;
        this.method = options.method ?? "GET";
        // this.mode;
        // this.priority;
        this.redirect = options.redirect ?? "follow"; //manual
        // this.referrer;
        // this.referrerPolicy;
        // this.url;

        // https://nodejs.org/api/http.html#httprequestoptions-callback
        this.agent = options.agent;
        this.hostname = options.hostname ?? this.input.hostname;
        this.insecureHTTPParser = options.insecureHTTPParser ?? true;
        this.path = options.path ?? this.input.path;
        this.port = options.port ?? this.input.port;
        this.protocol = options.protocol ?? this.input.protocol;
        this.timeout = options.timeout ?? 3600000;
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
     */
    constructor(body, options = {}) {
        this.body = body;

        if (!(this.body instanceof Readable)) {
            this.body = new Readable();
            this.body.push(body);
            this.body.push(null);
        }
        // this.bodyUsed;
        this.headers = new Headers(options.headers);
        // this.ok;
        // this.redirected;
        this.status = options.statusCode ?? options.status ?? 200;
        // this.statusText;
        // this.type;
        // this.url;

        if (this.headers.has("set-cookie")) {
            options.request.database.cookie = this.headers.get("set-cookie");
        }

        if (options.request?.redirect == "follow" && this.headers.has("location")) {
            const base = options.request.input.origin;
            const url = this.headers.get("location");
            return this.redirect("" + new URL2(url, base));
        }
    }

    /**
     *
     */
    buffer() {
        return new Promise((resolve, reject) => {
            const encoding = this.headers.get("content-encoding");

            if (encoding == "gzip") {
                this.body = this.body.pipe(zlib.createGunzip());
            } else if (encoding == "deflate") {
                this.body = this.body.pipe(zlib.createInflate());
            } else if (encoding == "br") {
                this.body = this.body.pipe(zlib.createBrotliDecompress());
            }
            const buffer = [];
            this.body.on("data", (chunk) => {
                buffer.push(chunk);
            });
            this.body.on("end", () => {
                resolve(Buffer.concat(buffer));
            });
            this.body.on("error", reject);
        });
    }

    /**
     *
     */
    arrayBuffer() {
        return this.buffer().then((buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }

    /**
     *
     */
    blob() {
        return this.buffer().then((buffer) => new Blob([buffer]));
    }

    // clone() {}

    // error() {}

    // formData() {}

    /**
     *
     */
    json() {
        return this.buffer().then((buffer) => JSON.parse(buffer));
    }

    /**
     *
     */
    redirect(url, status) {
        if (status) {
            this.status = status;
        }
        return fetch(url);
    }

    /**
     *
     */
    text() {
        return this.buffer().then((buffer) => "" + buffer);
    }
}

/**
 * method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.
 * @param {String} resource - This defines the resource that you wish to fetch
 * @param {Object} options - An object containing any custom settings that you want to apply to the request
 * @param {String} options.body - Any body that you want to add to your request: this can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams, string object or literal, or a ReadableStream object.
 * @param {String} options.credentials=same-origin -
 * @param {Object} options.headers - Any headers you want to add to your request, contained within a Headers object or an object literal with String values.
 * @param {String} options.method=GET - The request method, e.g., GET, POST. Note that the Origin header is not set on Fetch requests with a method of HEAD or GET.
 * @param {String} options.redirect=follow - How to handle a redirect response
 * @param {String} options.agent -
 * @param {String} options.hostname=localhost -
 * @param {String} options.insecureHTTPParser=true -
 * @param {String} options.path=/ -
 * @param {Number} options.port=80 -
 * @param {String} options.protocol=http: -
 * @param {Number} options.timeout=3600000 -
 * @returns {Promise}
 * @example
 * // usage
 * fetch("https://jsonplaceholder.typicode.com/posts", {
 *     proxy: "http://127.0.0.1:8888", // set proxy url / override with options.agent
 *     // agent: new HttpsProxyAgent('http://127.0.0.1:8888'), // use agent with https://www.npmjs.com/package/https-proxy-agent
 *     credentials: 'omit', // do not store any cookies
 *     // credentials: 'same-origin', // store cookies and use for next request
 *     redirect: 'manual', // do not follow redirect
 *     // redirect: 'follow', // follow redirect,
 *     headers:{
 *         "Accept-Encoding": "gzip, deflate, br",// request compression
 *     }
 * })
 * .then((res) => res.json())
 * .then(console.log);
 */
function fetch(resource = "", options = {}) {
    return new Promise(async (resolve, reject) => {
        const request = new Request(resource, options);
        const protocol = (request) => (request.protocol == "https:" ? https : http);

        if (!options.agent && options.proxy) {
            const proxy = new URL2(options.proxy);
            const hostname = request.hostname;
            const port = request.port;

            if (request.protocol == "https:") {
                request.agent = await new Promise((resolve) => {
                    proxy.method = "CONNECT";
                    proxy.path = hostname + ":" + port;

                    const req = protocol(proxy).request(proxy);
                    req.on("connect", (res, socket) => {
                        const agent = new (protocol(request).Agent)({
                            keepAlive: true,
                            socket,
                            rejectUnauthorized: false,
                        });
                        resolve(agent);
                    });
                    req.on("error", reject);
                    req.end();
                });
            } else {
                request.hostname = proxy.hostname;
                request.port = proxy.port;
                request.path = "" + request.input;
            }
        }

        const req = protocol(request).request(request);
        req.on("response", (res) => {
            const response = new Response(res, {
                status: res.statusCode,
                headers: res.headers,
                request,
            });
            resolve(response);
        });
        req.on("error", reject);
        request.body.pipe(req);
    });
}

fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;

module.exports = fetch;
