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
var prop_types_1 = __importDefault(require("prop-types"));
var get_1 = __importDefault(require("lodash/get"));
var pure_1 = __importDefault(require("recompose/pure"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var sanitizeRestProps_1 = __importDefault(require("./sanitizeRestProps"));
var hasNumberFormat = !!(typeof Intl === 'object' &&
    Intl &&
    typeof Intl.NumberFormat === 'function');
/**
 * Display a numeric value as a locale string.
 *
 * Uses Intl.NumberFormat() if available, passing the locales and options props as arguments.
 * If Intl is not available, it outputs number as is (and ignores the locales and options props).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * @example
 * <NumberField source="score" />
 * // renders the record { id: 1234, score: 567 } as
 * <span>567</span>
 *
 * <NumberField source="score" className="red" />
 * // renders the record { id: 1234, score: 567 } as
 * <span class="red">567</span>
 *
 * <NumberField source="share" options={{ style: 'percent' }} />
 * // renders the record { id: 1234, share: 0.2545 } as
 * <span>25%</span>
 *
 * <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>$25.99</span>
 *
 * <NumberField source="price" locales="fr-FR" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>25,99 $US</span>
 */
exports.NumberField = function (_a) {
    var className = _a.className, record = _a.record, source = _a.source, locales = _a.locales, options = _a.options, textAlign = _a.textAlign, rest = __rest(_a, ["className", "record", "source", "locales", "options", "textAlign"]);
    if (!record)
        return null;
    var value = get_1.default(record, source);
    if (value == null)
        return null;
    if (!hasNumberFormat) {
        return (react_1.default.createElement(Typography_1.default, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps_1.default(rest)), value));
    }
    return (react_1.default.createElement(Typography_1.default, __assign({ component: "span", body1: "body1", className: className }, sanitizeRestProps_1.default(rest)), value.toLocaleString(locales, options)));
};
exports.NumberField.propTypes = {
    addLabel: prop_types_1.default.bool,
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    cellClassName: prop_types_1.default.string,
    headerClassName: prop_types_1.default.string,
    label: prop_types_1.default.string,
    locales: prop_types_1.default.oneOfType([
        prop_types_1.default.string,
        prop_types_1.default.arrayOf(prop_types_1.default.string),
    ]),
    options: prop_types_1.default.object,
    record: prop_types_1.default.object,
    textAlign: prop_types_1.default.string,
    sortBy: prop_types_1.default.string,
    source: prop_types_1.default.string.isRequired,
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.NumberField.displayName = 'NumberField';
var ComposedNumberField = pure_1.default(exports.NumberField);
ComposedNumberField.defaultProps = {
    addLabel: true,
    textAlign: 'right',
};
exports.default = ComposedNumberField;
