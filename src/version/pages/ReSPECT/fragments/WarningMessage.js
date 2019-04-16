import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import formStyles from "../fragments/formStyles";
import { STATUS_COMPLETED } from "../statuses";

class WarningMessage extends Component {

    redirectToSection = (e, sectionNumber) => {
        e.preventDefault();
        this.props.onRowClick(sectionNumber);
    };

    render() {
        const { classes, isVersionInfo, clinicalRecommendations, involvement } = this.props;
        if (isVersionInfo || (get(clinicalRecommendations, 'status', null) === STATUS_COMPLETED && get(involvement, 'status', null) === STATUS_COMPLETED)) {
            return null;
        }
        return (
            <div className={classes.warningBlock}>
                <Typography>
                    Please ensure you completed <a className={classes.sectionLink} onClick={e => this.redirectToSection(e, 4)}>section 4</a> and <a className={classes.sectionLink} onClick={e => this.redirectToSection(e, 6)}>section 6</a>
                </Typography>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        clinicalRecommendations: state.custom.clinicalRecommendations.data,
        involvement: state.custom.involvement.data,
    }
};

export default connect(mapStateToProps, null)(withStyles(formStyles)(WarningMessage));
