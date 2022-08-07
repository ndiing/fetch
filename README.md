<a name="module_fetch"></a>

## fetch
Nodejs fetch module### Install```npm install @ndiing/fetch```

**See**: [./examples/fetch.js](./examples/fetch.js)  

* [fetch](#module_fetch)
    * [~Headers](#module_fetch..Headers)
        * [new Headers(init)](#new_module_fetch..Headers_new)
        * [.append(name, value)](#module_fetch..Headers+append)
        * [.delete(name)](#module_fetch..Headers+delete)
        * [.entries()](#module_fetch..Headers+entries) ⇒ <code>Array</code>
        * [.get(name)](#module_fetch..Headers+get) ⇒ <code>Any</code>
        * [.has(name)](#module_fetch..Headers+has) ⇒ <code>Boolean</code>
        * [.keys()](#module_fetch..Headers+keys) ⇒ <code>Array</code>
        * [.set(name, value)](#module_fetch..Headers+set)
        * [.values()](#module_fetch..Headers+values) ⇒ <code>Array</code>
    * [~Request](#module_fetch..Request)
        * [.method](#module_fetch..Request+method) : <code>String</code>
        * [.url](#module_fetch..Request+url) : <code>URL</code>
        * [.headers](#module_fetch..Request+headers) : <code>Object</code>
        * [.agent](#module_fetch..Request+agent) : <code>Any</code>
        * [.hostname](#module_fetch..Request+hostname) : <code>String</code>
        * [.insecureHTTPParser](#module_fetch..Request+insecureHTTPParser) : <code>Boolean</code>
        * [.path](#module_fetch..Request+path) : <code>String</code>
        * [.port](#module_fetch..Request+port) : <code>Number</code>
        * [.protocol](#module_fetch..Request+protocol) : <code>String</code>
        * [.timeout](#module_fetch..Request+timeout) : <code>Number</code>
    * [~Response](#module_fetch..Response)
        * [new Response(body, options)](#new_module_fetch..Response_new)
        * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>Buffer</code>
        * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
        * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>
    * [~fetch(resource, options)](#module_fetch..fetch) ⇒ <code>Promise</code>

<a name="module_fetch..Headers"></a>

### fetch~Headers
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Headers](#module_fetch..Headers)
    * [new Headers(init)](#new_module_fetch..Headers_new)
    * [.append(name, value)](#module_fetch..Headers+append)
    * [.delete(name)](#module_fetch..Headers+delete)
    * [.entries()](#module_fetch..Headers+entries) ⇒ <code>Array</code>
    * [.get(name)](#module_fetch..Headers+get) ⇒ <code>Any</code>
    * [.has(name)](#module_fetch..Headers+has) ⇒ <code>Boolean</code>
    * [.keys()](#module_fetch..Headers+keys) ⇒ <code>Array</code>
    * [.set(name, value)](#module_fetch..Headers+set)
    * [.values()](#module_fetch..Headers+values) ⇒ <code>Array</code>

<a name="new_module_fetch..Headers_new"></a>

#### new Headers(init)
Create headers


| Param | Type |
| --- | --- |
| init | <code>Any</code> | 

<a name="module_fetch..Headers+append"></a>

#### headers.append(name, value)
Append value by name, if exists it's create an array of values

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>Any</code> | 
| value | <code>Any</code> | 

<a name="module_fetch..Headers+delete"></a>

#### headers.delete(name)
Delete headers by name

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>Any</code> | 

<a name="module_fetch..Headers+entries"></a>

#### headers.entries() ⇒ <code>Array</code>
Get array of [name,value]

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+get"></a>

#### headers.get(name) ⇒ <code>Any</code>
Get headers by name

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>Any</code> | 

<a name="module_fetch..Headers+has"></a>

#### headers.has(name) ⇒ <code>Boolean</code>
Check headers name exists

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>Any</code> | 

<a name="module_fetch..Headers+keys"></a>

#### headers.keys() ⇒ <code>Array</code>
Get array of headers names

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Headers+set"></a>

#### headers.set(name, value)
Set value by name

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  

| Param | Type |
| --- | --- |
| name | <code>Any</code> | 
| value | <code>Any</code> | 

<a name="module_fetch..Headers+values"></a>

#### headers.values() ⇒ <code>Array</code>
Get Array of heades value

**Kind**: instance method of [<code>Headers</code>](#module_fetch..Headers)  
<a name="module_fetch..Request"></a>

### fetch~Request
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Request](#module_fetch..Request)
    * [.method](#module_fetch..Request+method) : <code>String</code>
    * [.url](#module_fetch..Request+url) : <code>URL</code>
    * [.headers](#module_fetch..Request+headers) : <code>Object</code>
    * [.agent](#module_fetch..Request+agent) : <code>Any</code>
    * [.hostname](#module_fetch..Request+hostname) : <code>String</code>
    * [.insecureHTTPParser](#module_fetch..Request+insecureHTTPParser) : <code>Boolean</code>
    * [.path](#module_fetch..Request+path) : <code>String</code>
    * [.port](#module_fetch..Request+port) : <code>Number</code>
    * [.protocol](#module_fetch..Request+protocol) : <code>String</code>
    * [.timeout](#module_fetch..Request+timeout) : <code>Number</code>

<a name="module_fetch..Request+method"></a>

#### request.method : <code>String</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+url"></a>

#### request.url : <code>URL</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+headers"></a>

#### request.headers : <code>Object</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Request+agent"></a>

#### request.agent : <code>Any</code>
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

#### request.timeout : <code>Number</code>
**Kind**: instance property of [<code>Request</code>](#module_fetch..Request)  
<a name="module_fetch..Response"></a>

### fetch~Response
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Response](#module_fetch..Response)
    * [new Response(body, options)](#new_module_fetch..Response_new)
    * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>Buffer</code>
    * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
    * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>

<a name="new_module_fetch..Response_new"></a>

#### new Response(body, options)

| Param | Type |
| --- | --- |
| body | <code>Array</code> | 
| options | <code>Object</code> | 

<a name="module_fetch..Response+arrayBuffer"></a>

#### response.arrayBuffer() ⇒ <code>Buffer</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+json"></a>

#### response.json() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+text"></a>

#### response.text() ⇒ <code>String</code>
**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..fetch"></a>

### fetch~fetch(resource, options) ⇒ <code>Promise</code>
**Kind**: inner method of [<code>fetch</code>](#module_fetch)  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>String</code> | - |
| options | <code>Object</code> | - |

