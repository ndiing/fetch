# fetch()
method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available.

<!-- examples -->
<!-- examples -->

## Syntax

```js
fetch(resource,options);
```

<!-- parameters -->
### Parameters

- `resource` String This defines the resource that you wish to fetch
- `options` Object An object containing any custom settings that you want to apply to the request
- `options.body` String Any body that you want to add to your request: this can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams, string object or literal, or a ReadableStream object.
- `options.credentialssame-origin` String -
- `options.headers` Object Any headers you want to add to your request, contained within a Headers object or an object literal with String values.
- `options.methodGET` String The request method, e.g., GET, POST. Note that the Origin header is not set on Fetch requests with a method of HEAD or GET.
- `options.redirectfollow` String How to handle a redirect response
- `options.agent` String -
- `options.hostnamelocalhost` String -
- `options.insecureHTTPParsertrue` String -
- `options.path/` String -
- `options.port80` Number -
- `options.protocolhttp:` String -
- `options.timeout3600000` Number -
<!-- parameters -->

<!-- return -->
### Return value

- `Promise`

<!-- return -->
