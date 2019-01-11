// For common request about patient (for dev.ripple.foundation without 8000)
import React, { Component } from "react";
import { get } from "lodash";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import allergiesIcon from "../images/banners/allergies.jpg";
import medicationsIcon from "../images/banners/medications.jpg";
import contactsIcon from "../images/banners/contacts.jpg";
import problemsIcon from "../images/banners/problems.jpg";

import DashboardCard from "../common/DashboardCard";

import { patientInfoAction } from "../actions/patientInfoAction";

const styles = {
    card: {
        display: "inline-block",
        width: "25%",
        minWidth: "350px",
        minHeight: "450px",
        margin: "10px",
        padding: "5px"
    },
    media: {
        "background-color": "#2196f3"
    }
};

class PatientSummaryInfo extends Component {

    componentDidMount() {
        const currentUserID = localStorage.getItem('userId');
        this.props.getPatientInfo(currentUserID);
    }

    render() {
        const { patientInfo } = this.props;

        const coreSynopsisData = [
            { title: "Allergies", list: "allergies", items: get(patientInfo, 'allergies', []), icon: allergiesIcon },
            { title: "Contacts", list: "contacts", items: get(patientInfo, 'contacts', []), icon: contactsIcon },
            { title: "Medications", list: "medications", items: get(patientInfo, 'medications', []), icon: medicationsIcon },
            { title: "Problems / Issues", list: "problems", items: get(patientInfo, 'problems', []), icon: problemsIcon },
        ];

        return (
            <div>
                { coreSynopsisData.map(item => {
                    return (
                        <DashboardCard
                            title={item.title}
                            list={item.list}
                            items={item.items}
                            icon={item.icon}
                            {...this.props}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.patientInfo.data', null)
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