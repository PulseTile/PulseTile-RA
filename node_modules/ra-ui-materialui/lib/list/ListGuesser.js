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
var inflection_1 = __importDefault(require("inflection"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var List_1 = require("./List");
var listFieldTypes_1 = __importDefault(require("./listFieldTypes"));
var ListViewGuesser = /** @class */ (function (_super) {
    __extends(ListViewGuesser, _super);
    function ListViewGuesser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            inferredChild: null,
        };
        return _this;
    }
    ListViewGuesser.prototype.componentDidUpdate = function () {
        var _a = this.props, ids = _a.ids, data = _a.data, resource = _a.resource;
        if (ids.length > 0 && data && !this.state.inferredChild) {
            var inferredElements = ra_core_1.getElementsFromRecords(ids.map(function (id) { return data[id]; }), listFieldTypes_1.default);
            var inferredChild = new ra_core_1.InferredElement(listFieldTypes_1.default.table, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed List:\n\nexport const " + inflection_1.default.capitalize(inflection_1.default.singularize(resource)) + "List = props => (\n    <List {...props}>\n" + inferredChild.getRepresentation() + "\n    </List>\n);");
            this.setState({ inferredChild: inferredChild.getElement() });
        }
    };
    ListViewGuesser.prototype.render = function () {
        return react_1.default.createElement(List_1.ListView, __assign({}, this.props), this.state.inferredChild);
    };
    return ListViewGuesser;
}(react_1.Component));
exports.ListViewGuesser = ListViewGuesser;
ListViewGuesser.propTypes = List_1.ListView.propTypes;
var ListGuesser = function (props) { return (react_1.default.createElement(ra_core_1.ListController, __assign({}, props), function (controllerProps) { return react_1.default.createElement(ListViewGuesser, __assign({}, props, controllerProps)); })); };
exports.default = styles_1.withStyles(List_1.styles)(ListGuesser);
