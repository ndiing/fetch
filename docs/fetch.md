## fetch()
_method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available._

### Syntax
```
fetch(resource,options)
```

### Parameters
<dl>
    <dt><code>resource</code></dt>
    <dd>A <code>String</code> This defines the resource that you wish to fetch, The default is <code></code></dd>
    <dt><code>options</code></dt>
    <dd>A <code>Object</code> An object containing any custom settings that you want to apply to the request, The default is <code></code></dd>
    <dt><code>options.body</code></dt>
    <dd>A <code>String</code> Any body that you want to add to your request: this can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams, string object or literal, or a ReadableStream object., The default is <code></code></dd>
    <dt><code>options.credentials</code></dt>
    <dd>A <code>String</code> -, The default is <code>same-origin</code></dd>
    <dt><code>options.headers</code></dt>
    <dd>A <code>Object</code> Any headers you want to add to your request, contained within a Headers object or an object literal with String values., The default is <code></code></dd>
    <dt><code>options.method</code></dt>
    <dd>A <code>String</code> The request method, e.g., GET, POST. Note that the Origin header is not set on Fetch requests with a method of HEAD or GET., The default is <code>GET</code></dd>
    <dt><code>options.redirect</code></dt>
    <dd>A <code>String</code> How to handle a redirect response, The default is <code>follow</code></dd>
    <dt><code>options.agent</code></dt>
    <dd>A <code>String</code> -, The default is <code></code></dd>
    <dt><code>options.hostname</code></dt>
    <dd>A <code>String</code> -, The default is <code>localhost</code></dd>
    <dt><code>options.insecureHTTPParser</code></dt>
    <dd>A <code>String</code> -, The default is <code>true</code></dd>
    <dt><code>options.path</code></dt>
    <dd>A <code>String</code> -, The default is <code>/</code></dd>
    <dt><code>options.port</code></dt>
    <dd>A <code>Number</code> -, The default is <code>80</code></dd>
    <dt><code>options.protocol</code></dt>
    <dd>A <code>String</code> -, The default is <code>http:</code></dd>
    <dt><code>options.timeout</code></dt>
    <dd>A <code>Number</code> -, The default is <code>3600000</code></dd>
</dl>

### Return value

<dl>
    <dt>A <code>Promise</code></dt>
</dl>



