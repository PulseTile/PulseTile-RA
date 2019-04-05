import React from "react";
import { Link } from 'react-router-dom';

import HelpIcon from '@material-ui/icons/Help';

import { PATIENT_SUMMARY } from "../../../../core/config/clientUrls";

/**
 * This component returns link to Homepage
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func} toggleMode
 * @constructor
 */
const LinkToHomepage = ({ classes, toggleMode }) => {
    return (
        <Link to={PATIENT_SUMMARY} className={classes.rightBlockButton} onClick={() => toggleMode()} aria-label="Home">
            <HelpIcon />
        </Link>
    );
};

export default LinkToHomepage;
