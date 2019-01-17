import React from "react";
import { get } from "lodash";

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
    const pathName = get(location, 'pathname', null);
    if (-1 !== pagesWithTitle.indexOf(pathName)) {
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