// For common request about patient (for dev.ripple.foundation without 8000)
import React, { Component } from "react";
import { get } from "lodash";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import DashboardCard from "../../common/DashboardCard";
import { patientInfoAction } from "../../actions/patientInfoAction";
import { getSynopsisData } from "./functions";
import { mergeStyles } from "../../helpers";

import themeStyles from "../../../version/styles";

const coreStyles = {
    card: {
        display: "inline-block",
        width: "calc(25% - 20px)",
        float: "left",
        minHeight: "300px",
        margin: "10px",
        padding: "5px",
        boxSizing: "border-box"
    },
    media: {
        "background-color": "#2196f3"
    }
};

const styles = mergeStyles(coreStyles, get(themeStyles, 'patientSummaryPanel', {}))

class PatientSummaryInfo extends Component {

    componentDidMount() {
        const currentUserID = localStorage.getItem('userId');
        this.props.getPatientInfo(currentUserID);
    }

    render() {
        const { classes, patientInfo, loading } = this.props;
        const coreSynopsisData = getSynopsisData(patientInfo);
        return (
            <div className={classes.container}>
                {
                    coreSynopsisData.map(item => {
                        return (
                            <DashboardCard
                                id={item.id}
                                title={item.title}
                                list={item.list}
                                loading={loading}
                                items={item.items}
                                icon={item.icon}
                                {...this.props}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.patientInfo.data', null),
        loading: get(state, 'custom.patientInfo.loading', false)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientInfo(userId) {
            dispatch(patientInfoAction.request(userId));
        }
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PatientSummaryInfo);