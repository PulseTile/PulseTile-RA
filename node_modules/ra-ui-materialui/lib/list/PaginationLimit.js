"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var pure_1 = __importDefault(require("recompose/pure"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
var PaginationLimit = function (_a) {
    var translate = _a.translate;
    return (react_1.default.createElement(CardContent_1.default, null,
        react_1.default.createElement(Typography_1.default, { variant: "body1" }, translate('ra.navigation.no_results'))));
};
PaginationLimit.propTypes = {
    translate: prop_types_1.default.func.isRequired,
};
var enhance = compose_1.default(pure_1.default, ra_core_1.translate);
exports.default = enhance(PaginationLimit);
