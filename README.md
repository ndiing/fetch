<a name="module_fetch"></a>

## fetch
### Install```npm install @ndiing/fetch```

**See**: ./test.js  

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
        * [new URL2(url)](#new_module_fetch..URL2_new)
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
    * [~Request](#module_fetch..Request)
        * [new Request(input, options)](#new_module_fetch..Request_new)
    * [~Response](#module_fetch..Response)
        * [new Response(body, options)](#new_module_fetch..Response_new)
        * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
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
| name | <code>\*</code> | 

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
    * [new URL2(url)](#new_module_fetch..URL2_new)
    * [.toString()](#module_fetch..URL2+toString) ⇒ <code>String</code>

<a name="new_module_fetch..URL2_new"></a>

#### new URL2(url)

| Param | Type |
| --- | --- |
| url | <code>String</code> | 

<a name="module_fetch..URL2+toString"></a>

#### urL2.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>URL2</code>](#module_fetch..URL2)  
<a name="module_fetch..Headers"></a>

### fetch~Headers
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
| value | <code>String/Array</code> | 

<a name="module_fetch..Headers+values"></a>

#### headers.values() ⇒ <code>Array</code>
**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Request"></a>

### fetch~Request
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| options.body | <code>String</code> |  |  |
| options.credentials | <code>String</code> | <code>include</code> | `omit`, `same-origin`, `include` |
| options.headers | <code>Object</code> |  |  |
| options.method | <code>String</code> |  |  |
| options.redirect | <code>String</code> | <code>follow</code> | `follow`, `error`, `manual` |
| options.keepalive | <code>Boolean</code> |  |  |
| options.url | <code>String</code> |  |  |
| options.protocol | <code>String</code> |  |  |
| options.hostname | <code>String</code> |  |  |
| options.port | <code>Number</code> |  |  |
| options.path | <code>String</code> |  |  |
| options.agent | <code>Object</code> |  |  |
| options.insecureHTTPParser | <code>Boolean</code> | <code>true</code> |  |
| options.timeout | <code>Number</code> | <code>60000</code> |  |

<a name="new_module_fetch..Request_new"></a>

#### new Request(input, options)

| Param | Type |
| --- | --- |
| input | <code>String</code> | 
| options | <code>Object</code> | 

<a name="module_fetch..Response"></a>

### fetch~Response
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
**Properties**

| Name | Type |
| --- | --- |
| options.body | <code>Stream</code> | 
| options.bodyUsed | <code>Boolean</code> | 
| options.headers | <code>Object</code> | 
| options.status | <code>Number</code> | 
| options.statusText | <code>String</code> | 
| options.ok | <code>Boolean</code> | 


* [~Response](#module_fetch..Response)
    * [new Response(body, options)](#new_module_fetch..Response_new)
    * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
    * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>

<a name="new_module_fetch..Response_new"></a>

#### new Response(body, options)

| Param | Type |
| --- | --- |
| body | <code>Stream</code> | 
| options | <code>Object</code> | 

<a name="module_fetch..Response+json"></a>

#### response.json() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+text"></a>

#### response.text() ⇒ <code>String</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..fetch"></a>

### fetch~fetch(resource, options) ⇒ <code>Promise</code>
**Kind**: inner method of [<code>fetch</code>](#module_fetch)  

| Param | Type |
| --- | --- |
| resource | <code>String</code> | 
| options | <code>Object</code> | 

