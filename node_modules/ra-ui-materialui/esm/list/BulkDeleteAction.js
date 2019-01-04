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
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { crudDeleteMany, startUndoable, translate } from 'ra-core';
var BulkDeleteAction = /** @class */ (function (_super) {
    __extends(BulkDeleteAction, _super);
    function BulkDeleteAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.componentDidMount = function () {
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn('<BulkDeleteAction> is deprecated. Use the <BulkDeleteButton> component instead, via the bulkActionButton props.');
            }
            var _a = _this.props, basePath = _a.basePath, dispatchCrudDeleteMany = _a.dispatchCrudDeleteMany, resource = _a.resource, selectedIds = _a.selectedIds, startUndoable = _a.startUndoable, undoable = _a.undoable;
            if (undoable) {
                startUndoable(crudDeleteMany(resource, selectedIds, basePath));
            }
            else {
                dispatchCrudDeleteMany(resource, selectedIds, basePath);
            }
            _this.props.onExit();
        };
        return _this;
    }
    BulkDeleteAction.prototype.render = function () {
        return null;
    };
    return BulkDeleteAction;
}(Component));
BulkDeleteAction.propTypes = {
    basePath: PropTypes.string,
    dispatchCrudDeleteMany: PropTypes.func.isRequired,
    label: PropTypes.string,
    onExit: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    translate: PropTypes.func.isRequired,
    undoable: PropTypes.bool,
};
var EnhancedBulkDeleteAction = compose(connect(undefined, {
    startUndoable: startUndoable,
    dispatchCrudDeleteMany: crudDeleteMany,
}), translate)(BulkDeleteAction);
EnhancedBulkDeleteAction.defaultProps = {
    label: 'ra.action.delete',
    undoable: true,
};
export default EnhancedBulkDeleteAction;
