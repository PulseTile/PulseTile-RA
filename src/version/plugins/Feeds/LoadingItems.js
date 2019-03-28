import React from "react";
import { connect } from 'react-redux';

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

/**
 * This component returns list of empty rows if information is loading
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
const LoadingItems = ({ classes }) => {
    return (
        <List className={classes.list}>
            <li className={classes.listItem}>
                <Typography>Loading...</Typography>
            </li>
        </List>
    );
};

export default LoadingItems;
