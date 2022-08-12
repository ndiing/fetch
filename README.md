<a name="module_fetch"></a>

## fetch
### Install```npm install @ndiing/fetch```


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
        * [new URL2(url, base)](#new_module_fetch..URL2_new)
        * [.href](#module_fetch..URL2+href) : <code>String</code>
        * [.protocol](#module_fetch..URL2+protocol) : <code>String</code>
        * [.scheme](#module_fetch..URL2+scheme) : <code>String</code>
        * [.authority](#module_fetch..URL2+authority) : <code>String</code>
        * [.origin](#module_fetch..URL2+origin) : <code>String</code>
        * [.host](#module_fetch..URL2+host) : <code>String</code>
        * [.hostname](#module_fetch..URL2+hostname) : <code>String</code>
        * [.port](#module_fetch..URL2+port) : <code>Number</code>
        * [.pathname](#module_fetch..URL2+pathname) : <code>String</code>
        * [.search](#module_fetch..URL2+search) : <code>String</code>
        * [.searchParams](#module_fetch..URL2+searchParams) : <code>Object</code>
        * [.query](#module_fetch..URL2+query) : <code>String</code>
        * [.hash](#module_fetch..URL2+hash) : <code>String</code>
        * [.fragment](#module_fetch..URL2+fragment) : <code>String</code>
        * [.path](#module_fetch..URL2+path) : <code>String</code>
    * [~Headers](#module_fetch..Headers)
        * [new Headers(init)](#new_module_fetch..Headers_new)
        * [.append(name, value)](#module_fetch..Headers+append)
        * [.delete(name)](#module_fetch..Headers+delete)
        * [.entries()](#module_fetch..Headers+entries) ⇒ <code>Array</code>
        * [.get(name)](#module_fetch..Headers+get) ⇒ <code>String</code>
        * [.has(name)](#module_fetch..Headers+has) ⇒ <code>Boolean</code>
        * [.keys()](#module_fetch..Headers+keys) ⇒ <code>Array</code>
        * [.set(name)](#module_fetch..Headers+set)
        * [.values()](#module_fetch..Headers+values) ⇒ <code>Array</code>
    * [~Request](#module_fetch..Request)
        * [.credentials](#module_fetch..Request+credentials) : <code>String</code>
        * [.headers](#module_fetch..Request+headers) : <code>Object</code>
        * [.method](#module_fetch..Request+method) : <code>String</code>
        * [.redirect](#module_fetch..Request+redirect) : <code>String</code>
        * [.url](#module_fetch..Request+url) : <code>String</code>
        * [.keepalive](#module_fetch..Request+keepalive) : <code>Undefined</code>
        * [.agent](#module_fetch..Request+agent) : <code>Undefined</code>
        * [.hostname](#module_fetch..Request+hostname) : <code>String</code>
        * [.insecureHTTPParser](#module_fetch..Request+insecureHTTPParser) : <code>Boolean</code>
        * [.path](#module_fetch..Request+path) : <code>String</code>
        * [.port](#module_fetch..Request+port) : <code>Number</code>
        * [.protocol](#module_fetch..Request+protocol) : <code>String</code>
        * [.timeout](#module_fetch..Request+timeout) : <code>Undefined</code>
        * [.body](#module_fetch..Request+body) : <code>Object</code>
    * [~Response](#module_fetch..Response)
        * [.bodyUsed](#module_fetch..Response+bodyUsed) : <code>Undefined</code>
        * [.headers](#module_fetch..Response+headers) : <code>Object</code>
        * [.redirected](#module_fetch..Response+redirected) : <code>Undefined</code>
        * [.status](#module_fetch..Response+status) : <code>Number</code>
        * [.statusText](#module_fetch..Response+statusText) : <code>String</code>
        * [.ok](#module_fetch..Response+ok) : <code>Boolean</code>
        * [.type](#module_fetch..Response+type) : <code>String</code>
        * [.url](#module_fetch..Response+url) : <code>Undefined</code>
        * [.body](#module_fetch..Response+body) : <code>Object</code>
        * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>ArrayBuffer</code>
        * [.blob()](#module_fetch..Response+blob) ⇒ <code>Blob</code>
        * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
        * [.redirect(url, status)](#module_fetch..Response+redirect) ⇒ <code>Stream</code>
        * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>
    * [~fetch(resource, options)](#module_fetch..fetch) ⇒ <code>Promise</code>

<a name="module_fetch..URLSearchParams2"></a>

### fetch~URLSearchParams2
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
URLSearchParams!=URLSearchParams2URLSearchParams > IteratorURLSearchParams2 > Object


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
| callback | <code>function</code> | 

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
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~URL2](#module_fetch..URL2)
    * [new URL2(url, base)](#new_module_fetch..URL2_new)
    * [.href](#module_fetch..URL2+href) : <code>String</code>
    * [.protocol](#module_fetch..URL2+protocol) : <code>String</code>
    * [.scheme](#module_fetch..URL2+scheme) : <code>String</code>
    * [.authority](#module_fetch..URL2+authority) : <code>String</code>
    * [.origin](#module_fetch..URL2+origin) : <code>String</code>
    * [.host](#module_fetch..URL2+host) : <code>String</code>
    * [.hostname](#module_fetch..URL2+hostname) : <code>String</code>
    * [.port](#module_fetch..URL2+port) : <code>Number</code>
    * [.pathname](#module_fetch..URL2+pathname) : <code>String</code>
    * [.search](#module_fetch..URL2+search) : <code>String</code>
    * [.searchParams](#module_fetch..URL2+searchParams) : <code>Object</code>
    * [.query](#module_fetch..URL2+query) : <code>String</code>
    * [.hash](#module_fetch..URL2+hash) : <code>String</code>
    * [.fragment](#module_fetch..URL2+fragment) : <code>String</code>
    * [.path](#module_fetch..URL2+path) : <code>String</code>

<a name="new_module_fetch..URL2_new"></a>

#### new URL2(url, base)
URL!=URL2URL > AbsoluteURL2 > Relative


| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| base | <code>String</code> | 

<a name="module_fetch..URL2+href"></a>

#### urL2.href : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+protocol"></a>

#### urL2.protocol : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+scheme"></a>

#### urL2.scheme : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+authority"></a>

#### urL2.authority : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+origin"></a>

#### urL2.origin : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+host"></a>

#### urL2.host : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+hostname"></a>

#### urL2.hostname : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+port"></a>

#### urL2.port : <code>Number</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+pathname"></a>

#### urL2.pathname : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+search"></a>

#### urL2.search : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+searchParams"></a>

#### urL2.searchParams : <code>Object</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+query"></a>

#### urL2.query : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+hash"></a>

#### urL2.hash : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+fragment"></a>

#### urL2.fragment : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..URL2+path"></a>

#### urL2.path : <code>String</code>
**Kind**: instance property of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..Headers"></a>

### fetch~Headers
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Headers](#module_fetch..Headers)
    * [new Headers(init)](#new_module_fetch..Headers_new)
    * [.append(name, value)](#module_fetch..Headers+append)
    * [.delete(name)](#module_fetch..Headers+delete)
    * [.entries()](#module_fetch..Headers+entries) ⇒ <code>Array</code>
    * [.get(name)](#module_fetch..Headers+get) ⇒ <code>String</code>
    * [.has(name)](#module_fetch..Headers+has) ⇒ <code>Boolean</code>
    * [.keys()](#module_fetch..Headers+keys) ⇒ <code>Array</code>
    * [.set(name)](#module_fetch..Headers+set)
    * [.values()](#module_fetch..Headers+values) ⇒ <code>Array</code>

<a name="new_module_fetch..Headers_new"></a>

#### new Headers(init)

| Param | Type |
| --- | --- |
| init | <code>Object</code> | 

<a name="module_fetch..Headers+append"></a>

#### headers.append(name, value)
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="module_fetch..Headers+delete"></a>

#### headers.delete(name)
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..Headers+entries"></a>

#### headers.entries() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+get"></a>

#### headers.get(name) ⇒ <code>String</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..Headers+has"></a>

#### headers.has(name) ⇒ <code>Boolean</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..Headers+keys"></a>

#### headers.keys() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+set"></a>

#### headers.set(name)
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="module_fetch..Headers+values"></a>

#### headers.values() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Request"></a>

### fetch~Request
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Request](#module_fetch..Request)
    * [.credentials](#module_fetch..Request+credentials) : <code>String</code>
    * [.headers](#module_fetch..Request+headers) : <code>Object</code>
    * [.method](#module_fetch..Request+method) : <code>String</code>
    * [.redirect](#module_fetch..Request+redirect) : <code>String</code>
    * [.url](#module_fetch..Request+url) : <code>String</code>
    * [.keepalive](#module_fetch..Request+keepalive) : <code>Undefined</code>
    * [.agent](#module_fetch..Request+agent) : <code>Undefined</code>
    * [.hostname](#module_fetch..Request+hostname) : <code>String</code>
    * [.insecureHTTPParser](#module_fetch..Request+insecureHTTPParser) : <code>Boolean</code>
    * [.path](#module_fetch..Request+path) : <code>String</code>
    * [.port](#module_fetch..Request+port) : <code>Number</code>
    * [.protocol](#module_fetch..Request+protocol) : <code>String</code>
    * [.timeout](#module_fetch..Request+timeout) : <code>Undefined</code>
    * [.body](#module_fetch..Request+body) : <code>Object</code>

<a name="module_fetch..Request+credentials"></a>

#### request.credentials : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+headers"></a>

#### request.headers : <code>Object</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+method"></a>

#### request.method : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+redirect"></a>

#### request.redirect : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+url"></a>

#### request.url : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+keepalive"></a>

#### request.keepalive : <code>Undefined</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+agent"></a>

#### request.agent : <code>Undefined</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+hostname"></a>

#### request.hostname : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+insecureHTTPParser"></a>

#### request.insecureHTTPParser : <code>Boolean</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+path"></a>

#### request.path : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+port"></a>

#### request.port : <code>Number</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+protocol"></a>

#### request.protocol : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+timeout"></a>

#### request.timeout : <code>Undefined</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+body"></a>

#### request.body : <code>Object</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Response"></a>

### fetch~Response
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Response](#module_fetch..Response)
    * [.bodyUsed](#module_fetch..Response+bodyUsed) : <code>Undefined</code>
    * [.headers](#module_fetch..Response+headers) : <code>Object</code>
    * [.redirected](#module_fetch..Response+redirected) : <code>Undefined</code>
    * [.status](#module_fetch..Response+status) : <code>Number</code>
    * [.statusText](#module_fetch..Response+statusText) : <code>String</code>
    * [.ok](#module_fetch..Response+ok) : <code>Boolean</code>
    * [.type](#module_fetch..Response+type) : <code>String</code>
    * [.url](#module_fetch..Response+url) : <code>Undefined</code>
    * [.body](#module_fetch..Response+body) : <code>Object</code>
    * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>ArrayBuffer</code>
    * [.blob()](#module_fetch..Response+blob) ⇒ <code>Blob</code>
    * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
    * [.redirect(url, status)](#module_fetch..Response+redirect) ⇒ <code>Stream</code>
    * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>

<a name="module_fetch..Response+bodyUsed"></a>

#### response.bodyUsed : <code>Undefined</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+headers"></a>

#### response.headers : <code>Object</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+redirected"></a>

#### response.redirected : <code>Undefined</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+status"></a>

#### response.status : <code>Number</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+statusText"></a>

#### response.statusText : <code>String</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+ok"></a>

#### response.ok : <code>Boolean</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+type"></a>

#### response.type : <code>String</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+url"></a>

#### response.url : <code>Undefined</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+body"></a>

#### response.body : <code>Object</code>
**Kind**: instance property of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+arrayBuffer"></a>

#### response.arrayBuffer() ⇒ <code>ArrayBuffer</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+blob"></a>

#### response.blob() ⇒ <code>Blob</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+json"></a>

#### response.json() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+redirect"></a>

#### response.redirect(url, status) ⇒ <code>Stream</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| status | <code>Number</code> | 

<a name="module_fetch..Response+text"></a>

#### response.text() ⇒ <code>String</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..fetch"></a>

### fetch~fetch(resource, options) ⇒ <code>Promise</code>
**Kind**: inner method of [<code>fetch</code>](#module_fetch)  

| Param | Type |
| --- | --- |
| resource | <code>String/Request</code> | 
| options | <code>Object</code> | 

