function normalizeCookie(name, value) {
    let object = name;
    if (typeof name !== "object") {
        object = { name, value };
    }
    return object;
}

const COOKIE_ATTRIBUTES_REGEXP = /^(Domain|Expires|HttpOnly|Max-Age|Partitioned|Path|Secure|SameSite)$/i;

/**
 * Kelas untuk mengelola penyimpanan cookie sebagai objek.
 */
class CookieStore {
    /**
     * Mengambil semua cookie yang disimpan dalam format string yang sesuai dengan format HTTP.
     *
     * @returns {string} Daftar cookie dalam format "key=value", dipisahkan dengan "; ".
     */
    get cookie() {
        const array = [];
        for (const [, { name, value }] of Object.entries(this)) {
            array.push([name, value].join("="));
        }
        return array.join("; ");
    }

    /**
     * Menyimpan cookie dari string atau array yang sesuai dengan format HTTP.
     *
     * @param {string|string[]} value - Nilai string atau array yang berisi cookie dalam format "key=value".
     */
    set cookie(value) {
        let array = value;
        if (!Array.isArray(array)) {
            array = [array];
        }
        for (const string of array) {
            for (const [, name, value] of string.matchAll(/([^= ]+)=([^;]+)/g)) {
                if (COOKIE_ATTRIBUTES_REGEXP.test(name)) {
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
     * Konstruktor untuk membuat instance `CookieStore` dengan inisialisasi data.
     *
     * @param {Object} [init] - Objek inisialisasi yang berisi nama cookie dan opsinya.
     */
    constructor(init) {
        if (typeof init === "object") {
            for (const name in init) {
                const options = init[name];
                this.set(options);
            }
        }
    }

    /**
     * Menghapus cookie berdasarkan nama.
     *
     * @param {string} name - Nama cookie yang akan dihapus.
     */
    delete(name) {
        let options = normalizeCookie(name);
        delete this[options.name];
    }

    /**
     * Mengambil nilai cookie berdasarkan nama.
     *
     * @param {string} name - Nama cookie yang akan diambil.
     * @returns {Object} Objek cookie yang ditemukan atau undefined jika tidak ada.
     */
    get(name) {
        let options = normalizeCookie(name);
        return this[options.name];
    }

    /**
     * Mengambil semua nilai cookie yang cocok dengan nama tertentu.
     *
     * @param {string} name - Nama cookie yang akan diambil.
     * @returns {Array} Array nilai cookie yang cocok.
     */
    getAll(name) {
        let options = normalizeCookie(name);
        return [].concat(this[options.name]).filter(Boolean);
    }

    /**
     * Menyimpan cookie dengan nama dan nilai yang diberikan.
     *
     * @param {string} name - Nama cookie.
     * @param {string} value - Nilai cookie.
     */
    set(name, value) {
        let options = normalizeCookie(name, value);
        this[options.name] = options;
    }
}

CookieStore.normalizeCookie = normalizeCookie;

module.exports = CookieStore;

// {
//     const cookieStore=new CookieStore()

//     cookieStore.cookie='name=value'
//     console.log(cookieStore.cookie)

//     cookieStore.cookie=[
//         'name=value',
//         'name2=value2',
//         'name3=value3',
//     ]
//     console.log(cookieStore.cookie)

//     cookieStore.set('name','value')
//     console.log(cookieStore.get('name'))
//     cookieStore.delete('name')
//     console.log(cookieStore.get('name'))
// }
