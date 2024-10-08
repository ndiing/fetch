const { read, write } = require("./helper.js");
const Request = require("./request.js");
const Response = require("./response.js");
const CookieStore = require("./cookie-store.js");
const ObjectObserver = require("./object-observer.js");
const { execSync } = require("child_process");

function setProxyServer(enable) {
    try {
        if (enable) {
            execSync('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f');
            execSync('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyOverride /t REG_SZ /d "<-loopback>" /f');
            execSync('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d "http=127.0.0.1:8888;https=127.0.0.1:8888;ftp=127.0.0.1:8888" /f');
        } else {
            execSync('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f');
            execSync('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyOverride /t REG_SZ /d "" /f');
            execSync('reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d "" /f');
        }
    } catch (error) {}
}

/**
 * Mengambil alamat server proxy dari pengaturan Internet di Windows.
 *
 * @returns {string|null} Alamat server proxy dalam format string jika ditemukan,
 *                        atau null jika tidak ada pengaturan proxy.
 */
function getProxyServer() {
    try {
        const output = execSync('reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /s /f "ProxyServer"');
        const array = Array.from(output.toString().matchAll(/([^= ;]+)=([^;\r\n]+)/g), (match) => match.slice(1).join("://"));
        const string = array.find((string) => string.includes("http"));
        return string;
    } catch (error) {}
    return null;
}

/**
 * Membuat dan mengembalikan objek penyimpanan yang terhubung dengan file.
 *
 * @param {string} filename - Nama file yang digunakan untuk membaca dan menulis data penyimpanan.
 * @returns {Object} Objek yang mengamati perubahan pada data penyimpanan
 *                   dan menulis kembali ke file saat terjadi perubahan.
 */
function createStore(filename) {
    const target = read(filename, {});
    target.cookieStore = new CookieStore(target.cookieStore);
    const proxy = new ObjectObserver(target, (newTarget) => {
        write(filename, newTarget);
    });
    return proxy;
}

/**
 * Melakukan permintaan HTTP dan mengembalikan responsnya sebagai Promise.
 *
 * @param {string} resource - URL sumber daya yang ingin diambil.
 * @param {Object} [options={}] - Opsi untuk permintaan HTTP.
 * @param {string} [options.credentials] - Mengontrol apakah cookie harus disertakan dalam permintaan.
 * @param {Object} [options.store] - Objek penyimpanan yang berisi cookie dan data lainnya.
 * @returns {Promise<Response>} Promise yang menyelesaikan respons HTTP setelah permintaan selesai.
 */
function fetch(resource, options = {}) {
    return new Promise(async (resolve, reject) => {
        const request = new Request(resource, options);
        if (options.credentials !== "omit" && options.store) {
            const cookie = options.store?.cookieStore?.cookie;
            if (cookie) {
                request.headers.set("Cookie", cookie);
            }
        }
        const httpProxy = getProxyServer();
        if (httpProxy) {
            const request2 = new Request(httpProxy, { method: "CONNECT" });
            request2.path = `${request.hostname}:${request.port}`;
            request.hostname = request2.hostname;
            request.port = request2.port;
            // console.log(request2);
            if (request.protocol === "https:") {
                const agent = await new Promise((resolve, reject) => {
                    const req2 = request2.client.request(request2);
                    req2.on("error", reject);
                    req2.on("timeout", () => req2.destroy());
                    req2.on("connect", (req, socket, head) => {
                        const Agent = request.client.Agent;
                        const agent = new Agent({
                            rejectUnauthorized: false,
                            keepAlive: true,
                            socket,
                        });
                        resolve(agent);
                    });
                    request2.body.pipe(req2);
                });
                request.agent = agent;
            }
        }
        const req = request.client.request(request);
        req.on("error", reject);
        req.on("timeout", () => req.destroy());
        req.on("response", (res) => {
            let response = new Response(res, {
                headers: res.headers,
                status: res.statusCode,
                statusText: res.statusMessage,
                url: request.url,
            });
            const setCookie = response.headers.getSetCookie();
            if (options.credentials !== "omit" && options.store?.cookieStore && setCookie.length) {
                options.store.cookieStore.cookie = setCookie;
            }
            if (response.headers.has("Location") && request.redirect === "follow" && request.follow > 0) {
                --request.follow;
                const location = response.headers.get("Location");
                resource = new URL(location, request.origin);
                response = fetch(resource, {
                    follow: request.follow,
                    store: options.store,
                });
            }
            resolve(response);
        });
        request.body.pipe(req);
    });
}

fetch.setProxyServer = setProxyServer;
fetch.getProxyServer = getProxyServer;
fetch.createStore = createStore;

module.exports = fetch;

// {
//     fetch('https://jsonplaceholder.typicode.com/posts/1') .then((response) => response.json()) .then((json) => console.log(json));
//     fetch('https://jsonplaceholder.typicode.com/posts') .then((response) => response.json()) .then((json) => console.log(json));
//     fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST', body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1, }), headers: { 'Content-type': 'application/json; charset=UTF-8', }, }) .then((response) => response.json()) .then((json) => console.log(json));
//     fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'PUT', body: JSON.stringify({ id: 1, title: 'foo', body: 'bar', userId: 1, }), headers: { 'Content-type': 'application/json; charset=UTF-8', }, }) .then((response) => response.json()) .then((json) => console.log(json));
//     fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'PATCH', body: JSON.stringify({ title: 'foo', }), headers: { 'Content-type': 'application/json; charset=UTF-8', }, }) .then((response) => response.json()) .then((json) => console.log(json));
//     fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE', });
//     fetch('https://jsonplaceholder.typicode.com/posts?userId=1') .then((response) => response.json()) .then((json) => console.log(json));
//     fetch('https://jsonplaceholder.typicode.com/posts/1/comments') .then((response) => response.json()) .then((json) => console.log(json));
// }

// {
//     // penanganan redirect
//     fetch('http://google.com')
//     .then(console.log)
//     .catch(console.log)
// }

// {
//     // penanganan kompresi
//     fetch('https://jsonplaceholder.typicode.com/posts/1',{
//         headers:{
//             'accept-encoding':'br'
//         }
//     })
//     .then(res=>res.json())
//     .then(console.log)
//     .catch(console.log)

//     // penanganan kompresi
//     fetch('https://jsonplaceholder.typicode.com/posts/1',{
//         headers:{
//             'accept-encoding':'gzip'
//         }
//     })
//     .then(res=>res.json())
//     .then(console.log)
//     .catch(console.log)

//     // penanganan kompresi
//     fetch('https://jsonplaceholder.typicode.com/posts/1',{
//         headers:{
//             'accept-encoding':'deflate'
//         }
//     })
//     .then(res=>res.json())
//     .then(console.log)
//     .catch(console.log)
// }

// {
//     // penanganan cookies

//     const store = createStore('./data/google.json',{})

//     fetch('http://google.com',{
//         store
//     })
//     .then(console.log)
//     .catch(console.log)

//     console.log(store)
// }

// {
//     // penanganan proxy
//     // proxy auto detect ketika fiddler atau software monitoring lainnya dibuka

//     fetch('http://google.com',{
//     })
//     .then(console.log)
//     .catch(console.log)

// }
