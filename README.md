<a name="module_fetch"></a>

## fetch
### Install```npm install @ndiing/fetch```### Usage```js// jsonfetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json()).then(console.log)// textfetch("https://jsonplaceholder.typicode.com").then(res=>res.text()).then(console.log)// End-to-end compressionfetch("https://jsonplaceholder.typicode.com/posts",{    headers:{        'Accept-Encoding': 'gzip, deflate, br',    }}).then(res=>res.json()).then(console.log)// Redirections in HTTPfetch("https://jsonplaceholder.typicode.com/guide",{    redirect:'manual',//follow}).then(res=>res.text()).then(console.log)// Request.credentialsfetch("https://mitra.tokopedia.com/").then(res=>res.text()).then(console.log)```


* [fetch](#module_fetch)
    * [~URLSearchParams2](#module_fetch..URLSearchParams2)
        * [new URLSearchParams2(init)](#new_module_fetch..URLSearchParams2_new)
        * [.append(name, value)](#module_fetch..URLSearchParams2+append)
        * [.delete(name)](#module_fetch..URLSearchParams2+delete)
        * [.entries()](#module_fetch..URLSearchParams2+entries) ⇒ <code>Array</code>
        * [.forEach(callback)](#module_fetch..URLSearchParams2+forEach)
        * [.get(name)](#module_fetch..URLSearchParams2+get) ⇒ <code>String</code>
        * [.getAll(name)](#module_fetch..URLSearchParams2+getAll) ⇒ <code>String/Array</code>
        * [.has(name)](#module_fetch..URLSearchParams2+has) ⇒ <code>Boolean</code>
        * [.keys()](#module_fetch..URLSearchParams2+keys) ⇒ <code>Array</code>
        * [.set(name, value)](#module_fetch..URLSearchParams2+set)
        * [.toString()](#module_fetch..URLSearchParams2+toString) ⇒ <code>String</code>
        * [.values()](#module_fetch..URLSearchParams2+values) ⇒ <code>Array</code>
    * [~URL2](#module_fetch..URL2)
        * [.toString()](#module_fetch..URL2+toString) ⇒ <code>String</code>
    * [~Headers](#module_fetch..Headers)
        * [new Headers(init)](#new_module_fetch..Headers_new)
        * [.append(name, value)](#module_fetch..Headers+append)
        * [.delete(name)](#module_fetch..Headers+delete)
        * [.entries()](#module_fetch..Headers+entries) ⇒ <code>Array</code>
        * [.get(name)](#module_fetch..Headers+get) ⇒ <code>String/Array</code>
        * [.has(name)](#module_fetch..Headers+has) ⇒ <code>Boolean</code>
        * [.keys()](#module_fetch..Headers+keys) ⇒ <code>Array</code>
        * [.set(name, value)](#module_fetch..Headers+set)
        * [.values()](#module_fetch..Headers+values) ⇒ <code>Array</code>
        * [.toString()](#module_fetch..Headers+toString) ⇒ <code>String</code>
    * [~Request](#module_fetch..Request)
    * [~Response](#module_fetch..Response)
        * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>arrayBuffer</code>
        * [.blob()](#module_fetch..Response+blob) ⇒ <code>blob</code>
        * [.json()](#module_fetch..Response+json) ⇒ <code>json</code>
        * [.redirect(url, status)](#module_fetch..Response+redirect) ⇒ <code>Response</code>
        * [.text()](#module_fetch..Response+text) ⇒ <code>text</code>
    * [~fetch()](#module_fetch..fetch)

<a name="module_fetch..URLSearchParams2"></a>

### fetch~URLSearchParams2
### Examples```js// Parse full URLvar searchParams=new URLSearchParams2('https://www.google.com/search?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')console.log(searchParams)// Parse with /pathvar searchParams=new URLSearchParams2('/search?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')console.log(searchParams)// Parse URL.searchvar searchParams=new URLSearchParams2('?q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')console.log(searchParams)// Parse queryvar searchParams=new URLSearchParams2('q=URLSearchParams&oq=URLSearchParams&aqs=chrome.0.69i59j0i512l4j69i60l3.24886j0j7&sourceid=chrome&ie=UTF-8#URLSearchParams')console.log(searchParams)// Output are the same// URLSearchParams2 will remove before/prefix `?` and after `#`// URLSearchParams2 {//     q: 'URLSearchParams',//     oq: 'URLSearchParams',//     aqs: 'chrome.0.69i59j0i512l4j69i60l3.24886j0j7',//     sourceid: 'chrome',//     ie: 'UTF-8'// }```

**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~URLSearchParams2](#module_fetch..URLSearchParams2)
    * [new URLSearchParams2(init)](#new_module_fetch..URLSearchParams2_new)
    * [.append(name, value)](#module_fetch..URLSearchParams2+append)
    * [.delete(name)](#module_fetch..URLSearchParams2+delete)
    * [.entries()](#module_fetch..URLSearchParams2+entries) ⇒ <code>Array</code>
    * [.forEach(callback)](#module_fetch..URLSearchParams2+forEach)
    * [.get(name)](#module_fetch..URLSearchParams2+get) ⇒ <code>String</code>
    * [.getAll(name)](#module_fetch..URLSearchParams2+getAll) ⇒ <code>String/Array</code>
    * [.has(name)](#module_fetch..URLSearchParams2+has) ⇒ <code>Boolean</code>
    * [.keys()](#module_fetch..URLSearchParams2+keys) ⇒ <code>Array</code>
    * [.set(name, value)](#module_fetch..URLSearchParams2+set)
    * [.toString()](#module_fetch..URLSearchParams2+toString) ⇒ <code>String</code>
    * [.values()](#module_fetch..URLSearchParams2+values) ⇒ <code>Array</code>

<a name="new_module_fetch..URLSearchParams2_new"></a>

#### new URLSearchParams2(init)

| Param | Type |
| --- | --- |
| init | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+append"></a>

#### urlSearchParams2.append(name, value)
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+delete"></a>

#### urlSearchParams2.delete(name)
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+entries"></a>

#### urlSearchParams2.entries() ⇒ <code>Array</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  
<a name="module_fetch..URLSearchParams2+forEach"></a>

#### urlSearchParams2.forEach(callback)
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| callback | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+get"></a>

#### urlSearchParams2.get(name) ⇒ <code>String</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+getAll"></a>

#### urlSearchParams2.getAll(name) ⇒ <code>String/Array</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+has"></a>

#### urlSearchParams2.has(name) ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+keys"></a>

#### urlSearchParams2.keys() ⇒ <code>Array</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  
<a name="module_fetch..URLSearchParams2+set"></a>

#### urlSearchParams2.set(name, value)
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="module_fetch..URLSearchParams2+toString"></a>

#### urlSearchParams2.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  
<a name="module_fetch..URLSearchParams2+values"></a>

#### urlSearchParams2.values() ⇒ <code>Array</code>
**Kind**: instance method of [<code>URLSearchParams2</code>](#module_fetch..URLSearchParams2)  
<a name="module_fetch..URL2"></a>

### fetch~URL2
### Examples```js// Parse url with portvar url = new URL2('https://www.google.com:3000/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')console.log(url)// Parse urlvar url = new URL2('https://www.google.com/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')console.log(url)// Parse url without originvar url = new URL2('/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8')console.log(url)// Output will fallback to http://localhost// URL2 {//     href: 'http://localhost/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',//     protocol: 'http:',//     scheme: 'http',//     authority: '//localhost',//     origin: 'http://localhost',//     host: 'localhost',//     hostname: 'localhost',//     port: 80,//     pathname: '/search',//     search: '?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',//     query: 'q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8',//     searchParams: URLSearchParams2 {//         q: 'url',//         oq: 'URL',//         aqs: 'chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9',//         sourceid: 'chrome',//         ie: 'UTF-8'//     },//     hash: '',//     fragment: '',//     path: '/search?q=url&oq=URL&aqs=chrome.0.69i59i433i512j0i433i512j69i59j0i433i512j0i512j69i60l3.1752j0j9&sourceid=chrome&ie=UTF-8'// }```

**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| href | <code>string</code> | <code>&quot;http://localhost&quot;</code> | 
| protocol | <code>string</code> | <code>&quot;http:&quot;</code> | 
| scheme | <code>string</code> | <code>&quot;http&quot;</code> | 
| authority | <code>string</code> | <code>&quot;//localhost&quot;</code> | 
| origin | <code>string</code> | <code>&quot;http://localhost&quot;</code> | 
| host | <code>string</code> | <code>&quot;localhost&quot;</code> | 
| hostname | <code>string</code> | <code>&quot;localhost&quot;</code> | 
| port | <code>number</code> | <code>80</code> | 
| pathname | <code>string</code> | <code>&quot;/&quot;</code> | 
| search | <code>string</code> |  | 
| query | <code>string</code> |  | 
| searchParams | <code>object</code> |  | 
| hash | <code>string</code> |  | 
| fragment | <code>string</code> |  | 
| path | <code>string</code> | <code>&quot;/&quot;</code> | 

<a name="module_fetch..URL2+toString"></a>

#### urL2.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..Headers"></a>

### fetch~Headers
Headers

**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Headers](#module_fetch..Headers)
    * [new Headers(init)](#new_module_fetch..Headers_new)
    * [.append(name, value)](#module_fetch..Headers+append)
    * [.delete(name)](#module_fetch..Headers+delete)
    * [.entries()](#module_fetch..Headers+entries) ⇒ <code>Array</code>
    * [.get(name)](#module_fetch..Headers+get) ⇒ <code>String/Array</code>
    * [.has(name)](#module_fetch..Headers+has) ⇒ <code>Boolean</code>
    * [.keys()](#module_fetch..Headers+keys) ⇒ <code>Array</code>
    * [.set(name, value)](#module_fetch..Headers+set)
    * [.values()](#module_fetch..Headers+values) ⇒ <code>Array</code>
    * [.toString()](#module_fetch..Headers+toString) ⇒ <code>String</code>

<a name="new_module_fetch..Headers_new"></a>

#### new Headers(init)
The `Headers()` constructor creates a new `Headers` object.


| Param | Type | Description |
| --- | --- | --- |
| init | <code>object</code> | An object containing any HTTP headers that you want to pre-populate your Headers object with. This can be a simple object literal with String values, an array of name-value pairs, where each pair is a 2-element string array; or an existing Headers object. In the last case, the new Headers object copies its data from the existing Headers object. |

<a name="module_fetch..Headers+append"></a>

#### headers.append(name, value)
The `append()` method of the `Headers` interface appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the HTTP header you want to add to the `Headers` object. |
| value | <code>String</code> | The value of the HTTP header you want to add. |

<a name="module_fetch..Headers+delete"></a>

#### headers.delete(name)
The `delete()` method of the `Headers` interface deletes a header from the current `Headers` object.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..Headers+entries"></a>

#### headers.entries() ⇒ <code>Array</code>
The `Headers.entries()` method returns an `array` allowing to go through all key/value pairs contained in this object. The both the key and value of each pairs are `String` objects.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+get"></a>

#### headers.get(name) ⇒ <code>String/Array</code>
The `get()` method of the `Headers` interface returns a byte string of all the values of a header within a `Headers` object with a given name. If the requested header doesn't exist in the `Headers` object, it returns null.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the HTTP header whose values you want to retrieve from the Headers object. If the given name is not the name of an HTTP header, this method throws a TypeError. The name is case-insensitive. |

<a name="module_fetch..Headers+has"></a>

#### headers.has(name) ⇒ <code>Boolean</code>
The `has()` method of the `Headers` interface returns a boolean stating whether a `Headers` object contains a certain header.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..Headers+keys"></a>

#### headers.keys() ⇒ <code>Array</code>
The `Headers.keys()` method returns an `array` allowing to go through all keys contained in this object. The keys are `String` objects.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+set"></a>

#### headers.set(name, value)
The `set()` method of the `Headers` interface sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the HTTP header you want to set to a new value. If the given name is not the name of an HTTP header, this method throws a TypeError. |
| value | <code>String</code> | The new value you want to set. |

<a name="module_fetch..Headers+values"></a>

#### headers.values() ⇒ <code>Array</code>
The `Headers.values()` method returns an `array` allowing to go through all values contained in this object. The values are `String` objects.

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+toString"></a>

#### headers.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Request"></a>

### fetch~Request
The `Request` interface of the `Fetch API` represents a resource request.```js// Default options.headers{    Host: `${this.input.host}`,    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",    Accept: "*\/*",    "Accept-Language": "*",    "Accept-Encoding": "*",    "Cache-Control": "max-age=0"}```

**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>String</code> |  | Defines the resource that you wish to fetch. |
| options | <code>Object</code> |  | An object containing any custom settings that you want to apply to the request. |
| options.body | <code>String</code> |  | Any `body` that you want to add to your request: this can be a `Blob`, an `ArrayBuffer`, a `TypedArray`, a `DataView`, a `FormData`, a `URLSearchParams`, a `string`, or a ReadableStream object. Note that a request using the `GET` or `HEAD` method cannot have a `body`. |
| options.bodyUsed | <code>String</code> |  |  |
| options.cache | <code>String</code> |  | default, reload, no-cache |
| options.credentials | <code>String</code> | <code>same-origin</code> | The request credentials you want to use for the request: `omit`, `same-origin`, or `include`. The default is `same-origin`. |
| options.destination | <code>String</code> |  |  |
| options.headers | <code>String</code> |  | Any headers you want to add to your request, contained within a Headers object or an object literal with String values. |
| options.integrity | <code>String</code> |  |  |
| options.method | <code>String</code> | <code>GET</code> | The request method, e.g., `GET`, `POST`. The default is `GET`. |
| options.mode | <code>String</code> | <code>cors</code> |  |
| options.priority | <code>String</code> |  |  |
| options.redirect | <code>String</code> | <code>follow</code> | The redirect mode to use: `follow`, `error`, or `manual`. The default is `follow`. |
| options.referrer | <code>String</code> |  |  |
| options.referrerPolicy | <code>String</code> |  |  |
| options.url | <code>String</code> |  |  |
| options.agent | <code>String</code> |  | Controls Agent behavior. |
| options.hostname | <code>String</code> |  | Alias for host. To support url.parse(), hostname will be used if both host and hostname are specified. |
| options.insecureHTTPParser | <code>String</code> | <code>true</code> | Use an insecure HTTP parser that accepts invalid HTTP headers when true. Using the insecure parser should be avoided. See --insecure-http-parser for more information. Default: false |
| options.path | <code>String</code> |  | Request path. Should include query string if any. E.G. '/index.html?page=12'. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future. Default: '/'. |
| options.port | <code>String</code> |  | Port of remote server. Default: defaultPort if set, else 80. |
| options.protocol | <code>String</code> |  | Protocol to use. Default: 'http:'. |
| options.timeout | <code>String</code> |  | A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected. |

<a name="module_fetch..Response"></a>

### fetch~Response
Response

**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type |
| --- | --- |
| body | <code>String</code> | 
| bodyUsed | <code>String</code> | 
| headers | <code>String</code> | 
| redirected | <code>String</code> | 
| status | <code>String</code> | 
| statusText | <code>String</code> | 
| ok | <code>String</code> | 
| type | <code>String</code> | 
| url | <code>String</code> | 


* [~Response](#module_fetch..Response)
    * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>arrayBuffer</code>
    * [.blob()](#module_fetch..Response+blob) ⇒ <code>blob</code>
    * [.json()](#module_fetch..Response+json) ⇒ <code>json</code>
    * [.redirect(url, status)](#module_fetch..Response+redirect) ⇒ <code>Response</code>
    * [.text()](#module_fetch..Response+text) ⇒ <code>text</code>

<a name="module_fetch..Response+arrayBuffer"></a>

#### response.arrayBuffer() ⇒ <code>arrayBuffer</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+blob"></a>

#### response.blob() ⇒ <code>blob</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+json"></a>

#### response.json() ⇒ <code>json</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+redirect"></a>

#### response.redirect(url, status) ⇒ <code>Response</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  

| Param | Type |
| --- | --- |
| url | <code>\*</code> | 
| status | <code>\*</code> | 

<a name="module_fetch..Response+text"></a>

#### response.text() ⇒ <code>text</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..fetch"></a>

### fetch~fetch()
The `Request` interface of the `Fetch API` represents a resource request.```js// Default options.headers{    Host: `${this.input.host}`,    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",    Accept: "*\/*",    "Accept-Language": "*",    "Accept-Encoding": "*",    "Cache-Control": "max-age=0"}```

**Kind**: inner method of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| resource | <code>String</code> |  | Defines the resource that you wish to fetch. |
| options | <code>Object</code> |  | An object containing any custom settings that you want to apply to the request. |
| options.body | <code>String</code> |  | Any `body` that you want to add to your request: this can be a `Blob`, an `ArrayBuffer`, a `TypedArray`, a `DataView`, a `FormData`, a `URLSearchParams`, a `string`, or a ReadableStream object. Note that a request using the `GET` or `HEAD` method cannot have a `body`. |
| options.bodyUsed | <code>String</code> |  |  |
| options.cache | <code>String</code> |  | default, reload, no-cache |
| options.credentials | <code>String</code> | <code>same-origin</code> | The request credentials you want to use for the request: `omit`, `same-origin`, or `include`. The default is `same-origin`. |
| options.destination | <code>String</code> |  |  |
| options.headers | <code>String</code> |  | Any headers you want to add to your request, contained within a Headers object or an object literal with String values. |
| options.integrity | <code>String</code> |  |  |
| options.method | <code>String</code> | <code>GET</code> | The request method, e.g., `GET`, `POST`. The default is `GET`. |
| options.mode | <code>String</code> | <code>cors</code> |  |
| options.priority | <code>String</code> |  |  |
| options.redirect | <code>String</code> | <code>follow</code> | The redirect mode to use: `follow`, `error`, or `manual`. The default is `follow`. |
| options.referrer | <code>String</code> |  |  |
| options.referrerPolicy | <code>String</code> |  |  |
| options.url | <code>String</code> |  |  |
| options.agent | <code>String</code> |  | Controls Agent behavior. |
| options.hostname | <code>String</code> |  | Alias for host. To support url.parse(), hostname will be used if both host and hostname are specified. |
| options.insecureHTTPParser | <code>String</code> | <code>true</code> | Use an insecure HTTP parser that accepts invalid HTTP headers when true. Using the insecure parser should be avoided. See --insecure-http-parser for more information. Default: false |
| options.path | <code>String</code> |  | Request path. Should include query string if any. E.G. '/index.html?page=12'. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future. Default: '/'. |
| options.port | <code>String</code> |  | Port of remote server. Default: defaultPort if set, else 80. |
| options.protocol | <code>String</code> |  | Protocol to use. Default: 'http:'. |
| options.timeout | <code>String</code> |  | A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected. |

