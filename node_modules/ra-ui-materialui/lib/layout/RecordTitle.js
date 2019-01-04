"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var TitleDeprecated_1 = __importDefault(require("./TitleDeprecated"));
/**
 * @deprecated Use TitleForRecord instead
 */
var RecordTitle = function (_a) {
    var defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title;
    return record ? (react_1.default.createElement(TitleDeprecated_1.default, { title: title, record: record, defaultTitle: defaultTitle })) : ('');
};
RecordTitle.propTypes = {
    defaultTitle: prop_types_1.default.any,
    record: prop_types_1.default.object,
    title: prop_types_1.default.any,
};
exports.default = RecordTitle;
