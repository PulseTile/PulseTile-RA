"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';
exports.registerResource = function (resource) { return ({
    type: exports.REGISTER_RESOURCE,
    payload: resource,
}); };
exports.UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';
exports.unregisterResource = function (resourceName) { return ({
    type: exports.UNREGISTER_RESOURCE,
    payload: resourceName,
}); };
