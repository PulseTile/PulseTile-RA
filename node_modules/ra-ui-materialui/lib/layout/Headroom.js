"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_headroom_1 = __importDefault(require("react-headroom"));
var defaultStyle = {
    position: 'fixed',
    zIndex: 1300,
};
var HeadroomCustom = function (_a) {
    var children = _a.children;
    return (react_1.default.createElement(react_headroom_1.default, { style: defaultStyle }, children));
};
HeadroomCustom.propTypes = {
    children: prop_types_1.default.node.isRequired,
};
exports.default = HeadroomCustom;
