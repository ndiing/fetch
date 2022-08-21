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

- `resource=` String This defines the resource that you wish to fetch
- `options=` Object An object containing any custom settings that you want to apply to the request
- `options.body=` String Any body that you want to add to your request: this can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams, string object or literal, or a ReadableStream object.
- `options.credentials=same-origin` String -
- `options.headers=` Object Any headers you want to add to your request, contained within a Headers object or an object literal with String values.
- `options.method=GET` String The request method, e.g., GET, POST. Note that the Origin header is not set on Fetch requests with a method of HEAD or GET.
- `options.redirect=follow` String How to handle a redirect response
- `options.agent=` String -
- `options.hostname=localhost` String -
- `options.insecureHTTPParser=true` String -
- `options.path=/` String -
- `options.port=80` Number -
- `options.protocol=http:` String -
- `options.timeout=3600000` Number -
<!-- parameters -->

<!-- return -->
### Return value

- `Promise`

<!-- return -->
