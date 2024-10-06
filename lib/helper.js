const fs = require("fs");
const path = require("path");

/**
 * Membaca data dari file dan mengembalikannya.
 * Jika file tidak ada, akan membuat file baru dengan data awal yang diberikan.
 *
 * @param {string} filename - Nama file yang akan dibaca.
 * @param {Object} [data={}] - Data awal yang akan digunakan jika file tidak ditemukan.
 * @returns {Object|string} Data yang dibaca dari file.
 *                         Jika file adalah JSON, maka akan dikembalikan sebagai objek.
 */
function read(filename, data) {
    try {
        data = fs.readFileSync(filename, { encoding: "utf8" });
        if (/\.json/.test(filename)) {
            data = JSON.parse(data);
        }
    } catch (error) {
        write(filename, data);
    }
    return data;
}

/**
 * Menyimpan data ke dalam file.
 * Jika direktori untuk file tidak ada, akan membuat direktori tersebut secara rekursif.
 *
 * @param {string} filename - Nama file tempat data akan disimpan.
 * @param {Object|string} data - Data yang akan disimpan ke file.
 */
function write(filename, data) {
    const dirname = path.dirname(filename);
    try {
        fs.readdirSync(dirname);
    } catch (error) {
        fs.mkdirSync(dirname, { recursive: true });
    }
    if (/\.json/.test(filename)) {
        data = JSON.stringify(data, null, 4);
    }
    fs.writeFileSync(filename, data);
}

module.exports = { read, write };

// {
//     const data=read('./data/data.json')
//     console.log(data)
// }

// {
//     const data=read('./data/data.json')
//     console.log(data)
//     data.name='value'
//     write('./data/data.json',data)
// }
