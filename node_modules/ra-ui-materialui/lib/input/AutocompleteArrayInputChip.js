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
var react_1 = __importDefault(require("react"));
var material_ui_chip_input_1 = __importDefault(require("material-ui-chip-input"));
var styles_1 = require("@material-ui/core/styles");
var chipInputStyles = {
    label: {
        top: 18,
    },
    labelShrink: {
        top: 8,
    },
    chipContainer: {
        alignItems: 'center',
        display: 'flex',
        minHeight: 50,
    },
};
var AutocompleteArrayInputChip = function (props) { return react_1.default.createElement(material_ui_chip_input_1.default, __assign({}, props)); };
exports.default = styles_1.withStyles(chipInputStyles)(AutocompleteArrayInputChip);
