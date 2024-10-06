/**
 * Kelas untuk mengawasi perubahan pada objek dan menjalankan callback saat terjadi perubahan.
 */
class ObjectObserver {
    /**
     * Konstruktor untuk membuat instance `ObjectObserver`.
     *
     * @param {Object} [target={}] - Objek yang akan diawasi.
     * @param {function} [callback=() => {}] - Fungsi callback yang akan dipanggil saat perubahan terjadi.
     */
    constructor(target = {}, callback = () => {}) {
        this.target = target;
        this.callback = callback;
        return new Proxy(this.target, this);
    }

    /**
     * Mendapatkan nilai properti dari objek yang diawasi.
     *
     * @param {Object} target - Objek yang diawasi.
     * @param {string} property - Nama properti yang ingin diambil.
     * @returns {*} Nilai dari properti yang diambil.
     */
    get(target, property) {
        if (["[object Object]", "[object Array]"].includes(toString.call(target[property]))) {
            return new Proxy(target[property], this);
        }
        return target[property];
    }

    /**
     * Mengatur nilai properti dari objek yang diawasi.
     *
     * @param {Object} target - Objek yang diawasi.
     * @param {string} property - Nama properti yang akan diatur.
     * @param {*} value - Nilai baru untuk properti tersebut.
     * @returns {boolean} True jika pengaturan berhasil.
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
     * Menghapus properti dari objek yang diawasi.
     *
     * @param {Object} target - Objek yang diawasi.
     * @param {string} property - Nama properti yang akan dihapus.
     * @returns {boolean} True jika penghapusan berhasil.
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

module.exports = ObjectObserver;

// {
//     const objectObserver = new ObjectObserver({},console.log)

//     objectObserver.name='value'
//     objectObserver.obj={}
//     objectObserver.obj.name='value'
// }
