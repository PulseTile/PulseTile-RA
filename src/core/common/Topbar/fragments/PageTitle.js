import React from "react";

import Typography from '@material-ui/core/Typography';

const titlesArray = {
    charts: "System Dashboard",
    patients: "Patients Lists",
};

/**
 * This component returns page title (for Charts and Patients pages)
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} location
 */
const PageTitle = ({ classes, location }) => {
    const pathName = location.pathname;
    const title = titlesArray[pathName.replace('/', '')];
    return (
        <Typography className={classes.title}>
            {title ? title : "System Dashboard"}
        </Typography>
    );
};

export default PageTitle;