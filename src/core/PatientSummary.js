import React, { Component } from "react";
import { get } from "lodash";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";

import allergiesIcon from "./images/banners/allergies.jpg";
import medicationsIcon from "./images/banners/medications.jpg";
import contactsIcon from "./images/banners/contacts.jpg";
import problemsIcon from "./images/banners/problems.jpg";

import DashboardCard from "./common/DashboardCard";

import {
    allergiesSynopsisAction,
    contactsSynopsisAction,
    medicationsSynopsisAction,
    problemsSynopsisAction
} from './actions/synopsisActions';


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

class PatientSummary extends Component {

    componentDidMount() {
        const { allergiesSynopsisAction, contactsSynopsisAction } = this.props;

        const currentUserID = "9999999000";

        allergiesSynopsisAction(currentUserID);
        contactsSynopsisAction(currentUserID);
        medicationsSynopsisAction(currentUserID);
        problemsSynopsisAction(currentUserID);
    }

    render() {
        const { allergiesSynopsis, contactsSynopsis, medicationsSynopsis, problemsSynopsis } = this.props;

        const summaryArray = [
            { title: "Allergies", list: "allergies", items: allergiesSynopsis, icon: allergiesIcon },
            { title: "Contacts", list: "contacts", items: contactsSynopsis, icon: contactsIcon },
            { title: "Medications", list: "medications", items: medicationsSynopsis, icon: medicationsIcon },
            { title: "Problems / Issues", list: "problems", items: problemsSynopsis, icon: problemsIcon },
        ];

        return (
            <div>
                { summaryArray.map(item => {
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
        allergiesSynopsis: get(state, "custom.allergiesSynopsis.data", []),
        contactsSynopsis: get(state, "custom.contactsSynopsis.data", []),
        medicationsSynopsis: get(state, "custom.medicationsSynopsis.data", []),
        problemsSynopsis: get(state, "custom.problemsSynopsis.data", []),
    }
};

const mapDispatchToProps = dispatch => ({
    allergiesSynopsisAction,
    contactsSynopsisAction,
    medicationsSynopsisAction,
    problemsSynopsisAction,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PatientSummary);