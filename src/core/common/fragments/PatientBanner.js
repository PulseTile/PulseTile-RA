import React from "react";
import { get } from "lodash";
import moment from "moment";

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
        <div className={classes.patientInfo}>
            <div className={classes.patientInfoColumn}>
                <Typography variant="h6">{get(patientInfo, 'name', null)}</Typography>
                <Typography>Doctor: {get(patientInfo, 'gpName', null)}</Typography>
                <Typography>Address: {get(patientInfo, 'address', null)}</Typography>
            </div>
            <div className={classes.patientInfoColumn}>
                <Typography>D.O.B.: { moment(get(patientInfo, 'dateOfBirth', null)).format('DD-MMM-YYYY') }</Typography>
                <Typography>Phone: {get(patientInfo, 'telephone', null)}</Typography>
            </div>
            <div className={classes.patientInfoColumn}>
                <Typography>Gender: { get(patientInfo, 'gender', null) }</Typography>
                <Typography>NHS No.: { get(patientInfo, 'nhsNumber', null) }</Typography>
            </div>
        </div>
    );
};

export default PatientBanner;
