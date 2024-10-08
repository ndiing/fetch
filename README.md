## Classes

<dl>
<dt><a href="#CookieStore">CookieStore</a></dt>
<dd><p>Kelas untuk mengelola penyimpanan cookie sebagai objek.</p>
</dd>
<dt><a href="#Headers">Headers</a></dt>
<dd><p>Kelas untuk mengelola header HTTP sebagai objek.</p>
</dd>
<dt><a href="#ObjectObserver">ObjectObserver</a></dt>
<dd><p>Kelas untuk mengawasi perubahan pada objek dan menjalankan callback saat terjadi perubahan.</p>
</dd>
<dt><a href="#Request">Request</a></dt>
<dd><p>Kelas untuk membuat dan mengelola permintaan HTTP/HTTPS.</p>
</dd>
<dt><a href="#Response">Response</a></dt>
<dd><p>Kelas untuk menangani respons dari permintaan HTTP/HTTPS.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getProxyServer">getProxyServer()</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Mengambil alamat server proxy dari pengaturan Internet di Windows.</p>
</dd>
<dt><a href="#createStore">createStore(filename)</a> ⇒ <code>Object</code></dt>
<dd><p>Membuat dan mengembalikan objek penyimpanan yang terhubung dengan file.</p>
</dd>
<dt><a href="#fetch">fetch(resource, [options])</a> ⇒ <code><a href="#Response">Promise.&lt;Response&gt;</a></code></dt>
<dd><p>Melakukan permintaan HTTP dan mengembalikan responsnya sebagai Promise.</p>
</dd>
<dt><a href="#read">read(filename, [data])</a> ⇒ <code>Object</code> | <code>string</code></dt>
<dd><p>Membaca data dari file dan mengembalikannya.
Jika file tidak ada, akan membuat file baru dengan data awal yang diberikan.</p>
</dd>
<dt><a href="#write">write(filename, data)</a></dt>
<dd><p>Menyimpan data ke dalam file.
Jika direktori untuk file tidak ada, akan membuat direktori tersebut secara rekursif.</p>
</dd>
</dl>

<a name="CookieStore"></a>

## CookieStore

Kelas untuk mengelola penyimpanan cookie sebagai objek.

**Kind**: global class

-   [CookieStore](#CookieStore)
    -   [new CookieStore([init])](#new_CookieStore_new)
    -   [.cookie](#CookieStore+cookie) ⇒ <code>string</code>
    -   [.cookie](#CookieStore+cookie)
    -   [.delete(name)](#CookieStore+delete)
    -   [.get(name)](#CookieStore+get) ⇒ <code>Object</code>
    -   [.getAll(name)](#CookieStore+getAll) ⇒ <code>Array</code>
    -   [.set(name, value)](#CookieStore+set)

<a name="new_CookieStore_new"></a>

### new CookieStore([init])

Konstruktor untuk membuat instance `CookieStore` dengan inisialisasi data.

| Param  | Type                | Description                                             |
| ------ | ------------------- | ------------------------------------------------------- |
| [init] | <code>Object</code> | Objek inisialisasi yang berisi nama cookie dan opsinya. |

<a name="CookieStore+cookie"></a>

### cookieStore.cookie ⇒ <code>string</code>

Mengambil semua cookie yang disimpan dalam format string yang sesuai dengan format HTTP.

**Kind**: instance property of [<code>CookieStore</code>](#CookieStore)  
**Returns**: <code>string</code> - Daftar cookie dalam format "key=value", dipisahkan dengan "; ".  
<a name="CookieStore+cookie"></a>

### cookieStore.cookie

Menyimpan cookie dari string atau array yang sesuai dengan format HTTP.

**Kind**: instance property of [<code>CookieStore</code>](#CookieStore)

| Param | Type                                                     | Description                                                          |
| ----- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| value | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Nilai string atau array yang berisi cookie dalam format "key=value". |

<a name="CookieStore+delete"></a>

### cookieStore.delete(name)

Menghapus cookie berdasarkan nama.

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| name  | <code>string</code> | Nama cookie yang akan dihapus. |

<a name="CookieStore+get"></a>

### cookieStore.get(name) ⇒ <code>Object</code>

Mengambil nilai cookie berdasarkan nama.

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)  
**Returns**: <code>Object</code> - Objek cookie yang ditemukan atau undefined jika tidak ada.

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| name  | <code>string</code> | Nama cookie yang akan diambil. |

<a name="CookieStore+getAll"></a>

### cookieStore.getAll(name) ⇒ <code>Array</code>

Mengambil semua nilai cookie yang cocok dengan nama tertentu.

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)  
**Returns**: <code>Array</code> - Array nilai cookie yang cocok.

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| name  | <code>string</code> | Nama cookie yang akan diambil. |

<a name="CookieStore+set"></a>

### cookieStore.set(name, value)

Menyimpan cookie dengan nama dan nilai yang diberikan.

**Kind**: instance method of [<code>CookieStore</code>](#CookieStore)

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| name  | <code>string</code> | Nama cookie.  |
| value | <code>string</code> | Nilai cookie. |

<a name="Headers"></a>

## Headers

Kelas untuk mengelola header HTTP sebagai objek.

**Kind**: global class

-   [Headers](#Headers)
    -   [new Headers([init])](#new_Headers_new)
    -   [.append(name, value)](#Headers+append)
    -   [.delete(name)](#Headers+delete)
    -   [.entries()](#Headers+entries) ⇒ <code>IterableIterator</code>
    -   [.forEach(callbackFn)](#Headers+forEach)
    -   [.get(name)](#Headers+get) ⇒ <code>string</code> \| <code>null</code>
    -   [.getSetCookie()](#Headers+getSetCookie) ⇒ <code>Array</code>
    -   [.has(name)](#Headers+has) ⇒ <code>boolean</code>
    -   [.keys()](#Headers+keys) ⇒ <code>IterableIterator</code>
    -   [.set(name, value)](#Headers+set)
    -   [.values()](#Headers+values) ⇒ <code>IterableIterator</code>

<a name="new_Headers_new"></a>

### new Headers([init])

Konstruktor untuk membuat instance `Headers`.

| Param  | Type                                      | Description                                        |
| ------ | ----------------------------------------- | -------------------------------------------------- |
| [init] | <code>Object</code> \| <code>Array</code> | Inisialisasi header, bisa berupa objek atau array. |

<a name="Headers+append"></a>

### headers.append(name, value)

Menambahkan nilai baru ke header yang sudah ada, atau membuat header baru jika belum ada.

**Kind**: instance method of [<code>Headers</code>](#Headers)

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| name  | <code>string</code> | Nama header.  |
| value | <code>string</code> | Nilai header. |

<a name="Headers+delete"></a>

### headers.delete(name)

Menghapus header berdasarkan nama.

**Kind**: instance method of [<code>Headers</code>](#Headers)

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| name  | <code>string</code> | Nama header yang akan dihapus. |

<a name="Headers+entries"></a>

### headers.entries() ⇒ <code>IterableIterator</code>

Mengembalikan iterator untuk pasangan nama dan nilai dari header.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
**Returns**: <code>IterableIterator</code> - Iterator untuk entri header.  
<a name="Headers+forEach"></a>

### headers.forEach(callbackFn)

Menjalankan fungsi callback untuk setiap header.

**Kind**: instance method of [<code>Headers</code>](#Headers)

| Param      | Type                  | Description                                                   |
| ---------- | --------------------- | ------------------------------------------------------------- |
| callbackFn | <code>function</code> | Fungsi callback yang menerima nilai, nama, dan objek headers. |

<a name="Headers+get"></a>

### headers.get(name) ⇒ <code>string</code> \| <code>null</code>

Mengambil nilai dari header berdasarkan nama.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
**Returns**: <code>string</code> \| <code>null</code> - Nilai header atau null jika tidak ada.

| Param | Type                | Description                    |
| ----- | ------------------- | ------------------------------ |
| name  | <code>string</code> | Nama header yang akan diambil. |

<a name="Headers+getSetCookie"></a>

### headers.getSetCookie() ⇒ <code>Array</code>

Mengambil semua nilai dari header "Set-Cookie".

**Kind**: instance method of [<code>Headers</code>](#Headers)  
**Returns**: <code>Array</code> - Array nilai cookie yang diatur dalam header.  
<a name="Headers+has"></a>

### headers.has(name) ⇒ <code>boolean</code>

Memeriksa apakah header dengan nama tertentu ada.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
**Returns**: <code>boolean</code> - True jika header ada, false jika tidak.

| Param | Type                | Description                      |
| ----- | ------------------- | -------------------------------- |
| name  | <code>string</code> | Nama header yang akan diperiksa. |

<a name="Headers+keys"></a>

### headers.keys() ⇒ <code>IterableIterator</code>

Mengembalikan iterator untuk nama-nama header.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
**Returns**: <code>IterableIterator</code> - Iterator untuk nama header.  
<a name="Headers+set"></a>

### headers.set(name, value)

Mengatur atau mengganti nilai dari header berdasarkan nama.

**Kind**: instance method of [<code>Headers</code>](#Headers)

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| name  | <code>string</code> | Nama header.  |
| value | <code>string</code> | Nilai header. |

<a name="Headers+values"></a>

### headers.values() ⇒ <code>IterableIterator</code>

Mengembalikan iterator untuk nilai-nilai dari header.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
**Returns**: <code>IterableIterator</code> - Iterator untuk nilai header.  
<a name="ObjectObserver"></a>

## ObjectObserver

Kelas untuk mengawasi perubahan pada objek dan menjalankan callback saat terjadi perubahan.

**Kind**: global class

-   [ObjectObserver](#ObjectObserver)
    -   [new ObjectObserver([target], [callback])](#new_ObjectObserver_new)
    -   [.get(target, property)](#ObjectObserver+get) ⇒ <code>\*</code>
    -   [.set(target, property, value)](#ObjectObserver+set) ⇒ <code>boolean</code>
    -   [.deleteProperty(target, property)](#ObjectObserver+deleteProperty) ⇒ <code>boolean</code>

<a name="new_ObjectObserver_new"></a>

### new ObjectObserver([target], [callback])

Konstruktor untuk membuat instance `ObjectObserver`.

| Param      | Type                  | Default                       | Description                                                 |
| ---------- | --------------------- | ----------------------------- | ----------------------------------------------------------- |
| [target]   | <code>Object</code>   | <code>{}</code>               | Objek yang akan diawasi.                                    |
| [callback] | <code>function</code> | <code>() &#x3D;&gt; {}</code> | Fungsi callback yang akan dipanggil saat perubahan terjadi. |

<a name="ObjectObserver+get"></a>

### objectObserver.get(target, property) ⇒ <code>\*</code>

Mendapatkan nilai properti dari objek yang diawasi.

**Kind**: instance method of [<code>ObjectObserver</code>](#ObjectObserver)  
**Returns**: <code>\*</code> - Nilai dari properti yang diambil.

| Param    | Type                | Description                       |
| -------- | ------------------- | --------------------------------- |
| target   | <code>Object</code> | Objek yang diawasi.               |
| property | <code>string</code> | Nama properti yang ingin diambil. |

<a name="ObjectObserver+set"></a>

### objectObserver.set(target, property, value) ⇒ <code>boolean</code>

Mengatur nilai properti dari objek yang diawasi.

**Kind**: instance method of [<code>ObjectObserver</code>](#ObjectObserver)  
**Returns**: <code>boolean</code> - True jika pengaturan berhasil.

| Param    | Type                | Description                         |
| -------- | ------------------- | ----------------------------------- |
| target   | <code>Object</code> | Objek yang diawasi.                 |
| property | <code>string</code> | Nama properti yang akan diatur.     |
| value    | <code>\*</code>     | Nilai baru untuk properti tersebut. |

<a name="ObjectObserver+deleteProperty"></a>

### objectObserver.deleteProperty(target, property) ⇒ <code>boolean</code>

Menghapus properti dari objek yang diawasi.

**Kind**: instance method of [<code>ObjectObserver</code>](#ObjectObserver)  
**Returns**: <code>boolean</code> - True jika penghapusan berhasil.

| Param    | Type                | Description                      |
| -------- | ------------------- | -------------------------------- |
| target   | <code>Object</code> | Objek yang diawasi.              |
| property | <code>string</code> | Nama properti yang akan dihapus. |

<a name="Request"></a>

## Request

Kelas untuk membuat dan mengelola permintaan HTTP/HTTPS.

**Kind**: global class  
<a name="new_Request_new"></a>

### new Request(input, [options])

Konstruktor untuk membuat instance `Request`.

| Param                        | Type                                         | Default                                            | Description                                                 |
| ---------------------------- | -------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| input                        | <code>string</code>                          |                                                    | URL untuk permintaan.                                       |
| [options]                    | <code>Object</code>                          | <code>{}</code>                                    | Opsi untuk permintaan.                                      |
| [options.body]               | <code>string</code> \| <code>Readable</code> | <code>&quot;\&quot;\&quot;&quot;</code>            | Isi dari permintaan.                                        |
| [options.credentials]        | <code>string</code>                          | <code>&quot;\&quot;same-origin\&quot;&quot;</code> | Kredensial untuk permintaan (default: "same-origin").       |
| [options.headers]            | <code>Object</code>                          | <code>{}</code>                                    | Header untuk permintaan.                                    |
| [options.method]             | <code>string</code>                          | <code>&quot;\&quot;GET\&quot;&quot;</code>         | Metode HTTP yang digunakan (default: "GET").                |
| [options.redirect]           | <code>string</code>                          | <code>&quot;\&quot;follow\&quot;&quot;</code>      | Kebijakan pengalihan (default: "follow").                   |
| [options.follow]             | <code>number</code>                          | <code>30</code>                                    | Jumlah pengalihan yang diizinkan (default: 30).             |
| [options.agent]              | <code>Object</code>                          |                                                    | Agen untuk permintaan.                                      |
| [options.insecureHTTPParser] | <code>boolean</code>                         | <code>true</code>                                  | Parser HTTP yang tidak aman (default: true).                |
| [options.signal]             | <code>AbortSignal</code>                     |                                                    | Sinyal untuk membatalkan permintaan.                        |
| [options.timeout]            | <code>number</code>                          | <code>30000</code>                                 | Batas waktu permintaan dalam milidetik (default: 30 detik). |

<a name="Response"></a>

## Response

Kelas untuk menangani respons dari permintaan HTTP/HTTPS.

**Kind**: global class

-   [Response](#Response)
    -   [new Response(body, [options])](#new_Response_new)
    -   [.buffer()](#Response+buffer) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    -   [.json()](#Response+json) ⇒ <code>Promise.&lt;Object&gt;</code>
    -   [.text()](#Response+text) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="new_Response_new"></a>

### new Response(body, [options])

Konstruktor untuk membuat instance `Response`.

| Param                | Type                                               | Default         | Description                     |
| -------------------- | -------------------------------------------------- | --------------- | ------------------------------- |
| body                 | <code>ReadableStream</code> \| <code>string</code> |                 | Isi dari respons.               |
| [options]            | <code>Object</code>                                | <code>{}</code> | Opsi untuk respons.             |
| [options.status]     | <code>number</code>                                |                 | Kode status HTTP dari respons.  |
| [options.statusText] | <code>string</code>                                |                 | Pesan status HTTP dari respons. |
| [options.url]        | <code>string</code>                                |                 | URL dari respons.               |
| [options.headers]    | <code>Object</code>                                | <code>{}</code> | Header untuk respons.           |

<a name="Response+buffer"></a>

### response.buffer() ⇒ <code>Promise.&lt;Buffer&gt;</code>

Mengembalikan isi respons dalam bentuk Buffer.

**Kind**: instance method of [<code>Response</code>](#Response)  
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - - Isi dari respons sebagai Buffer.  
<a name="Response+json"></a>

### response.json() ⇒ <code>Promise.&lt;Object&gt;</code>

Mengembalikan isi respons dalam bentuk objek JSON.

**Kind**: instance method of [<code>Response</code>](#Response)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - - Isi dari respons sebagai objek JSON.  
<a name="Response+text"></a>

### response.text() ⇒ <code>Promise.&lt;string&gt;</code>

Mengembalikan isi respons dalam bentuk string.

**Kind**: instance method of [<code>Response</code>](#Response)  
**Returns**: <code>Promise.&lt;string&gt;</code> - - Isi dari respons sebagai string.  
<a name="getProxyServer"></a>

## getProxyServer() ⇒ <code>string</code> \| <code>null</code>

Mengambil alamat server proxy dari pengaturan Internet di Windows.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - Alamat server proxy dalam format string jika ditemukan,
atau null jika tidak ada pengaturan proxy.  
<a name="createStore"></a>

## createStore(filename) ⇒ <code>Object</code>

Membuat dan mengembalikan objek penyimpanan yang terhubung dengan file.

**Kind**: global function  
**Returns**: <code>Object</code> - Objek yang mengamati perubahan pada data penyimpanan
dan menulis kembali ke file saat terjadi perubahan.

| Param    | Type                | Description                                                          |
| -------- | ------------------- | -------------------------------------------------------------------- |
| filename | <code>string</code> | Nama file yang digunakan untuk membaca dan menulis data penyimpanan. |

<a name="fetch"></a>

## fetch(resource, [options]) ⇒ [<code>Promise.&lt;Response&gt;</code>](#Response)

Melakukan permintaan HTTP dan mengembalikan responsnya sebagai Promise.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;Response&gt;</code>](#Response) - Promise yang menyelesaikan respons HTTP setelah permintaan selesai.

| Param                 | Type                | Default         | Description                                                 |
| --------------------- | ------------------- | --------------- | ----------------------------------------------------------- |
| resource              | <code>string</code> |                 | URL sumber daya yang ingin diambil.                         |
| [options]             | <code>Object</code> | <code>{}</code> | Opsi untuk permintaan HTTP.                                 |
| [options.credentials] | <code>string</code> |                 | Mengontrol apakah cookie harus disertakan dalam permintaan. |
| [options.store]       | <code>Object</code> |                 | Objek penyimpanan yang berisi cookie dan data lainnya.      |

<a name="read"></a>

## read(filename, [data]) ⇒ <code>Object</code> \| <code>string</code>

Membaca data dari file dan mengembalikannya.
Jika file tidak ada, akan membuat file baru dengan data awal yang diberikan.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>string</code> - Data yang dibaca dari file.
Jika file adalah JSON, maka akan dikembalikan sebagai objek.

| Param    | Type                | Default         | Description                                              |
| -------- | ------------------- | --------------- | -------------------------------------------------------- |
| filename | <code>string</code> |                 | Nama file yang akan dibaca.                              |
| [data]   | <code>Object</code> | <code>{}</code> | Data awal yang akan digunakan jika file tidak ditemukan. |

<a name="write"></a>

## write(filename, data)

Menyimpan data ke dalam file.
Jika direktori untuk file tidak ada, akan membuat direktori tersebut secara rekursif.

**Kind**: global function

| Param    | Type                                       | Description                          |
| -------- | ------------------------------------------ | ------------------------------------ |
| filename | <code>string</code>                        | Nama file tempat data akan disimpan. |
| data     | <code>Object</code> \| <code>string</code> | Data yang akan disimpan ke file.     |
