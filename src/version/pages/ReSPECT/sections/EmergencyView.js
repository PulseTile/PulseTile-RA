import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { personalDetailsAction } from "../../../actions/ReSPECT/personalDetailsAction";
import { summaryInformationAction } from "../../../actions/ReSPECT/summaryInformationAction";
import { personalPreferencesAction } from "../../../actions/ReSPECT/personalPreferencesAction";
import { clinicalRecommendationsAction } from "../../../actions/ReSPECT/clinicalRecommendationsAction";
import { capacityAndRepresentationAction } from "../../../actions/ReSPECT/capacityAndRepresentationAction";
import { involvementAction } from "../../../actions/ReSPECT/involvenentAction";
import { clinicalSignaturesAction } from "../../../actions/ReSPECT/clinicalSignaturesAction";
import { emergencyViewAction } from "../../../actions/ReSPECT/emergencyViewAction";
import { confirmationAction } from "../../../actions/ReSPECT/confirmationAction";
import { emergencyContactsAction } from "../../../actions/ReSPECT/emergencyContactsAction";
import { versionsAction } from "../../../actions/ReSPECT/versionsAction";

import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { getAuthorName } from "../functions";
import sections from "../sections";
import { STATUS_INCOMPLETE, STATUS_IN_PROGRESS, STATUS_COMPLETED, TOTAL_ROWS_NUMBER, DATE_FORMAT, TIME_FORMAT } from "../statuses";
import formStyles from "../fragments/formStyles";
import { cprVariants } from "../fragments/cprVariants";
import WarningMessage from "../fragments/WarningMessage";

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
    author: localStorage.getItem('username'),
};

class EmergencyView extends Component {

    state = {
        isMainPanel: true,
    };

    togglePanel = () => {
        this.setState({
            isMainPanel: !this.state.isMainPanel,
        });
    };

    redirectToSection = (e, sectionNumber) => {
        e.preventDefault();
        this.props.onRowClick(sectionNumber);
    };

    getVersionStatus = sectionsInfo => {
        let completedSectionsCount = 0;
        sections.forEach(item => {
            if (get(sectionsInfo, [item.name, 'status'], null) === STATUS_COMPLETED) {
                completedSectionsCount++;
            }
        });
        let result = STATUS_INCOMPLETE;
        if (completedSectionsCount === TOTAL_ROWS_NUMBER) {
            result = STATUS_COMPLETED;
        } else if (completedSectionsCount > 0) {
            result = STATUS_IN_PROGRESS;
        }
        return result;
    };

    getCprLabel = () => {
        const { clinicalRecommendations, sectionsInfo, isVersionInfo } = this.props;
        const cprValue = isVersionInfo
            ? get(sectionsInfo, 'clinicalRecommendations.cprValue', null)
            : get(clinicalRecommendations, 'cprValue', null);
        let result = null;
        cprVariants.forEach(item => {
            if (item.id === cprValue) {
                result = item.mainTitle;
            }
        });
        return result;
    };

    submitForm = data => {
        const { sectionsInfo, versionsInfo, toggleMode, createNewVersion } = this.props;
        sectionsInfo.emergencyView = {
            status: STATUS_COMPLETED,
            dateCompleted: moment().format(DATE_FORMAT),
            author: getAuthorName(),
        };
        const formData = {
            sections: sectionsInfo,
            status: this.getVersionStatus(sectionsInfo),
            dateCompleted: moment().format(DATE_FORMAT),
            timeCompleted: moment().format(TIME_FORMAT),
            author: getAuthorName(),
        };
        const updateVersionsInfo = Array.isArray(versionsInfo) ? versionsInfo.concat(formData) : [formData];
        createNewVersion(updateVersionsInfo);
        toggleMode();
    };

    render() {
        const { classes, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel } = this.state;
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <WarningMessage isVersionInfo={isVersionInfo} onRowClick={onRowClick} />
                    <div className={classes.titleBlock}>
                        <Typography variant="h1" className={classes.firstTitle}>Emergency (CPR) view</Typography>
                        <Typography className={classes.secondTitle}>{this.getCprLabel()}</Typography>
                        <Typography>For more information, see <a className={classes.sectionLink} onClick={e => this.redirectToSection(e, 4)}>Section 4</a> for the latest clinical recommendations</Typography>
                    </div>
                    <LocalForm onSubmit={values => this.submitForm(values)} model="personalDetails">
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>
                </MainFormBlock>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        clinicalRecommendations: state.custom.clinicalRecommendations.data,
        emergencyView: state.custom.emergencyView.data,
        versionsInfo: state.custom.versionsInfo.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createNewVersion(data) {
            dispatch(versionsAction.create(data));
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(formStyles)(EmergencyView));
