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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var react_redux_1 = require("react-redux");
var compose_1 = __importDefault(require("recompose/compose"));
var ra_core_1 = require("ra-core");
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
                startUndoable(ra_core_1.crudDeleteMany(resource, selectedIds, basePath));
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
}(react_1.Component));
BulkDeleteAction.propTypes = {
    basePath: prop_types_1.default.string,
    dispatchCrudDeleteMany: prop_types_1.default.func.isRequired,
    label: prop_types_1.default.string,
    onExit: prop_types_1.default.func.isRequired,
    resource: prop_types_1.default.string.isRequired,
    startUndoable: prop_types_1.default.func,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    translate: prop_types_1.default.func.isRequired,
    undoable: prop_types_1.default.bool,
};
var EnhancedBulkDeleteAction = compose_1.default(react_redux_1.connect(undefined, {
    startUndoable: ra_core_1.startUndoable,
    dispatchCrudDeleteMany: ra_core_1.crudDeleteMany,
}), ra_core_1.translate)(BulkDeleteAction);
EnhancedBulkDeleteAction.defaultProps = {
    label: 'ra.action.delete',
    undoable: true,
};
exports.default = EnhancedBulkDeleteAction;
