import React from "react";
import get from "lodash/get";
import moment from "moment";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/**
 * This component returnts banner with Patient information
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {shape} patientInfo
 * @constructor
 */
const PatientBanner = ({ classes, patientInfo }) => {
    return (
        <Grid className={classes.patientInfo} container spacing={24}>
            <Grid className={classes.gridBlock} item xs={12} lg={8}>
                <Typography variant="h6">
                    {get(patientInfo, 'name', null)}
                </Typography>
                <Typography variant="body2">
                    <span className={classes.keyName}>Doctor: </span>
                    {get(patientInfo, 'gpName', null)}
                </Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={6} lg={2}>
                <Typography variant="body2">
                    <span className={classes.keyName}>D.O.B.: </span>
                    { moment(get(patientInfo, 'dateOfBirth', null)).format('DD-MMM-YYYY') }</Typography>
                <Typography variant="body2">
                    <span className={classes.keyName}>Phone: </span>
                    {get(patientInfo, 'phone', null)}
                </Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={6} lg={2}>
                <Typography variant="body2">
                    <span className={classes.keyName}>Gender: </span>
                    { get(patientInfo, 'gender', null) }
                </Typography>
                <Typography variant="body2">
                    <span className={classes.keyName}>NHS No.: </span>
                    { get(patientInfo, 'nhsNumber', null) }</Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={12}>
                <Typography variant="body2">
                    <span className={classes.keyName}>Address: </span>
                    {get(patientInfo, 'address', null)}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PatientBanner;
