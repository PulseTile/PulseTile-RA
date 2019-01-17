// For common request about patient (for dev.ripple.foundation without 8000)
import React, { Component } from "react";
import { get } from "lodash";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import { faAllergies, faPhone, faCapsules, faNotesMedical  } from '@fortawesome/free-solid-svg-icons';

import DashboardCard from "../common/DashboardCard";
import { patientInfoAction } from "../actions/patientInfoAction";
import styles from "../styles";

class PatientSummaryInfo extends Component {

    componentDidMount() {
        const currentUserID = localStorage.getItem('userId');
        this.props.getPatientInfo(currentUserID);
    }

    render() {
        const { patientInfo, loading } = this.props;

        const coreSynopsisData = [
            { title: "Allergies", list: "allergies", items: get(patientInfo, 'allergies', []), icon: faAllergies },
            { title: "Contacts", list: "contacts", items: get(patientInfo, 'contacts', []), icon: faPhone },
            { title: "Medications", list: "medications", items: get(patientInfo, 'medications', []), icon: faCapsules },
            { title: "Problems / Issues", list: "problems", items: get(patientInfo, 'problems', []), icon: faNotesMedical },
        ];

        return coreSynopsisData.map(item => {
            return (
                <DashboardCard
                    title={item.title}
                    list={item.list}
                    loading={loading}
                    items={item.items}
                    icon={item.icon}
                    {...this.props}
                />
            );
        });
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
    withStyles(styles.patientSummaryPanel),
    connect(mapStateToProps, mapDispatchToProps)
)(PatientSummaryInfo);