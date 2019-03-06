import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import moment from "moment";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import SystemInformationBlock from "../fragments/SystemInformationBlock";
import MainFormBlock from "../fragments/MainFormBlock";
import SectionToolbar from "../fragments/SectionToolbar";

const defaultValues = {
    dateCompleted: moment().format('DD-MMM-YYYY'),
};

const styles = theme => ({
    titleBlock: {
        paddingLeft: 25,
    },
    secondTitle: {
        fontSize: 20,
    },
    sectionLink: {
        color: theme.palette.mainColor,
        fontWeight: 800,
    },
    formGroup: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        boxSizing: "border-box",
    },
    formLabel: {
        display: "block",
        fontWeight: 800,
        color: "#000",
        fontSize: 14,
        marginBottom: 5,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
});

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

    render() {
        const { classes, personalDetails, title, onRowClick } = this.props;
        const { isMainPanel } = this.state;
        const filledValues = Object.assign({}, defaultValues, personalDetails);
        return (
            <React.Fragment>
                <MainFormBlock isMainPanel={isMainPanel} classes={classes} title={title} togglePanel={this.togglePanel}>
                    <div className={classes.titleBlock}>
                        <h1>Emergency (CPR) view</h1>
                        <p className={classes.secondTitle}>CPR attempts recommended</p>
                        <p>For more information, see <a className={classes.sectionLink} onClick={e => this.redirectToSection(e)}>Section 4</a> for the latest clinical recommendations</p>
                    </div>
                    <LocalForm  model="personalDetails">
                        <FormGroup className={classes.formGroup}>
                            <FormLabel className={classes.formLabel}>Date Completed</FormLabel>
                            <Control.text className={classes.formInput} model="personalDetails.dateCompleted" defaultValue={filledValues.dateCompleted} disabled />
                        </FormGroup>
                        <SectionToolbar onRowClick={onRowClick} />
                    </LocalForm>
                </MainFormBlock>
                <SystemInformationBlock isMainPanel={isMainPanel} togglePanel={this.togglePanel} classes={classes} info={personalDetails} />
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        emergencyView: state.custom.emergencyView.data,
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(EmergencyView));
