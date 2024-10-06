const HTTP_HEADERS = ["Accept", "Accept-CH", "Accept-Charset", "Accept-Encoding", "Accept-Language", "Accept-Patch", "Accept-Post", "Accept-Ranges", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Access-Control-Expose-Headers", "Access-Control-Max-Age", "Access-Control-Request-Headers", "Access-Control-Request-Method", "Age", "Allow", "Alt-Svc", "Alt-Used", "Attribution-Reporting-Eligible", "Attribution-Reporting-Register-Source", "Attribution-Reporting-Register-Trigger", "Authorization", "Cache-Control", "Clear-Site-Data", "Connection", "Content-Digest", "Content-Disposition", "Content-DPR", "Content-Encoding", "Content-Language", "Content-Length", "Content-Location", "Content-Range", "Content-Security-Policy", "Content-Security-Policy-Report-Only", "Content-Type", "Cookie", "Critical-CH", "Cross-Origin-Embedder-Policy", "Cross-Origin-Opener-Policy", "Cross-Origin-Resource-Policy", "Date", "Device-Memory", "Digest", "DNT", "Downlink", "DPR", "Early-Data", "ECT", "ETag", "Expect", "Expect-CT", "Expires", "Forwarded", "From", "Host", "If-Match", "If-Modified-Since", "If-None-Match", "If-Range", "If-Unmodified-Since", "Keep-Alive", "Last-Modified", "Link", "Location", "Max-Forwards", "NEL", "No-Vary-Search", "Observe-Browsing-Topics", "Origin", "Origin-Agent-Cluster", "Permissions-Policy", "Pragma", "Priority", "Proxy-Authenticate", "Proxy-Authorization", "Range", "Referer", "Referrer-Policy", "Refresh", "Report-To", "Reporting-Endpoints", "Repr-Digest", "Retry-After", "RTT", "Save-Data", "Sec-Browsing-Topics", "Sec-CH-Prefers-Color-Scheme", "Sec-CH-Prefers-Reduced-Motion", "Sec-CH-Prefers-Reduced-Transparency", "Sec-CH-UA", "Sec-CH-UA-Arch", "Sec-CH-UA-Bitness", "Sec-CH-UA-Full-Version", "Sec-CH-UA-Full-Version-List", "Sec-CH-UA-Mobile", "Sec-CH-UA-Model", "Sec-CH-UA-Platform", "Sec-CH-UA-Platform-Version", "Sec-Fetch-Dest", "Sec-Fetch-Mode", "Sec-Fetch-Site", "Sec-Fetch-User", "Sec-GPC", "Sec-Purpose", "Sec-WebSocket-Accept", "Sec-WebSocket-Extensions", "Sec-WebSocket-Key", "Sec-WebSocket-Protocol", "Sec-WebSocket-Version", "Server", "Server-Timing", "Service-Worker-Navigation-Preload", "Set-Cookie", "Set-Login", "SourceMap", "Speculation-Rules", "Strict-Transport-Security", "Supports-Loading-Mode", "TE", "Timing-Allow-Origin", "Tk", "Trailer", "Transfer-Encoding", "Upgrade", "Upgrade-Insecure-Requests", "User-Agent", "Vary", "Via", "Viewport-Width", "Want-Content-Digest", "Want-Digest", "Want-Repr-Digest", "Width", "WWW-Authenticate", "X-Content-Type-Options", "X-DNS-Prefetch-Control", "X-Forwarded-For", "X-Forwarded-Host", "X-Forwarded-Proto", "X-Frame-Options", "X-XSS-Protection"];

function normalizeHeaders(name) {
    return HTTP_HEADERS.find((key) => key.toLowerCase() === name.toLowerCase()) || name;
}

/**
 * Kelas untuk mengelola header HTTP sebagai objek.
 */
class Headers {
    /**
     * Konstruktor untuk membuat instance `Headers`.
     *
     * @param {Object|Array} [init] - Inisialisasi header, bisa berupa objek atau array.
     */
    constructor(init) {
        if (typeof init === "object") {
            if (!Array.isArray(init)) {
                init = Object.entries(init);
            }
            for (const [name, value] of init) {
                this.append(name, value);
            }
        }
    }

    /**
     * Menambahkan nilai baru ke header yang sudah ada, atau membuat header baru jika belum ada.
     *
     * @param {string} name - Nama header.
     * @param {string} value - Nilai header.
     */
    append(name, value) {
        name = normalizeHeaders(name);
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
     * Menghapus header berdasarkan nama.
     *
     * @param {string} name - Nama header yang akan dihapus.
     */
    delete(name) {
        name = normalizeHeaders(name);
        delete this[name];
    }

    /**
     * Mengembalikan iterator untuk pasangan nama dan nilai dari header.
     *
     * @returns {IterableIterator} Iterator untuk entri header.
     */
    *entries() {
        for (const [name, value] of Object.entries(this)) {
            yield [name, value];
        }
    }

    /**
     * Menjalankan fungsi callback untuk setiap header.
     *
     * @param {function} callbackFn - Fungsi callback yang menerima nilai, nama, dan objek headers.
     */
    forEach(callbackFn) {
        for (const [name, value] of Object.entries(this)) {
            callbackFn(value, name, this);
        }
    }

    /**
     * Mengambil nilai dari header berdasarkan nama.
     *
     * @param {string} name - Nama header yang akan diambil.
     * @returns {string|null} Nilai header atau null jika tidak ada.
     */
    get(name) {
        name = normalizeHeaders(name);
        if (Array.isArray(this[name])) {
            return this[name].join(", ");
        }
        return this[name] ?? null;
    }

    /**
     * Mengambil semua nilai dari header "Set-Cookie".
     *
     * @returns {Array} Array nilai cookie yang diatur dalam header.
     */
    getSetCookie() {
        let name = "Set-Cookie";
        name = normalizeHeaders(name);
        return [].concat(this[name]).filter(Boolean);
    }

    /**
     * Memeriksa apakah header dengan nama tertentu ada.
     *
     * @param {string} name - Nama header yang akan diperiksa.
     * @returns {boolean} True jika header ada, false jika tidak.
     */
    has(name) {
        name = normalizeHeaders(name);
        return !!this[name];
    }

    /**
     * Mengembalikan iterator untuk nama-nama header.
     *
     * @returns {IterableIterator} Iterator untuk nama header.
     */
    *keys() {
        for (const [name] of Object.entries(this)) {
            yield name;
        }
    }

    /**
     * Mengatur atau mengganti nilai dari header berdasarkan nama.
     *
     * @param {string} name - Nama header.
     * @param {string} value - Nilai header.
     */
    set(name, value) {
        name = normalizeHeaders(name);
        this[name] = value;
    }

    /**
     * Mengembalikan iterator untuk nilai-nilai dari header.
     *
     * @returns {IterableIterator} Iterator untuk nilai header.
     */
    *values() {
        for (const [, value] of Object.entries(this)) {
            yield value;
        }
    }
}

Headers.normalizeHeaders = normalizeHeaders;

module.exports = Headers;

// {
//     const myHeaders = new Headers(); // Currently empty
//     myHeaders.append("Content-Type", "image/jpeg");
//     myHeaders.get("Content-Type"); // Returns 'image/jpeg'
//     console.log(myHeaders);
// }

// {
//     const httpHeaders = {
//         "Content-Type": "image/jpeg",
//         "X-My-Custom-Header": "Zeke are cool",
//     };
//     const myHeaders = new Headers(httpHeaders);
//     console.log(myHeaders);

//     const secondHeadersObj = new Headers(myHeaders);
//     secondHeadersObj.get("Content-Type"); // Would return 'image/jpeg' — it inherits it from the first headers object
//     console.log(secondHeadersObj);
// }

// {
//     const myHeaders = new Headers(); // Currently empty
//     myHeaders.append("Content-Type", "image/jpeg");
//     console.log(myHeaders.get("Content-Type")); // Returns 'image/jpeg'
//     myHeaders.append("Accept-Encoding", "deflate");
//     myHeaders.append("Accept-Encoding", "gzip");
//     console.log(myHeaders.get("Accept-Encoding")); // Returns 'deflate, gzip'
// }

// {
//     const myHeaders = new Headers(); // Currently empty
//     myHeaders.append("Content-Type", "image/jpeg");
//     console.log(myHeaders.get("Content-Type")); // Returns 'image/jpeg'
//     myHeaders.delete("Content-Type");
//     console.log(myHeaders.get("Content-Type")); // Returns null, as it has been deleted
// }

// {
//     // Create a test Headers object
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "text/xml");
//     myHeaders.append("Vary", "Accept-Language");

//     // Display the key/value pairs
//     for (const pair of myHeaders.entries()) {
//         console.log(`${pair[0]}: ${pair[1]}`);
//     }
// }

// {
//     // Create a new test Headers object
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Cookie", "This is a demo cookie");
//     myHeaders.append("compression", "gzip");

//     // Display the key/value pairs
//     myHeaders.forEach((value, key) => {
//         console.log(`${key} ==> ${value}`);
//     });
// }

// {
//     const myHeaders = new Headers(); // Currently empty
//     console.log(myHeaders.get("Not-Set")); // Returns null
//     myHeaders.append("Content-Type", "image/jpeg");
//     console.log(myHeaders.get("Content-Type")); // Returns "image/jpeg"
//     myHeaders.append("Accept-Encoding", "deflate");
//     myHeaders.append("Accept-Encoding", "gzip");
//     myHeaders.get("Accept-Encoding"); // Returns "deflate, gzip"
//     console.log(
//         myHeaders
//             .get("Accept-Encoding")
//             .split(",")
//             .map((v) => v.trimStart()),
//     ); // Returns [ "deflate", "gzip" ]
// }

// {
//     fetch("https://example.com").then((response) => {
//         console.log(response.headers.getSetCookie());
//         // No header values returned
//     });
// }

// {
//     const headers = new Headers({
//         "Set-Cookie": "name1=value1",
//     });

//     headers.append("Set-Cookie", "name2=value2");

//     headers.getSetCookie();
//     // Returns ["name1=value1", "name2=value2"]
// }

// {
//     const myHeaders = new Headers(); // Currently empty
//     myHeaders.append("Content-Type", "image/jpeg");
//     console.log(myHeaders.has("Content-Type")); // Returns true
//     console.log(myHeaders.has("Accept-Encoding")); // Returns false
// }

// {
//     // Create a test Headers object
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "text/xml");
//     myHeaders.append("Vary", "Accept-Language");

//     // Display the keys
//     for (const key of myHeaders.keys()) {
//         console.log(key);
//     }
// }

// {
//     const myHeaders = new Headers(); // Currently empty
//     myHeaders.append("Content-Type", "image/jpeg");
//     myHeaders.set("Content-Type", "text/html");
//     myHeaders.set("Accept-Encoding", "deflate");
//     myHeaders.set("Accept-Encoding", "gzip");
//     console.log(myHeaders.get("Accept-Encoding")); // Returns 'gzip'
// }

// {
//     // Create a test Headers object
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "text/xml");
//     myHeaders.append("Vary", "Accept-Language");

//     // Display the values
//     for (const value of myHeaders.values()) {
//         console.log(value);
//     }
// }
