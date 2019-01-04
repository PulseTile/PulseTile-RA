"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fakerest_1 = __importDefault(require("fakerest"));
var react_admin_1 = require("react-admin");
/* eslint-disable no-console */
function log(type, resource, params, response) {
    if (console.group) {
        // Better logging in Chrome
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    }
    else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
}
/**
 * Respond to react-admin data queries using a local JavaScript object
 *
 * Useful for debugging and testing - do not use in production.
 *
 * @example
 * import fakeDataProvider from 'ra-data-fakerest';
 * const dataProvider = fakeDataProvider({
 *   posts: [
 *     { id: 0, title: 'Hello, world!' },
 *     { id: 1, title: 'FooBar' },
 *   ],
 *   comments: [
 *     { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *     { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *   ],
 * })
 */
exports.default = (function (data, loggingEnabled) {
    if (loggingEnabled === void 0) { loggingEnabled = false; }
    var restServer = new fakerest_1.default.Server();
    restServer.init(data);
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }
    function getResponse(type, resource, params) {
        var _a;
        switch (type) {
            case react_admin_1.GET_LIST: {
                var _b = params.pagination, page = _b.page, perPage = _b.perPage;
                var _c = params.sort, field = _c.field, order = _c.order;
                var query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: params.filter,
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: params.filter,
                    }),
                };
            }
            case react_admin_1.GET_ONE:
                return {
                    data: restServer.getOne(resource, params.id, __assign({}, params)),
                };
            case react_admin_1.GET_MANY:
                return {
                    data: restServer.getAll(resource, {
                        filter: { id: params.ids },
                    }),
                };
            case react_admin_1.GET_MANY_REFERENCE: {
                var _d = params.pagination, page = _d.page, perPage = _d.perPage;
                var _e = params.sort, field = _e.field, order = _e.order;
                var query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: __assign({}, params.filter, (_a = {}, _a[params.target] = params.id, _a)),
                };
                return {
                    data: restServer.getAll(resource, query),
                    total: restServer.getCount(resource, {
                        filter: query.filter,
                    }),
                };
            }
            case react_admin_1.UPDATE:
                return {
                    data: restServer.updateOne(resource, params.id, __assign({}, params.data)),
                };
            case react_admin_1.UPDATE_MANY:
                params.ids.forEach(function (id) {
                    return restServer.updateOne(resource, id, __assign({}, params.data));
                });
                return { data: params.ids };
            case react_admin_1.CREATE:
                return {
                    data: restServer.addOne(resource, __assign({}, params.data)),
                };
            case react_admin_1.DELETE:
                return { data: restServer.removeOne(resource, params.id) };
            case react_admin_1.DELETE_MANY:
                params.ids.forEach(function (id) { return restServer.removeOne(resource, id); });
                return { data: params.ids };
            default:
                return false;
        }
    }
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    return function (type, resource, params) {
        var collection = restServer.getCollection(resource);
        if (!collection) {
            return new Promise(function (_, reject) {
                return reject(new Error("Undefined collection \"" + resource + "\""));
            });
        }
        var response;
        try {
            response = getResponse(type, resource, params);
        }
        catch (error) {
            return new Promise(function (_, reject) { return reject(error); });
        }
        if (response === false) {
            return new Promise(function (_, reject) {
                return reject(new Error("Unsupported fetch action type " + type));
            });
        }
        if (loggingEnabled) {
            log(type, resource, params, response);
        }
        return new Promise(function (resolve) { return resolve(response); });
    };
});
