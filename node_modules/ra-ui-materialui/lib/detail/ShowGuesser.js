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
var Show_1 = require("./Show");
var showFieldTypes_1 = __importDefault(require("./showFieldTypes"));
var ShowViewGuesser = /** @class */ (function (_super) {
    __extends(ShowViewGuesser, _super);
    function ShowViewGuesser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            inferredChild: null,
        };
        return _this;
    }
    ShowViewGuesser.prototype.componentDidUpdate = function () {
        var _a = this.props, record = _a.record, resource = _a.resource;
        if (record && !this.state.inferredChild) {
            var inferredElements = ra_core_1.getElementsFromRecords([record], showFieldTypes_1.default);
            var inferredChild = new ra_core_1.InferredElement(showFieldTypes_1.default.show, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed Show:\n\nexport const " + inflection_1.default.capitalize(inflection_1.default.singularize(resource)) + "Show = props => (\n    <Show {...props}>\n" + inferredChild.getRepresentation() + "\n    </Show>\n);");
            this.setState({ inferredChild: inferredChild.getElement() });
        }
    };
    ShowViewGuesser.prototype.render = function () {
        return react_1.default.createElement(Show_1.ShowView, __assign({}, this.props), this.state.inferredChild);
    };
    return ShowViewGuesser;
}(react_1.Component));
exports.ShowViewGuesser = ShowViewGuesser;
ShowViewGuesser.propTypes = Show_1.ShowView.propTypes;
var ShowGuesser = function (props) { return (react_1.default.createElement(ra_core_1.ShowController, __assign({}, props), function (controllerProps) { return react_1.default.createElement(ShowViewGuesser, __assign({}, props, controllerProps)); })); };
exports.default = styles_1.withStyles(Show_1.styles)(ShowGuesser);
