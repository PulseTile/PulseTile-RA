"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var ReferenceError = function (_a) {
    var label = _a.label, error = _a.error;
    return (react_1.default.createElement(TextField_1.default, { error: true, disabled: true, label: label, value: error, margin: "normal" }));
};
ReferenceError.propTypes = {
    error: prop_types_1.default.string.isRequired,
    label: prop_types_1.default.string.isRequired,
};
exports.default = ReferenceError;
