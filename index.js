const http = require("http");
const https = require("https");
const { Readable } = require("stream");
const zlib = require("zlib");
const { Blob } = require("buffer");
const Database = require("@ndiinginc/database");

/**
 *
 */
class URLSearchParams2 {
    /**
     *
     */
    constructor(init = "") {
        init = init
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
     */
    append(name, value) {
        value = decodeURIComponent(value);
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
        delete this[name];
    }

    /**
     *
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
     */
    forEach(callback) {
        for (const name of this.keys()) {
            callback(this[name], name);
        }
    }

    /**
     *
     */
    get(name) {
        return this[name];
    }

    getAll(name) {
        return this[name];
    }

    /**
     *
     */
    has(name) {
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
        value = decodeURIComponent(value);
        this[name] = value;
    }

    // sort() {}

    /**
     *
     */
    toString() {
        const values = [];

        for (const name of this.keys()) {
            values.push([name, encodeURIComponent(this[name])].join("="));
        }
        return values.join("&");
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
class URL2 {
    /**
     *
     */
    constructor(url = "", base = "http://localhost") {
        // https://www.rfc-editor.org/rfc/rfc3986
        const regexpOrigin = /^(([^:/?#]+):)(\/\/([^/?#]*))/;

        if (!regexpOrigin.test(url)) {
            url = base + url;
        }
        const regexp = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
        const [href, protocol, scheme, authority, host, pathname = "/", search = "", query = "", hash = "", fragment = ""] = ("" + url).match(regexp);
        const [hostname, port] = ("" + host).split(":");

        this.href = href;
        this.protocol = protocol;
        this.scheme = scheme;
        this.authority = authority;
        this.host = host;
        this.pathname = pathname ?? "/";
        this.search = search;
        this.query = query;
        this.hash = hash;
        this.fragment = fragment;
        this.hostname = hostname;
        this.port = port;

        this.origin = this.protocol + this.authority;
        // this.password;
        this.searchParams = new URLSearchParams2(this.search);
        // this.username;
        this.path = this.pathname + this.search + this.hash;
    }
    // createObjectURL(){}
    // revokeObjectURL(){}
    // toJSON(){}

    /**
     *
     */
    toString() {
        let searchParams = "" + this.searchParams;

        if (searchParams) {
            searchParams = "?" + searchParams;
        }
        return this.origin + this.pathname + searchParams + this.hash;
    }
}

/**
 *
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
        this.body = options.body;

        if (!(this.body instanceof Readable)) {
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
            "Accept-Language": "*",
            "Accept-Encoding": "gzip, deflate, br",
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
    read() {
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
        return this.read().then((buffer) => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
    }

    /**
     *
     */
    blob() {
        return this.read().then((buffer) => new Blob([buffer]));
    }

    // clone() {}

    // error() {}

    // formData() {}

    /**
     *
     */
    json() {
        return this.read().then((buffer) => JSON.parse(buffer));
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
        return this.read().then((buffer) => "" + buffer);
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
 */
function fetch(resource = "", options = {}) {
    return new Promise((resolve, reject) => {
        const request = new Request(resource, options);
        const protocol = request.protocol == "https:" ? https : http;
        const req = protocol.request(request);
        req.on("response", (res) => {
            res.request = request;
            const response = new Response(res, res);
            resolve(response);
        });
        req.on("error", reject);
        request.body.pipe(req);
    });
}

fetch.URLSearchParams2 = URLSearchParams2;
fetch.URL2 = URL2;
fetch.Headers = Headers;
fetch.Request = Request;
fetch.Response = Response;

module.exports = fetch;
