import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

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

import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";
import { getAuthorName } from "../functions";
import sections from "../sections";
import { STATUS_INCOMPLETE, STATUS_IN_PROGRESS, STATUS_COMPLETED, TOTAL_ROWS_NUMBER } from "../statuses";
import formStyles from "../fragments/formStyles";
import cprVariants from "../fragments/cprVariants";

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

    redirectToSection = e => {
        e.preventDefault();
        this.props.onRowClick(4);
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
            dateCompleted: moment().format('DD-MMM-YYYY HH:mm'),
            author: getAuthorName(),
        };
        const formData = {
            sections: sectionsInfo,
            status: this.getVersionStatus(sectionsInfo),
            dateCompleted: moment().format('DD-MMM-YYYY HH:mm'),
            author: getAuthorName(),
        };
        const updateVersionsInfo = Array.isArray(versionsInfo) ? versionsInfo.concat(formData) : [formData];
        createNewVersion(updateVersionsInfo);
        toggleMode();
    };

    render() {
        const { classes, emergencyView, title, onRowClick, isVersionInfo } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = Object.assign({}, defaultValues, emergencyView);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <div className={classes.titleBlock}>
                        <h1>Emergency (CPR) view</h1>
                        <p className={classes.secondTitle}>{this.getCprLabel()}</p>
                        <p>For more information, see <a className={classes.sectionLink} onClick={e => this.redirectToSection(e)}>Section 4</a> for the latest clinical recommendations</p>
                    </div>
                    <LocalForm onSubmit={values => this.submitForm(values)} model="personalDetails">
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="personalDetails.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        { !isVersionInfo && <SectionToolbar onRowClick={onRowClick} /> }
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock classes={classes} modelName="personalDetails" filledValues={filledValues} />
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
