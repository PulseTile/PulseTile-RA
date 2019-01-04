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
import React, { Component } from 'react';
import inflection from 'inflection';
import { withStyles } from '@material-ui/core/styles';
import { ListController, getElementsFromRecords, InferredElement, } from 'ra-core';
import { ListView, styles } from './List';
import listFieldTypes from './listFieldTypes';
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
            var inferredElements = getElementsFromRecords(ids.map(function (id) { return data[id]; }), listFieldTypes);
            var inferredChild = new InferredElement(listFieldTypes.table, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed List:\n\nexport const " + inflection.capitalize(inflection.singularize(resource)) + "List = props => (\n    <List {...props}>\n" + inferredChild.getRepresentation() + "\n    </List>\n);");
            this.setState({ inferredChild: inferredChild.getElement() });
        }
    };
    ListViewGuesser.prototype.render = function () {
        return React.createElement(ListView, __assign({}, this.props), this.state.inferredChild);
    };
    return ListViewGuesser;
}(Component));
export { ListViewGuesser };
ListViewGuesser.propTypes = ListView.propTypes;
var ListGuesser = function (props) { return (React.createElement(ListController, __assign({}, props), function (controllerProps) { return React.createElement(ListViewGuesser, __assign({}, props, controllerProps)); })); };
export default withStyles(styles)(ListGuesser);
