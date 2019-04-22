import React, { Component } from 'react';
import get from "lodash/get";
import { connect } from 'react-redux';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MainFormBlock from "../fragments/MainFormBlock";
import formStyles from "../fragments/formStyles";
import { cprVariants } from "../fragments/cprVariants";

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

    render() {
        const { classes, title, isVersionInfo } = this.props;
        const { isMainPanel } = this.state;
        return (
            <React.Fragment>
                <MainFormBlock isVersionInfo={isVersionInfo} isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <div className={classes.titleBlock}>
                        <Typography variant="h1" className={classes.firstTitle}>Emergency (CPR) view</Typography>
                        <Typography className={classes.secondTitle}>{this.getCprLabel()}</Typography>
                        <Typography>For more information, see <a className={classes.sectionLink} onClick={e => this.redirectToSection(e, 4)}>Section 4</a> for the latest clinical recommendations</Typography>
                    </div>
                </MainFormBlock>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        clinicalRecommendations: state.custom.clinicalRecommendations.data,
        emergencyView: state.custom.emergencyView.data,
    }
};

export default connect(mapStateToProps, null)(withStyles(formStyles)(EmergencyView));
