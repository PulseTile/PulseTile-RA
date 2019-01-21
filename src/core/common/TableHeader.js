import React from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';

import tableHeaders from "../config/tableHeaders";
import styles from "../styles";

/**
 * This component returns header for table
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} resourse
 * @constructor
 */
const TableHeader = ({ classes, resourse }) => (
    <div className={classes.tableHeaderBlock} >
        <h1 className={classes.title}>{get(tableHeaders[resourse], 'title', null)}</h1>
        <p>{get(tableHeaders, '[' + resourse + '].description', null)}</p>
    </div>
);

export default withStyles(styles.tableHeader)(TableHeader);