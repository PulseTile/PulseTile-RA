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
import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'ra-core';
/**
 * @deprecated Use Title instead
 */
var Title = function (_a) {
    var className = _a.className, defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title, translate = _a.translate, rest = __rest(_a, ["className", "defaultTitle", "record", "title", "translate"]);
    if (!title) {
        return (React.createElement("span", __assign({ className: className }, rest), defaultTitle));
    }
    if (typeof title === 'string') {
        return (React.createElement("span", __assign({ className: className }, rest), translate(title, { _: title })));
    }
    return React.cloneElement(title, __assign({ className: className, record: record }, rest));
};
Title.propTypes = {
    defaultTitle: PropTypes.string.isRequired,
    className: PropTypes.string,
    record: PropTypes.object,
    translate: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
export default translate(Title);
