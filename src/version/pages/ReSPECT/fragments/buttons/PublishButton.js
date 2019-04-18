import React, { Component } from "react";
import get from "lodash/get";
import moment from "moment";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';

import { versionsServerAction } from "../../../../actions/ReSPECT/versionsServerAction";
import { personalDetailsAction } from "../../../../actions/ReSPECT/personalDetailsAction";
import { summaryInformationAction } from "../../../../actions/ReSPECT/summaryInformationAction";
import { personalPreferencesAction } from "../../../../actions/ReSPECT/personalPreferencesAction";
import { clinicalRecommendationsAction } from "../../../../actions/ReSPECT/clinicalRecommendationsAction";
import { capacityAndRepresentationAction } from "../../../../actions/ReSPECT/capacityAndRepresentationAction";
import { involvementAction } from "../../../../actions/ReSPECT/involvenentAction";
import { clinicalSignaturesAction } from "../../../../actions/ReSPECT/clinicalSignaturesAction";
import { emergencyViewAction } from "../../../../actions/ReSPECT/emergencyViewAction";
import { confirmationAction } from "../../../../actions/ReSPECT/confirmationAction";
import { emergencyContactsAction } from "../../../../actions/ReSPECT/emergencyContactsAction";

import { STATUS_COMPLETED, DATE_FORMAT } from "../../statuses";
import { getAuthorName } from "../../functions";

const styles = theme => ({
    publishButton: {
        display: "block",
        float: "right",
        width: 100,
        height: 40,
        margin: 8,
        padding: 0,
        backgroundColor: "white",
        color: theme.palette.mainColor,
        border: `1px solid ${theme.palette.mainColor}`,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            backgroundColor: theme.palette.mainColor,
            color: "white",
        }
    }
});

class PublishButton extends Component {

    onClickHandler() {
        const { versionsList } = this.props;
        let latestVersion = null;
        if (Array.isArray(versionsList)) {
            const versionsNumber = versionsList.length;
            latestVersion = versionsList[versionsNumber - 1];
        }

        let versionData = {
            author: getAuthorName(),
            dateCreated: moment().format(DATE_FORMAT),
            status: STATUS_COMPLETED,
            summaryInformation: this.props.summaryInformation,
            personalPreferences: this.props.personalPreferences,
            clinicalRecommendations: this.props.clinicalRecommendations,
            capacityAndRepresentation: this.props.capacityAndRepresentation,
            involvement: this.props.involvement,
            clinicalSignatures: this.props.clinicalSignatures,
            emergencyContacts: this.props.emergencyContacts,
            confirmation: this.props.confirmation,
        };

        if (latestVersion) {
            this.props.updateVersion(latestVersion.sourceId, latestVersion.version, versionData);
            this.props.toggleMode();
        }
    };

    render() {
        const { classes, isVersionInfo, versionsList, clinicalRecommendations, involvement } = this.props;
        if (!isVersionInfo && get(clinicalRecommendations, 'status', null) === STATUS_COMPLETED && get(involvement, 'status', null) === STATUS_COMPLETED) {
            return (
                <Tooltip title="Publish">
                    <IconButton aria-label="Publish" className={classes.publishButton} onClick={() => this.onClickHandler()}>
                        <DoneIcon /> Publish
                    </IconButton>
                </Tooltip>
            );
        }
        return null;
    }

};

const mapStateToProps = state => {
    return {
        summaryInformation: state.custom.summaryInformation.data,
        personalPreferences: state.custom.personalPreferences.data,
        clinicalRecommendations: state.custom.clinicalRecommendations.data,
        capacityAndRepresentation: state.custom.capacityAndRepresentation.data,
        involvement: state.custom.involvement.data,
        clinicalSignatures: state.custom.clinicalSignatures.data,
        emergencyContacts: state.custom.emergencyContacts.data,
        confirmation: state.custom.confirmation.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateVersion(sourceId, versionId, versionData) {
            dispatch(versionsServerAction.put(sourceId, versionId, versionData));
            dispatch(personalDetailsAction.remove());
            dispatch(summaryInformationAction.remove());
            dispatch(personalPreferencesAction.remove());
            dispatch(clinicalRecommendationsAction.remove());
            dispatch(capacityAndRepresentationAction.remove());
            dispatch(involvementAction.remove());
            dispatch(clinicalSignaturesAction.remove());
            dispatch(emergencyViewAction.remove());
            dispatch(confirmationAction.remove());
            dispatch(emergencyContactsAction.remove());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublishButton))