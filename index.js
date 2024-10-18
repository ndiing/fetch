const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const sqlite3 = require("sqlite3").verbose();
const { ProxyAgent } = require("undici");

/**
 * Class untuk mengelola cookies dalam format key-value.
 */
class CookieStore {
    /**
     * Membuat instance CookieStore.
     * @param {Object} [init] - Object inisialisasi dengan key-value pasangan cookie.
     */
    constructor(init) {
        if (typeof init === "object") {
            for (const name in init) {
                const cookie = init[name];

                this.set(cookie);
            }
        }
    }

    /**
     * Getter untuk mengembalikan semua cookies sebagai string dalam format header "Cookie".
     * @returns {string} - String cookies yang diurutkan dalam format "name=value; name2=value2".
     */
    get cookie() {
        const array = [];

        for (const [, { name, value }] of Object.entries(this)) {
            array.push([name, value].join("="));
        }

        return array.join("; ");
    }

    /**
     * Setter untuk mengatur cookies menggunakan string atau array string dalam format "name=value".
     * @param {string|string[]} value - String atau array string untuk mengatur cookies.
     */
    set cookie(value) {
        if (typeof value === "string") {
            value = [value];
        }

        for (const string of value) {
            for (const [, name, value] of string.matchAll(/([^=\s]+)=([^;]+)/g)) {
                if (/^(Expires|Max-Age|Domain|Path|Secure|HttpOnly|SameSite)$/i.test(name)) {
                    continue;
                }

                if (value) {
                    this.set(name, value);
                } else {
                    this.delete(name);
                }
            }
        }
    }

    /**
     * Menghapus cookie dengan nama tertentu.
     * @param {string|Object} name - Nama cookie yang akan dihapus.
     */
    delete(name) {
        let cookie = name;
        if (typeof cookie !== "object") {
            cookie = { name };
        }

        delete this[cookie.name];
    }

    /**
     * Mengambil nilai dari cookie dengan nama tertentu.
     * @param {string|Object} name - Nama cookie yang ingin diambil.
     * @returns {*} - Nilai dari cookie yang sesuai dengan nama yang diberikan.
     */
    get(name) {
        let cookie = name;
        if (typeof cookie !== "object") {
            cookie = { name };
        }

        return this[cookie.name];
    }

    /**
     * Mengambil semua cookie yang sesuai dengan nama tertentu.
     * @param {string|Object} name - Nama cookie yang ingin diambil.
     * @returns {Array} - Array berisi semua cookie yang sesuai dengan nama tersebut.
     */
    getAll(name) {
        let cookie = name;
        if (typeof cookie !== "object") {
            cookie = { name };
        }

        return [].concat(this[cookie.name]).filter(Boolean);
    }

    /**
     * Menambahkan atau memperbarui cookie dengan nama dan nilai tertentu.
     * @param {string|Object} name - Nama atau object cookie yang akan disimpan.
     * @param {string} [value] - Nilai cookie, jika parameter pertama adalah string.
     */
    set(name, value) {
        let cookie = name;
        if (typeof cookie !== "object") {
            cookie = { name, value };
        }

        this[cookie.name] = cookie;
    }
}

// CookieStore
// const cookieStore = new CookieStore()
// cookieStore.set('name1','value1')
// cookieStore.set('name2','value2')
// cookieStore.set('name3','value3')
// cookieStore.delete('name3')
// console.log(cookieStore.get('name2'))
// console.log(cookieStore.getAll('name2'))
// console.log(cookieStore)
// cookieStore.cookie='name1=value1; name2=value2'
// cookieStore.cookie=[
//     'name3=value3',
//     'name4=value4',
// ]
// console.log(cookieStore.cookie)

/**
 * Class untuk mengelola penyimpanan data sederhana menggunakan SQLite.
 */
class Storage {
    /**
     * Membuat instance Storage dan menginisialisasi database.
     * @param {string} [tablename="storage"] - Nama tabel yang digunakan untuk menyimpan data.
     */
    constructor(tablename = "storage") {
        this.tablename = tablename;
        const filename = path.join(process.cwd(), "data", "database.db");
        const dirname = path.dirname(filename);

        try {
            fs.readdirSync(dirname);
        } catch (error) {
            fs.mkdirSync(dirname, { recursive: true });
        }

        this.db = new sqlite3.Database(filename);

        this.db.run = promisify(this.db.run).bind(this.db);
        this.db.get = promisify(this.db.get).bind(this.db);
        this.db.all = promisify(this.db.all).bind(this.db);

        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS ${this.tablename} (
                    _id TEXT PRIMARY KEY,
                    value TEXT
                )
            `);
        });
    }

    /**
     * Menyimpan dokumen baru ke database.
     * @param {Object} doc - Dokumen yang akan disimpan, harus memiliki properti `_id`.
     * @throws {Error} - Jika dokumen tidak memiliki `_id` atau terjadi kesalahan saat menyimpan.
     */
    async post(doc) {
        if (!doc._id) {
            throw new Error("Document must have an '_id'");
        }
        const value = JSON.stringify(doc);
        const sql = `INSERT INTO ${this.tablename} (_id, value) VALUES (?, ?)`;

        try {
            await this.db.run(sql, [doc._id, value]);
        } catch (error) {
            throw new Error(`Error posting document: ${error.message}`);
        }
    }

    /**
     * Mengambil dokumen berdasarkan `_id`.
     * @param {string} _id - ID dokumen yang akan diambil.
     * @returns {Object|null} - Dokumen yang ditemukan atau `null` jika tidak ada.
     * @throws {Error} - Jika terjadi kesalahan saat mengambil dokumen.
     */
    async get(_id) {
        const sql = `SELECT * FROM ${this.tablename} WHERE _id = ?`;

        try {
            const row = await this.db.get(sql, [_id]);
            return row ? JSON.parse(row.value) : null;
        } catch (error) {
            throw new Error(`Error getting document with _id ${_id}: ${error.message}`);
        }
    }

    /**
     * Mengambil semua dokumen yang ada di database.
     * @returns {Object[]} - Array dokumen yang ditemukan.
     * @throws {Error} - Jika terjadi kesalahan saat mengambil dokumen.
     */
    async getAll() {
        const sql = `SELECT * FROM ${this.tablename}`;

        try {
            const rows = await this.db.all(sql);
            return rows.map((row) => JSON.parse(row.value));
        } catch (error) {
            throw new Error(`Error getting all documents: ${error.message}`);
        }
    }

    /**
     * Memperbarui atau menambahkan dokumen ke database.
     * @param {Object} doc - Dokumen yang akan diperbarui, harus memiliki properti `_id`.
     * @throws {Error} - Jika dokumen tidak memiliki `_id` atau terjadi kesalahan saat menyimpan.
     */
    async put(doc) {
        if (!doc._id) {
            throw new Error("Document must have an '_id' to be updated or inserted");
        }

        const value = JSON.stringify(doc);
        const sql = `INSERT OR REPLACE INTO ${this.tablename} (_id, value) VALUES (?, ?)`;

        try {
            await this.db.run(sql, [doc._id, value]);
        } catch (error) {
            throw new Error(`Error putting document with _id ${doc._id}: ${error.message}`);
        }
    }

    /**
     * Menghapus dokumen dari database berdasarkan `_id`.
     * @param {string} _id - ID dokumen yang akan dihapus.
     * @throws {Error} - Jika terjadi kesalahan saat menghapus dokumen.
     */
    async delete(_id) {
        const sql = `DELETE FROM ${this.tablename} WHERE _id = ?`;

        try {
            await this.db.run(sql, [_id]);
        } catch (error) {
            throw new Error(`Error deleting document with _id ${_id}: ${error.message}`);
        }
    }
}

// (async () => {
//     const storage = new Storage();

//     try {
//         // await storage.post({ _id: "123", name: "Ridho", age: 30 });
//         // await storage.post({ _id: "456", name: "Andi", age: 25 });

//         const doc = await storage.get("123");
//         console.log(doc);

//         const allDocs = await storage.getAll();
//         console.log(allDocs);

//         await storage.put({ _id: "123", name: "Ridho", age: 31 });

//         await storage.delete("456");
//     } catch (error) {
//         console.error(error.message);
//     }
// })();

/**
 * Class Store yang mengawasi perubahan pada objek target.
 * Menggunakan Proxy untuk menangani operasi get, set, dan delete.
 */
class Store {
    /**
     * Membuat instance Store dan menginisialisasi proxy.
     * @param {Object} target - Objek yang akan dipantau.
     * @param {Function} [callback=() => {}] - Fungsi yang akan dipanggil ketika terjadi perubahan pada target.
     */
    constructor(target, callback = () => {}) {
        this.target = target;
        this.callback = callback;

        return new Proxy(this.target, this);
    }

    /**
     * Mengambil properti dari objek target.
     * @param {Object} target - Objek yang dipantau.
     * @param {string} property - Nama properti yang diambil.
     * @returns {*} - Nilai dari properti yang diambil.
     */
    get(target, property) {
        if (typeof target[property] === "object" && target[property] !== null) {
            return new Proxy(target[property], this);
        }

        return target[property];
    }

    /**
     * Mengatur nilai untuk properti pada objek target.
     * @param {Object} target - Objek yang dipantau.
     * @param {string} property - Nama properti yang diatur.
     * @param {*} value - Nilai baru untuk properti.
     * @returns {boolean} - Mengembalikan true jika operasi berhasil.
     */
    set(target, property, value) {
        const oldValue = target[property];

        if (oldValue === value) {
            return true;
        }

        Reflect.set(target, property, value);

        this.callback(this.target);

        return true;
    }

    /**
     * Menghapus properti dari objek target.
     * @param {Object} target - Objek yang dipantau.
     * @param {string} property - Nama properti yang dihapus.
     * @returns {boolean} - Mengembalikan true jika operasi berhasil.
     */
    deleteProperty(target, property) {
        const oldValue = target[property];

        if (oldValue === undefined) {
            return true;
        }

        Reflect.deleteProperty(target, property);

        this.callback(this.target);

        return true;
    }
}

// Store
// const store = new Store({},console.log)
// store.string='string'
// store.boolean = true
// store.number=1
// store.array=[]
// store.array.push('1')
// store.array.push('2')
// store.array.push('3')
// store.object={}
// store.object.name='value'

/**
 * Membuat instance Store dan CookieStore.
 * Jika data dengan _id yang diberikan tidak ada, akan menggunakan objek kosong sebagai target.
 * Menyimpan perubahan ke Storage ketika ada perubahan pada Store.
 *
 * @param {string} [_id="google/default"] - ID unik untuk dokumen yang disimpan.
 *                                          Secara default adalah "google/default".
 * @returns {Promise<Store>} - Mengembalikan Promise yang menyelesaikan dengan instance Store.
 */
async function create(_id = "google/default") {
    const storage = new Storage("storage");
    const target = (await storage.get(_id)) || {};
    target.cookieStore = new CookieStore(target.cookieStore);
    const store = new Store(target, (doc) => {
        doc._id = _id;
        storage.put(doc);
    });
    return store;
}

// (async () => {
//     const store = await create('google/default')
//     // store.name='value'
//     console.log(store)
// })()

/**
 * Melakukan permintaan HTTP dengan opsi tambahan seperti parameter URL, query string, dan pengaturan cookie.
 *
 * @param {string} resource - URL sumber daya yang ingin diambil.
 * @param {Object} [options={}] - Opsi tambahan untuk permintaan.
 * @param {Object} [options.params] - Parameter yang akan disisipkan ke dalam URL.
 * @param {Object} [options.query] - Parameter query yang akan ditambahkan ke URL.
 * @param {string} [options.credentials="same-origin"] - Mengatur kebijakan pengiriman kredensial (e.g., "omit", "same-origin").
 * @param {Store} [options.store] - Instance Store untuk menyimpan dan mengelola cookie.
 * @returns {Promise<Response>} - Mengembalikan Promise yang menyelesaikan dengan Response dari permintaan.
 */
async function fetch(resource, options = {}) {
    const {
        //
        params,
        query,
        credentials = "same-origin",
        store,
    } = options;

    if (params) {
        resource = resource.replace(/:(\w+)/g, ($, name) => {
            return params[name] || "";
        });
    }

    resource = new URL(resource);

    if (query) {
        for (const name in query) {
            const value = query[name];
            resource.searchParams.set(name, value);
        }
    }

    resource = resource.toString();

    if (!options.headers) {
        options.headers = {};
    }

    // credentials
    if (credentials !== "omit" && store) {
        const cookie = store.cookieStore.cookie;
        if (cookie) {
            options.headers.Cookie = cookie;
        }
    }

    if (process.env.HTTP_PROXY) {
        const dispatcher = new ProxyAgent(process.env.HTTP_PROXY);
        options.dispatcher = dispatcher;
    }

    const response = await global.fetch(resource, options);

    // credentials
    const setCookie = response.headers.getSetCookie();
    // console.log(setCookie)
    if (credentials !== "omit" && setCookie.length && store) {
        store.cookieStore.cookie = setCookie;
    }

    return response;
}

fetch.CookieStore = CookieStore;
fetch.Storage = Storage;
fetch.Store = Store;
fetch.create = create;

module.exports = fetch;

// (async () => {

//     const store = await create('google/default')

// // fetch('https://www.google.com/:name',{
// //     store,
// //     params:{name:'search'},
// //     query:{
// //         q: 'block',
// //         oq: 'block',
// //         gs_lcrp: 'EgZjaHJvbWUyDwgAEEUYORiDARixAxiABDINCAEQABiDARixAxiABDIHCAIQABiABDIQCAMQLhiDARjUAhixAxiABDIQCAQQLhiDARjUAhixAxiABDIKCAUQABixAxiABDIGCAYQBRhAMgYIBxBFGDzSAQgxNzAxajBqNKgCALACAQ',
// //         sourceid: 'chrome',
// //         ie: 'UTF-8'
// //     }
// // })

// console.log(store)

// })()
