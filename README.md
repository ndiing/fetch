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
    * [~fetch(resource, options)](#module_fetch..fetch) ⇒ <code>Promise</code>

<a name="module_fetch..URLSearchParams2"></a>

### fetch~URLSearchParams2
URLSearchParams2

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
URL2

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

| Param | Type |
| --- | --- |
| init | <code>String</code> | 

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

#### headers.get(name) ⇒ <code>String/Array</code>
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

#### headers.set(name, value)
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>String</code> | 

<a name="module_fetch..Headers+values"></a>

#### headers.values() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+toString"></a>

#### headers.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Request"></a>

### fetch~Request
Requestoptions.headers```httphost: ${this.input.host}user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36accept: *\/*accept-language: *accept-encoding: *cache-control: max-age=0```

**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>String</code> |  |  |
| options | <code>Object</code> |  |  |
| options.body | <code>String</code> |  |  |
| options.bodyUsed | <code>String</code> |  |  |
| options.cache | <code>String</code> |  | default, reload, no-cache |
| options.credentials | <code>String</code> | <code>same-origin</code> | omit, same-origin, include |
| options.destination | <code>String</code> |  |  |
| options.headers | <code>String</code> |  |  |
| options.integrity | <code>String</code> |  |  |
| options.method | <code>String</code> | <code>GET</code> |  |
| options.mode | <code>String</code> | <code>cors</code> | cors, no-cors, same-origin, navigate |
| options.priority | <code>String</code> |  |  |
| options.redirect | <code>String</code> | <code>follow</code> | follow, error, or manual |
| options.referrer | <code>String</code> |  |  |
| options.referrerPolicy | <code>String</code> |  |  |
| options.url | <code>String</code> |  |  |
| options.agent | <code>String</code> |  |  |
| options.hostname | <code>String</code> |  |  |
| options.insecureHTTPParser | <code>String</code> | <code>true</code> |  |
| options.path | <code>String</code> |  |  |
| options.port | <code>String</code> |  |  |
| options.protocol | <code>String</code> |  |  |
| options.timeout | <code>String</code> |  |  |

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

### fetch~fetch(resource, options) ⇒ <code>Promise</code>
**Kind**: inner method of [<code>fetch</code>](#module_fetch)  

| Param | Type |
| --- | --- |
| resource | <code>String</code> | 
| options | <code>Object</code> | 

