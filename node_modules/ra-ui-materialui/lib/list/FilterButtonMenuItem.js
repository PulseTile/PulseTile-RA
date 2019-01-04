"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
var ra_core_1 = require("ra-core");
var FilterButtonMenuItem = /** @class */ (function (_super) {
    __extends(FilterButtonMenuItem, _super);
    function FilterButtonMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleShow = function () {
            var _a = _this.props, filter = _a.filter, onShow = _a.onShow;
            onShow({ source: filter.source, defaultValue: filter.defaultValue });
        };
        return _this;
    }
    FilterButtonMenuItem.prototype.render = function () {
        var _a = this.props, filter = _a.filter, resource = _a.resource;
        return (react_1.default.createElement(MenuItem_1.default, { className: "new-filter-item", "data-key": filter.source, "data-default-value": filter.defaultValue, key: filter.source, onClick: this.handleShow },
            react_1.default.createElement(ra_core_1.FieldTitle, { label: filter.label, source: filter.source, resource: resource })));
    };
    FilterButtonMenuItem.propTypes = {
        filter: prop_types_1.default.object.isRequired,
        onShow: prop_types_1.default.func.isRequired,
        resource: prop_types_1.default.string.isRequired,
    };
    return FilterButtonMenuItem;
}(react_1.Component));
exports.default = FilterButtonMenuItem;
