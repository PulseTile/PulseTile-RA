import React from "react";

import Typography from '@material-ui/core/Typography';

import PatientBanner from "./PatientBanner";

const pagesWithTitle = [
    '/',
    '/charts',
    '/patients',
];

const titlesArray = {
    charts: "System Dashboard",
    patients: "Patients Lists",
};

const PageTitle = ({ classes, location, patientInfo }) => {
    const pathName = location.pathname;
    if (pagesWithTitle.indexOf(pathName) !== -1) {
        const title = titlesArray[pathName.replace('/', '')];
        return (
            <Typography className={classes.title}>
                {title ? title : "System Dashboard"}
            </Typography>
        );
    }
    return (
        <PatientBanner classes={classes} patientInfo={patientInfo} />
    );
}

export default PageTitle;