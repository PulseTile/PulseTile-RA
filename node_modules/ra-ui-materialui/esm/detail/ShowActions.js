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
import { EditButton } from '../button';
import CardActions from '../layout/CardActions';
var sanitizeRestProps = function (_a) {
    var basePath = _a.basePath, className = _a.className, record = _a.record, hasEdit = _a.hasEdit, hasList = _a.hasList, resource = _a.resource, rest = __rest(_a, ["basePath", "className", "record", "hasEdit", "hasList", "resource"]);
    return rest;
};
/**
 * Action Toolbar for the Show view
 *
 * Internal component. If you want to add or remove actions for a Show view,
 * write your own ShowActions Component. Then, in the <Show> component,
 * use it in the `actions` prop to pas a custom element.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { CardActions, EditButton, Show } from 'react-admin';
 *
 *     const PostShowActions = ({ basePath, record, resource }) => (
 *         <CardActions>
 *             <EditButton basePath={basePath} record={record} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </CardActions>
 *     );
 *
 *     export const PostShow = (props) => (
 *         <Show actions={<PostShowActions />} {...props}>
 *             ...
 *         </Show>
 *     );
 */
var ShowActions = function (_a) {
    var basePath = _a.basePath, className = _a.className, data = _a.data, hasEdit = _a.hasEdit, resource = _a.resource, rest = __rest(_a, ["basePath", "className", "data", "hasEdit", "resource"]);
    return (React.createElement(CardActions, __assign({ className: className }, sanitizeRestProps(rest)), hasEdit && React.createElement(EditButton, { basePath: basePath, record: data })));
};
ShowActions.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    data: PropTypes.object,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    resource: PropTypes.string,
};
export default ShowActions;
