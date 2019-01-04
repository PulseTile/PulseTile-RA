"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var resource_1 = __importStar(require("./resource"));
var loading_1 = __importDefault(require("./loading"));
var notifications_1 = __importDefault(require("./notifications"));
var record_1 = __importDefault(require("./record"));
var references_1 = __importStar(require("./references"));
var saving_1 = __importDefault(require("./saving"));
var ui_1 = __importDefault(require("./ui"));
var auth_1 = __importStar(require("./auth"));
exports.default = redux_1.combineReducers({
    resources: resource_1.default,
    loading: loading_1.default,
    notifications: notifications_1.default,
    record: record_1.default,
    references: references_1.default,
    saving: saving_1.default,
    ui: ui_1.default,
    auth: auth_1.default,
});
exports.getPossibleReferenceValues = function (state, props) {
    return references_1.getPossibleReferenceValues(state.references, props);
};
exports.getResources = function (state) { return resource_1.getResources(state.resources); };
exports.getReferenceResource = function (state, props) {
    return resource_1.getReferenceResource(state.resources, props);
};
exports.isLoggedIn = function (state) { return auth_1.isLoggedIn(state.auth); };
var references_2 = require("./references");
exports.getPossibleReferences = references_2.getPossibleReferences;
