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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Datagrid_1 = __importDefault(require("./Datagrid"));
var SingleFieldList_1 = __importDefault(require("./SingleFieldList"));
var ArrayField_1 = __importDefault(require("../field/ArrayField"));
var BooleanField_1 = __importDefault(require("../field/BooleanField"));
var ChipField_1 = __importDefault(require("../field/ChipField"));
var DateField_1 = __importDefault(require("../field/DateField"));
var EmailField_1 = __importDefault(require("../field/EmailField"));
var NumberField_1 = __importDefault(require("../field/NumberField"));
var ReferenceField_1 = __importDefault(require("../field/ReferenceField"));
var ReferenceArrayField_1 = __importDefault(require("../field/ReferenceArrayField"));
var TextField_1 = __importDefault(require("../field/TextField"));
var UrlField_1 = __importDefault(require("../field/UrlField"));
exports.default = {
    table: {
        component: function (props) { return react_1.default.createElement(Datagrid_1.default, __assign({ rowClick: "edit" }, props)); },
        representation: function (_, children) { return "        <Datagrid rowClick=\"edit\">\n" + children.map(function (child) { return "            " + child.getRepresentation(); }).join('\n') + "\n        </Datagrid>"; },
    },
    array: {
        // eslint-disable-next-line react/display-name
        component: function (_a) {
            var children = _a.children, props = __rest(_a, ["children"]);
            return (react_1.default.createElement(ArrayField_1.default, __assign({}, props),
                react_1.default.createElement(SingleFieldList_1.default, null,
                    react_1.default.createElement(ChipField_1.default, { source: children.length > 0 && children[0].props.source }))));
        },
        representation: function (props, children) {
            return "<ArrayField source=\"" + props.source + "\"><SingleFieldList><ChipField source=\"" + (children.length > 0 &&
                children[0].getProps()
                    .source) + "\" /></SingleFieldList></ArrayField>";
        },
    },
    boolean: {
        component: BooleanField_1.default,
        representation: function (props) { return "<BooleanField source=\"" + props.source + "\" />"; },
    },
    date: {
        component: DateField_1.default,
        representation: function (props) { return "<DateField source=\"" + props.source + "\" />"; },
    },
    email: {
        component: EmailField_1.default,
        representation: function (props) { return "<EmailField source=\"" + props.source + "\" />"; },
    },
    id: {
        component: TextField_1.default,
        representation: function (props) { return "<TextField source=\"" + props.source + "\" />"; },
    },
    number: {
        component: NumberField_1.default,
        representation: function (props) { return "<NumberField source=\"" + props.source + "\" />"; },
    },
    reference: {
        component: ReferenceField_1.default,
        representation: function (props) {
            return "<ReferenceField source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextField source=\"id\" /></ReferenceField>";
        },
    },
    referenceChild: {
        component: function (props) { return react_1.default.createElement(TextField_1.default, __assign({ source: "id" }, props)); },
        representation: function () { return "<TextField source=\"id\" />"; },
    },
    referenceArray: {
        component: ReferenceArrayField_1.default,
        representation: function (props) {
            return "<ReferenceArrayField source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextField source=\"id\" /></ReferenceArrayField>";
        },
    },
    referenceArrayChild: {
        component: function (props) { return react_1.default.createElement(TextField_1.default, __assign({ source: "id" }, props)); },
        representation: function () { return "<TextField source=\"id\" />"; },
    },
    richText: false,
    string: {
        component: TextField_1.default,
        representation: function (props) { return "<TextField source=\"" + props.source + "\" />"; },
    },
    url: {
        component: UrlField_1.default,
        representation: function (props) { return "<UrlField source=\"" + props.source + "\" />"; },
    },
};
