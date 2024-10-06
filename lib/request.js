const http = require("http");
const https = require("https");
const { Readable } = require("stream");
const Headers = require("./headers.js");

/**
 * Kelas untuk membuat dan mengelola permintaan HTTP/HTTPS.
 */
class Request {
    /**
     * Konstruktor untuk membuat instance `Request`.
     *
     * @param {string} input - URL untuk permintaan.
     * @param {Object} [options={}] - Opsi untuk permintaan.
     * @param {string|Readable} [options.body=""] - Isi dari permintaan.
     * @param {string} [options.credentials="same-origin"] - Kredensial untuk permintaan (default: "same-origin").
     * @param {Object} [options.headers={}] - Header untuk permintaan.
     * @param {string} [options.method="GET"] - Metode HTTP yang digunakan (default: "GET").
     * @param {string} [options.redirect="follow"] - Kebijakan pengalihan (default: "follow").
     * @param {number} [options.follow=30] - Jumlah pengalihan yang diizinkan (default: 30).
     * @param {Object} [options.agent] - Agen untuk permintaan.
     * @param {boolean} [options.insecureHTTPParser=true] - Parser HTTP yang tidak aman (default: true).
     * @param {AbortSignal} [options.signal] - Sinyal untuk membatalkan permintaan.
     * @param {number} [options.timeout=30000] - Batas waktu permintaan dalam milidetik (default: 30 detik).
     */
    constructor(input, options = {}) {
        this.input = new URL(input);
        this.body = options.body ?? "";
        if (typeof this.body === "string") {
            const readable = new Readable();
            readable.push(this.body);
            readable.push(null);
            this.body = readable;
        }
        this.credentials = options.credentials ?? "same-origin";
        this.headers = new Headers({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
            Host: this.input.host,
            Accept: "*/*",
            "Accept-Language": "*",
            "Accept-Encoding": "*",
            Connection: "keep-alive",
            ...options.headers,
        });
        this.method = options.method ?? "GET";
        this.redirect = options.redirect ?? "follow";
        this.follow = options.follow ?? 30;
        this.url = this.input.toString();
        this.client = this.input.protocol === "https:" ? https : http;
        this.agent = options.agent;
        if (!this.agent) {
            const Agent = this.client.Agent;
            const agent = new Agent({ keepAlive: true, rejectUnauthorized: false });
            this.agent = agent;
        }
        this.host = this.input.host;
        this.hostname = this.input.hostname;
        this.insecureHTTPParser = options.insecureHTTPParser ?? true;
        this.path = this.input.pathname + this.input.search + this.input.hash;
        this.port = parseInt(this.input.port || (this.input.protocol === "https:" ? 443 : 80));
        this.protocol = this.input.protocol;
        this.signal = options.signal ?? new AbortController().signal;
        this.timeout = options.timeout ?? 30 * 1000;
        this.origin = this.input.origin;
    }
}

module.exports = Request;

// {
//     const request=new Request('http://google.com')
//     console.log(request)
// }
