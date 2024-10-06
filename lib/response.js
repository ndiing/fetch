const zlib = require("zlib");
const Headers = require("./headers.js");

/**
 * Kelas untuk menangani respons dari permintaan HTTP/HTTPS.
 */
class Response {
    /**
     * Konstruktor untuk membuat instance `Response`.
     *
     * @param {ReadableStream|string} body - Isi dari respons.
     * @param {Object} [options={}] - Opsi untuk respons.
     * @param {number} [options.status] - Kode status HTTP dari respons.
     * @param {string} [options.statusText] - Pesan status HTTP dari respons.
     * @param {string} [options.url] - URL dari respons.
     * @param {Object} [options.headers={}] - Header untuk respons.
     */
    constructor(body, options = {}) {
        this.body = body;
        this.headers = new Headers(options.headers);
        this.ok = options.status >= 200 && options.status < 300;
        this.status = options.status;
        this.statusText = options.statusText;
        this.url = options.url;
    }

    /**
     * Mengembalikan isi respons dalam bentuk Buffer.
     *
     * @returns {Promise<Buffer>} - Isi dari respons sebagai Buffer.
     */
    async buffer() {
        if (this.headers.has("Content-Encoding")) {
            const contentEncoding = this.headers.get("Content-Encoding");
            if (/\bbr\b/.test(contentEncoding)) {
                this.body = this.body.pipe(zlib.createBrotliDecompress());
            } else if (/\bgzip\b/.test(contentEncoding)) {
                this.body = this.body.pipe(zlib.createGunzip());
            } else if (/\bdeflate\b/.test(contentEncoding)) {
                this.body = this.body.pipe(zlib.createInflate());
            }
        }
        const chunks = [];
        for await (const chunk of this.body) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        return buffer;
    }

    /**
     * Mengembalikan isi respons dalam bentuk objek JSON.
     *
     * @returns {Promise<Object>} - Isi dari respons sebagai objek JSON.
     */
    async json() {
        const buffer = await this.buffer();
        return JSON.parse(buffer);
    }

    /**
     * Mengembalikan isi respons dalam bentuk string.
     *
     * @returns {Promise<string>} - Isi dari respons sebagai string.
     */
    async text() {
        const buffer = await this.buffer();
        return buffer.toString();
    }
}
module.exports = Response;

// {
//     const response = new Response('',{})
//     console.log(response)
// }
