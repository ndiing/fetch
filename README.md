## Classes

<dl>
<dt><a href="#URLSearchParams2">URLSearchParams2</a></dt>
<dd></dd>
<dt><a href="#URL2">URL2</a></dt>
<dd></dd>
<dt><a href="#Headers">Headers</a></dt>
<dd></dd>
<dt><a href="#Request">Request</a></dt>
<dd></dd>
<dt><a href="#Response">Response</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#HTTP_HEADERS">HTTP_HEADERS</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#fetch">fetch(resource, options)</a> ⇒ <code>Promise/Response</code></dt>
<dd></dd>
</dl>

<a name="URLSearchParams2"></a>

## URLSearchParams2
**Kind**: global class  

* [URLSearchParams2](#URLSearchParams2)
    * [.append()](#URLSearchParams2+append)
    * [.delete()](#URLSearchParams2+delete)
    * [.entries()](#URLSearchParams2+entries)
    * [.forEach()](#URLSearchParams2+forEach)
    * [.get()](#URLSearchParams2+get)
    * [.getAll()](#URLSearchParams2+getAll)
    * [.has()](#URLSearchParams2+has)
    * [.keys()](#URLSearchParams2+keys)
    * [.set()](#URLSearchParams2+set)
    * [.toString()](#URLSearchParams2+toString)
    * [.values()](#URLSearchParams2+values)

<a name="URLSearchParams2+append"></a>

### urlSearchParams2.append()
Create/Adding value by name

**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+delete"></a>

### urlSearchParams2.delete()
Delete item by name

**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+entries"></a>

### urlSearchParams2.entries()
Get all

**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+forEach"></a>

### urlSearchParams2.forEach()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+get"></a>

### urlSearchParams2.get()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+getAll"></a>

### urlSearchParams2.getAll()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+has"></a>

### urlSearchParams2.has()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+keys"></a>

### urlSearchParams2.keys()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+set"></a>

### urlSearchParams2.set()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+toString"></a>

### urlSearchParams2.toString()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URLSearchParams2+values"></a>

### urlSearchParams2.values()
**Kind**: instance method of [<code>URLSearchParams2</code>](#URLSearchParams2)  
<a name="URL2"></a>

## URL2
**Kind**: global class  
<a name="URL2+toString"></a>

### urL2.toString()
**Kind**: instance method of [<code>URL2</code>](#URL2)  
<a name="Headers"></a>

## Headers
**Kind**: global class  

* [Headers](#Headers)
    * [.append()](#Headers+append)
    * [.delete()](#Headers+delete)
    * [.entries()](#Headers+entries)
    * [.get()](#Headers+get)
    * [.has()](#Headers+has)
    * [.keys()](#Headers+keys)
    * [.set()](#Headers+set)
    * [.values()](#Headers+values)

<a name="Headers+append"></a>

### headers.append()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+delete"></a>

### headers.delete()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+entries"></a>

### headers.entries()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+get"></a>

### headers.get()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+has"></a>

### headers.has()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+keys"></a>

### headers.keys()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+set"></a>

### headers.set()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+values"></a>

### headers.values()
**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Request"></a>

## Request
**Kind**: global class  
<a name="Response"></a>

## Response
**Kind**: global class  

* [Response](#Response)
    * [.read()](#Response+read)
    * [.arrayBuffer()](#Response+arrayBuffer)
    * [.blob()](#Response+blob)
    * [.json()](#Response+json)
    * [.redirect()](#Response+redirect)
    * [.text()](#Response+text)

<a name="Response+read"></a>

### response.read()
**Kind**: instance method of [<code>Response</code>](#Response)  
<a name="Response+arrayBuffer"></a>

### response.arrayBuffer()
**Kind**: instance method of [<code>Response</code>](#Response)  
<a name="Response+blob"></a>

### response.blob()
**Kind**: instance method of [<code>Response</code>](#Response)  
<a name="Response+json"></a>

### response.json()
**Kind**: instance method of [<code>Response</code>](#Response)  
<a name="Response+redirect"></a>

### response.redirect()
**Kind**: instance method of [<code>Response</code>](#Response)  
<a name="Response+text"></a>

### response.text()
**Kind**: instance method of [<code>Response</code>](#Response)  
<a name="HTTP_HEADERS"></a>

## HTTP\_HEADERS
**Kind**: global constant  
<a name="fetch"></a>

## fetch(resource, options) ⇒ <code>Promise/Response</code>
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resource | <code>String/Request</code> |  | resource |
| options | <code>Object</code> |  | options |
| options.body | <code>String</code> |  | body |
| options.credentials | <code>String</code> | <code>same-origin</code> | credentials |
| options.headers | <code>String</code> | <code>{}</code> | headers |
| options.method | <code>String</code> | <code>GET</code> | method |
| options.redirect | <code>String</code> | <code>follow</code> | redirect |
| options.agent | <code>String</code> |  | agent |
| options.hostname | <code>String</code> | <code>localhost</code> | hostname |
| options.insecureHTTPParser | <code>Boolean</code> | <code>true</code> | insecureHTTPParser |
| options.path | <code>String</code> | <code>/</code> | path |
| options.port | <code>Number</code> | <code>80</code> | port |
| options.protocol | <code>String</code> | <code>http:</code> | protocol |
| options.timeout | <code>String</code> | <code>3600000</code> | timeout |

