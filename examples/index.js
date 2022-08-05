const fetch = require("../index.js");
const { Storage } = require("../index.js");

fetch("https://mitra.tokopedia.com/")
.then((res) => res.text())
.then(console.log)
.catch(console.error);

// when set-cookies present in headers
// cookies stored in ./${userDataDir}/${hostname}/${profileDirector}.json
// in this case in ./data/mitra.tokopedia.com/default.json

// how to check data
// manage data using pool
const pool = Storage.get("mitra.tokopedia.com")
console.log(pool.localStorage.getItem('user'));
console.log(pool.cookieStore.get('_abck'));
console.log(pool.cookie);
