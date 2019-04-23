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
import { getAuthorName, getEmptyJson } from "../../functions";

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

    componentWillUnmount() {
        this.props.removeFormData();
    }

    onClickHandler() {
        const { versionsList, firstVersionInfo } = this.props;

        let sourceId = null;
        let versionId = null;

        if (firstVersionInfo) {
            const host = get(firstVersionInfo, 'host', null);
            const compositionId = get(firstVersionInfo, 'compositionUid', null);
            const compositionIdArray = compositionId.split('::');
            sourceId = host + '-' + get(compositionIdArray, [0], null);
            versionId = get(compositionIdArray, [2], null);
        } else if (Array.isArray(versionsList)) {
            const latestVersion = versionsList[0];
            sourceId = latestVersion.sourceId;
            versionId = latestVersion.version;
        }

        let versionData = {
            author: getAuthorName(),
            dateCreated: moment().format(DATE_FORMAT),
            status: STATUS_COMPLETED,
            summaryInformation: this.props.summaryInformation ? this.props.summaryInformation : getEmptyJson('summaryInformation'),
            personalPreferences: this.props.personalPreferences ? this.props.personalPreferences : getEmptyJson('personalPreferences'),
            clinicalRecommendations: this.props.clinicalRecommendations ? this.props.clinicalRecommendations : getEmptyJson('personalPreferences'),
            capacityAndRepresentation: this.props.capacityAndRepresentation ? this.props.capacityAndRepresentation : getEmptyJson('capacityAndRepresentation'),
            involvement: this.props.involvement ? this.props.involvement : getEmptyJson('involvement'),
            clinicalSignatures: this.props.clinicalSignatures ? this.props.clinicalSignatures : getEmptyJson('clinicalSignatures'),
            emergencyContacts: this.props.emergencyContacts ? this.props.emergencyContacts : getEmptyJson('emergencyContacts'),
            confirmation: this.props.confirmation ? this.props.confirmation : getEmptyJson('confirmation'),
        };

        if (sourceId && versionId) {
            this.props.updateVersion(sourceId, versionId, versionData);
            this.props.toggleMode();
        }
    };

    render() {
        const { classes, isVersionInfo, clinicalRecommendations, involvement } = this.props;
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
        },
        removeFormData() {
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PublishButton))