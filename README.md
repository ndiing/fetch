# @ndiinginc/fetch

Wrapper tipis di atas [`undici`](https://github.com/nodejs/undici) yang menambahkan beberapa kemudahan umum saat memanggil HTTP API: path params (`:id`), query string otomatis, dukungan cookie jar, hook `beforeRequest`/`beforeResponse`, serta dukungan proxy lewat `HTTP_PROXY`.

## Instalasi

```bash
npm install @ndiinginc/fetch
```

> Package ini butuh `undici` sebagai dependency (pastikan sudah terpasang di `node_modules` proyekmu).

## Fitur

- **Path params** — ganti `:nama` di URL otomatis dari `options.params`.
- **Query string** — objek `options.query` otomatis di-append ke URL.
- **Cookie jar** — kirim/terima cookie lewat objek `options.cookie` (harus punya method `get(url)` dan `set(url, setCookieHeaders)`).
- **Hook lifecycle** — `beforeRequest` untuk memodifikasi request sebelum dikirim, `beforeResponse` untuk memproses response sebelum dikembalikan.
- **Proxy otomatis** — jika env var `HTTP_PROXY` di-set, semua request otomatis lewat proxy tersebut (TLS verification proxy di-nonaktifkan: `rejectUnauthorized: false`).
- **Redirect default `manual`** — beda dari fetch API standar yang defaultnya `follow`.

## Penggunaan Dasar

```js
const fetch = require("@ndiinginc/fetch");

const response = await fetch("https://api.example.com/users/:id", {
    params: { id: "123" },
    query: { active: true },
});

const data = await response.json();
```

Request di atas akan memanggil:

```
https://api.example.com/users/123?active=true
```

## Opsi (`Options`)

| Opsi          | Tipe                                | Default     | Keterangan                                                                 |
|---------------|--------------------------------------|-------------|-----------------------------------------------------------------------------|
| `params`      | `Object`                             | `{}`        | Mengganti placeholder `:nama` pada path URL.                               |
| `query`       | `Object`                             | `{}`        | Ditambahkan sebagai query string (`URLSearchParams`).                       |
| `beforeRequest` | `(resource, options) => Promise<{resource, options}>` | identity | Hook sebelum request dikirim, bisa memodifikasi URL/opsi.                  |
| `beforeResponse` | `(response) => Promise<response>` | identity   | Hook setelah response diterima, sebelum dikembalikan ke caller.             |
| `cookie`      | `{ get(url), set(url, setCookieHeaders) }` | -    | Cookie jar untuk kirim/simpan cookie otomatis.                              |
| `credentials` | `"omit" \| "same-origin" \| "include"` | `"include"` | Jika `"omit"`, cookie jar tidak dipakai sama sekali.                        |
| `headers`     | `Object`                             | `{}`        | Header request, diteruskan ke `Headers`.                                    |
| `redirect`    | `"follow" \| "error" \| "manual"`    | `"manual"`  | Perilaku terhadap redirect.                                                 |

Opsi lain di luar daftar di atas (`restOptions`) diteruskan langsung ke `undici.fetch`.

## Contoh dengan Cookie Jar

```js
const fetch = require("@ndiinginc/fetch");

const cookieJar = {
    async get(url) {
        // kembalikan string cookie untuk url tsb, atau undefined
    },
    async set(url, setCookieHeaders) {
        // simpan cookie baru dari response
    },
};

const response = await fetch("https://api.example.com/login", {
    method: "POST",
    cookie: cookieJar,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "foo", password: "bar" }),
});
```

## Contoh dengan `beforeRequest` / `beforeResponse`

```js
const response = await fetch("https://api.example.com/data", {
    beforeRequest: async (resource, options) => {
        options.headers.set("Authorization", `Bearer ${token}`);
        return { resource, options };
    },
    beforeResponse: async (response) => {
        if (!response.ok) {
            throw new Error(`Request gagal: ${response.status}`);
        }
        return response;
    },
});
```

## Dukungan Proxy

Set environment variable `HTTP_PROXY` sebelum menjalankan aplikasi:

```bash
HTTP_PROXY=http://127.0.0.1:8080 node app.js
```

Semua request yang dibuat lewat `fetch()` akan otomatis diteruskan melalui proxy tersebut, dengan verifikasi TLS proxy dimatikan (berguna untuk debugging via mitmproxy/Charles/Burp, dsb).

> ⚠️ `rejectUnauthorized: false` hanya untuk koneksi ke proxy — jangan dipakai di production tanpa pertimbangan keamanan.

## API

### `fetch(resource, options?)`

- **`resource`**: `string` — URL tujuan, bisa mengandung placeholder `:nama`.
- **`options`**: `Options & undici.RequestInit` — opsi seperti dijelaskan di atas, plus opsi bawaan `undici.fetch`.
- **Returns**: `Promise<undici.Response>`

## Lisensi

ISC / MIT (sesuaikan dengan `package.json` proyekmu).
