import React, { Component } from "react";
import HelpIcon from '@material-ui/icons/Help';

/**
 * This component returns link to the customer page
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} homepage
 * @constructor
 */
const LinkToCustomer = ({ classes, homepage }) => {
    return (
        <a href={homepage.link} className={classes.rightBlockButton} target="_blank" aria-label="To Customer">
            <HelpIcon />
        </a>
    );
};

export default LinkToCustomer;
