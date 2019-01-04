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
var SimpleForm_1 = __importDefault(require("../form/SimpleForm"));
var SimpleFormIterator_1 = __importDefault(require("../form/SimpleFormIterator"));
var ArrayInput_1 = __importDefault(require("../input/ArrayInput"));
var BooleanInput_1 = __importDefault(require("../input/BooleanInput"));
var DateInput_1 = __importDefault(require("../input/DateInput"));
var NumberInput_1 = __importDefault(require("../input/NumberInput"));
var ReferenceInput_1 = __importDefault(require("../input/ReferenceInput"));
var ReferenceArrayInput_1 = __importDefault(require("../input/ReferenceArrayInput"));
var SelectInput_1 = __importDefault(require("../input/SelectInput"));
var TextInput_1 = __importDefault(require("../input/TextInput"));
exports.default = {
    form: {
        component: SimpleForm_1.default,
        representation: function (_, children) { return "        <SimpleForm>\n" + children.map(function (child) { return "            " + child.getRepresentation(); }).join('\n') + "\n        </SimpleForm>"; },
    },
    array: {
        // eslint-disable-next-line react/display-name
        component: function (_a) {
            var children = _a.children, props = __rest(_a, ["children"]);
            return (react_1.default.createElement(ArrayInput_1.default, __assign({}, props),
                react_1.default.createElement(SimpleFormIterator_1.default, null, children)));
        },
        representation: function (props, children) {
            return "<ArrayInput source=\"" + props.source + "\"><SimpleFormIterator>" + children
                .map(function (child) { return child.getRepresentation(); })
                .join('\n') + "</SimpleFormIterator></ArrayInput>";
        },
    },
    boolean: {
        component: BooleanInput_1.default,
        representation: function (props) { return "<BooleanInput source=\"" + props.source + "\" />"; },
    },
    date: {
        component: DateInput_1.default,
        representation: function (props) { return "<DateInput source=\"" + props.source + "\" />"; },
    },
    email: {
        component: TextInput_1.default,
        representation: function (props) { return "<TextInput source=\"" + props.source + "\" />"; },
    },
    id: {
        component: TextInput_1.default,
        representation: function (props) { return "<TextInput source=\"" + props.source + "\" />"; },
    },
    number: {
        component: NumberInput_1.default,
        representation: function (props) { return "<NumberInput source=\"" + props.source + "\" />"; },
    },
    reference: {
        component: ReferenceInput_1.default,
        representation: function (props, children) {
            return "<ReferenceInput source=\"" + props.source + "\" reference=\"" + props.reference + "\">" + children.getRepresentation() + "</ReferenceInput>";
        },
    },
    referenceChild: {
        component: function (props) { return react_1.default.createElement(SelectInput_1.default, __assign({ optionText: "id" }, props)); },
        representation: function () { return "<SelectInput optionText=\"id\" />"; },
    },
    referenceArray: {
        component: ReferenceArrayInput_1.default,
        representation: function (props) {
            return "<ReferenceArrayInput source=\"" + props.source + "\" reference=\"" + props.reference + "\"><TextInput source=\"id\" /></ReferenceArrayInput>";
        },
    },
    referenceArrayChild: {
        component: function (props) { return react_1.default.createElement(SelectInput_1.default, __assign({ optionText: "id" }, props)); },
        representation: function () { return "<SelectInput optionText=\"id\" />"; },
    },
    richText: {
        component: TextInput_1.default,
        representation: function (props) { return "<TextInput source=\"" + props.source + "\" />"; },
    },
    string: {
        component: TextInput_1.default,
        representation: function (props) { return "<TextInput source=\"" + props.source + "\" />"; },
    },
    url: {
        component: TextInput_1.default,
        representation: function (props) { return "<TextInput source=\"" + props.source + "\" />"; },
    },
};
