import React from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';

import tableHeaders from "../config/tableHeaders";

import themeStyles from "../../version/styles";
import { mergeStyles } from "../helpers";

const coreStyles = {};

const styles = mergeStyles(coreStyles, get(themeStyles, 'tableHeader', {}));

/**
 * This component returns header for table
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} resource
 * @constructor
 */
const TableHeader = ({ classes, resource }) => (
    <div className={classes.tableHeaderBlock} >
        <h1 className={classes.title}>{get(tableHeaders, [resource, 'title'], null)}</h1>
        <p>{get(tableHeaders, [resource, 'description'], null)}</p>
    </div>
);

export default withStyles(styles)(TableHeader);