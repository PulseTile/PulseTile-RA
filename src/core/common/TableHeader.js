import React from "react";
import get from "lodash/get";
import { translate } from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    tableHeaderBlock: {
        background: theme.tableHeader.tableHeaderBlock.background,
        backgroundSize: "cover",
        color: "white",
        paddingLeft: "14px",
        paddingTop: "25px",
        paddingBottom: "14px"
    },
    title: {
        marginTop: 0,
    }
});

/**
 * This component returns header for table
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {string} resource
 */
const TableHeader = ({ classes, resource, translate }) => {
    const title = translate('tableHeaders.' + resource +'.title');
    const description = translate('tableHeaders.' + resource +'.description');
    if (!title) {
        return null;
    }
    return (
        <div className={classes.tableHeaderBlock} >
            <h1 className={classes.title}>{title}</h1>
            <p>{description}</p>
        </div>
    );
};

export default withStyles(styles)(translate(TableHeader));