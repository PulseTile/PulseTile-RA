import React from "react";
import get from "lodash/get";

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
    const addressArray = [
        get(patientInfo, 'address', null),
        get(patientInfo, 'city', null),
        get(patientInfo, 'country', null),
        get(patientInfo, 'postCode', null)
    ];
    return (
        <Grid className={classes.patientInfo} container spacing={24}>
            <Grid className={classes.gridBlock} item xs={12} lg={8}>
                <Typography>
                    {get(patientInfo, 'name', null)}
                </Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={6} lg={2}>
                <Typography>
                    <span className={classes.keyName}>D.O.B.: </span>
                    {get(patientInfo, 'dateOfBirth', null)}</Typography>
                <Typography>
                    <span className={classes.keyName}>Phone: </span>
                    {get(patientInfo, 'phone', null)}
                </Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={6} lg={2}>
                <Typography>
                    <span className={classes.keyName}>Gender: </span>
                    { get(patientInfo, 'gender', null) }
                </Typography>
                <Typography>
                    <span className={classes.keyName}>NHS No.: </span>
                    { get(patientInfo, 'nhsNumber', null) }</Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={12}>
                <Typography>
                    <span className={classes.keyName}>Address: </span>
                    {addressArray.join(', ')}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PatientBanner;
