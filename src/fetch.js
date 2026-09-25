const undici = require("undici");

if (process.env.HTTP_PROXY) {
    const dispatcher = new undici.ProxyAgent({
        uri: process.env.HTTP_PROXY,
        requestTls: { rejectUnauthorized: false },
    });

    undici.setGlobalDispatcher(dispatcher);
}

/**
 * @typedef Options
 * @property {Object} params
 * @property {Object} query
 * @property {Function} beforeRequest
 * @property {Function} beforeResponse
 * @property {Object} cookie
 * @property {"omit"|"same-origin"|"include"} [credentials=include]
 * @property {Object} headers
 * @property {"follow"|"error"|"manual"} [redirect=manual]
 */

/**
 * @param {String} resource
 * @param {undici.Request & Options} options
 * @returns {Promise<undici.Response>}
 */
async function fetch(resource, options = {}) {
    const { params = {}, query = {}, beforeRequest = async (resource, options) => ({ resource, options }), beforeResponse = async (response) => response, cookie, credentials = "include", headers = {}, redirect = "manual", ...restOptions } = options;

    const url = new URL(resource);

    url.pathname = url.pathname.replace(/:(\w+)/g, (_, name) => params[name] ?? name);

    for (const name in query) {
        url.searchParams.append(name, query[name]);
    }

    const newHeaders = new Headers(headers);

    if (credentials !== "omit" && cookie) {
        const string = await cookie.get(url);
        if (string) {
            newHeaders.set("Cookie", string);
        }
    }

    const { resource: input, options: init = {} } = await beforeRequest(url, {
        redirect,
        headers: newHeaders,
        ...restOptions,
    });

    const response = await undici.fetch(input, init);

    if (credentials !== "omit" && cookie) {
        await cookie.set(input, response.headers.getSetCookie());
    }

    return beforeResponse(response);
}

module.exports = fetch;
