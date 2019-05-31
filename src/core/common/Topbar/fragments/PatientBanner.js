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
    const addressArray = [
        get(patientInfo, 'address', null),
        get(patientInfo, 'city', null),
        get(patientInfo, 'country', null),
        get(patientInfo, 'postCode', null)
    ];
    const doctor = get(patientInfo, 'gpName', null);
    const dateOfBirth = get(patientInfo, 'birthDate', null);
    const dateOfBirthConvert = moment(dateOfBirth).format('DD-MM-YYYY');
    return (
        <Grid className={classes.patientInfo} container spacing={24}>
            <Grid className={classes.gridBlock} item xs={12} lg={8}>
                <Typography variant="h6">
                    <span className={classes.keyName}>{get(patientInfo, 'name', null)}</span>
                </Typography>
                { doctor &&
                    <Typography variant="body2">
                        <span className={classes.keyName}>Doctor: </span>
                        {doctor}
                    </Typography>
                }
            </Grid>
            <Grid className={classes.gridBlock} item xs={6} lg={2}>
                {
                    dateOfBirthConvert &&
                    <Typography variant="body2">
                        <span className={classes.keyName}>D.O.B.: </span>
                        {dateOfBirthConvert}
                    </Typography>
                }
                <Typography variant="body2">
                    <span className={classes.keyName}>Phone: </span>
                    <span className={classes.keyName}>{get(patientInfo, 'phone', null)}</span>
                </Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={6} lg={2}>
                <Typography variant="body2">
                    <span className={classes.keyName}>Gender: </span>
                    <span className={classes.keyName}>{ get(patientInfo, 'gender', null) }</span>
                </Typography>
                <Typography variant="body2">
                    <span className={classes.keyName}>CHI No.: </span>
                    { get(patientInfo, 'nhsNumber', null) }</Typography>
            </Grid>
            <Grid className={classes.gridBlock} item xs={12}>
                <Typography variant="body2">
                    <span className={classes.keyName}>Address: </span>
                    <span className={classes.keyName}>{addressArray.join(', ')}</span>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PatientBanner;