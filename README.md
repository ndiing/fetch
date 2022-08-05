<a name="module_fetch"></a>

## fetch
Nodejs fetch module### Install```npm install @ndiing/fetch```


* [fetch](#module_fetch)
    * [~Headers](#module_fetch..Headers)
        * [new Headers(init)](#new_module_fetch..Headers_new)
    * [~Request](#module_fetch..Request)
        * [new Request(input, options)](#new_module_fetch..Request_new)
    * [~Response](#module_fetch..Response)
        * [new Response(body, options)](#new_module_fetch..Response_new)
        * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>Array</code>
        * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
        * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>
    * [~fetch(resource, options)](#module_fetch..fetch) ⇒ <code>Promise</code>

<a name="module_fetch..Headers"></a>

### fetch~Headers
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
<a name="new_module_fetch..Headers_new"></a>

#### new Headers(init)

| Param | Type | Description |
| --- | --- | --- |
| init | <code>Object</code> | - |

<a name="module_fetch..Request"></a>

### fetch~Request
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  
<a name="new_module_fetch..Request_new"></a>

#### new Request(input, options)

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> | - |
| options | <code>Object</code> | - |
| options.method | <code>String</code> | - |
| options.body | <code>String</code> | - |
| options.agent | <code>Object</code> | - |
| options.hostname | <code>String</code> | - |
| options.insecureHTTPParser | <code>Boolean</code> | - |
| options.path | <code>String</code> | - |
| options.port | <code>Number</code> | - |
| options.protocol | <code>String</code> | - |
| options.headers | <code>Object</code> | - |

<a name="module_fetch..Response"></a>

### fetch~Response
**Kind**: inner class of [<code>fetch</code>](#module_fetch)  

* [~Response](#module_fetch..Response)
    * [new Response(body, options)](#new_module_fetch..Response_new)
    * [.arrayBuffer()](#module_fetch..Response+arrayBuffer) ⇒ <code>Array</code>
    * [.json()](#module_fetch..Response+json) ⇒ <code>Object</code>
    * [.text()](#module_fetch..Response+text) ⇒ <code>String</code>

<a name="new_module_fetch..Response_new"></a>

#### new Response(body, options)

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Array</code> | - |
| options | <code>Object</code> | - |

<a name="module_fetch..Response+arrayBuffer"></a>

#### response.arrayBuffer() ⇒ <code>Array</code>
Returns a promise that resolves with an ArrayBuffer representation of the response body.

**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+json"></a>

#### response.json() ⇒ <code>Object</code>
Returns a promise that resolves with the result of parsing the response body text as JSON.

**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..Response+text"></a>

#### response.text() ⇒ <code>String</code>
Returns a promise that resolves with a text representation of the response body.

**Kind**: instance method of [<code>Response</code>](#module_fetch..Response)  
<a name="module_fetch..fetch"></a>

### fetch~fetch(resource, options) ⇒ <code>Promise</code>
fetching resources

**Kind**: inner method of [<code>fetch</code>](#module_fetch)  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>String</code> | - |
| options | <code>Object</code> | - |
| options.method | <code>String</code> | - |
| options.body | <code>String</code> | - |
| options.agent | <code>Object</code> | - |
| options.hostname | <code>String</code> | - |
| options.insecureHTTPParser | <code>Boolean</code> | - |
| options.path | <code>String</code> | - |
| options.port | <code>Number</code> | - |
| options.protocol | <code>String</code> | - |
| options.headers | <code>Object</code> | - |

