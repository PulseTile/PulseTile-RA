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
import { EditController, InferredElement, getElementsFromRecords, } from 'ra-core';
import { EditView, styles } from './Edit';
import editFieldTypes from './editFieldTypes';
var EditViewGuesser = /** @class */ (function (_super) {
    __extends(EditViewGuesser, _super);
    function EditViewGuesser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            inferredChild: null,
        };
        return _this;
    }
    EditViewGuesser.prototype.componentDidUpdate = function () {
        var _a = this.props, record = _a.record, resource = _a.resource;
        if (record && !this.state.inferredChild) {
            var inferredElements = getElementsFromRecords([record], editFieldTypes);
            var inferredChild = new InferredElement(editFieldTypes.form, null, inferredElements);
            process.env.NODE_ENV !== 'production' &&
                // eslint-disable-next-line no-console
                console.log("Guessed Edit:\n\nexport const " + inflection.capitalize(inflection.singularize(resource)) + "Edit = props => (\n    <Edit {...props}>\n" + inferredChild.getRepresentation() + "\n    </Edit>\n);");
            this.setState({ inferredChild: inferredChild.getElement() });
        }
    };
    EditViewGuesser.prototype.render = function () {
        return React.createElement(EditView, __assign({}, this.props), this.state.inferredChild);
    };
    return EditViewGuesser;
}(Component));
export { EditViewGuesser };
EditViewGuesser.propTypes = EditView.propTypes;
var EditGuesser = function (props) { return (React.createElement(EditController, __assign({}, props), function (controllerProps) { return React.createElement(EditViewGuesser, __assign({}, props, controllerProps)); })); };
export default withStyles(styles)(EditGuesser);
