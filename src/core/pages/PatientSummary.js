// For separate synopsis request to dev.ripple.foundation:8000

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

import * as coreSynopsisActions from '../actions/synopsisActions';
import * as nonCoreSynopsisActions from "../../version/actions/synopsisActions";
import { nonCoreSynopsisData } from "../../version/config/nonCoreSynopsis";

const synopsisActions = Object.assign(coreSynopsisActions, nonCoreSynopsisActions);
const synopsisActionsArray = Object.values(synopsisActions);

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
        const currentUserID = "9999999000";
        synopsisActionsArray.map(item => {
            item(currentUserID);
        });

    }

    render() {
        const { allergiesSynopsis, contactsSynopsis, medicationsSynopsis, problemsSynopsis } = this.props;

        const coreSynopsisData = [
            { title: "Allergies", list: "allergies", items: allergiesSynopsis, icon: allergiesIcon },
            { title: "Contacts", list: "contacts", items: contactsSynopsis, icon: contactsIcon },
            { title: "Medications", list: "medications", items: medicationsSynopsis, icon: medicationsIcon },
            { title: "Problems / Issues", list: "problems", items: problemsSynopsis, icon: problemsIcon },
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
                { nonCoreSynopsisData.map(item => {
                    return (
                        <DashboardCard
                          title={item.title}
                          list={item.list}
                          items={this.props[item.statePropsName]}
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

    const coreSynopsis = {
        allergiesSynopsis: get(state, "custom.allergiesSynopsis.data", []),
        contactsSynopsis: get(state, "custom.contactsSynopsis.data", []),
        medicationsSynopsis: get(state, "custom.medicationsSynopsis.data", []),
        problemsSynopsis: get(state, "custom.problemsSynopsis.data", []),
    };

    let nonCoreSynopsis = {};
    nonCoreSynopsisData.forEach(item => {
        nonCoreSynopsis[item.statePropsName] = get(state, "custom." + item.statePropsName + ".data", [])
    });

    return Object.assign(coreSynopsis, nonCoreSynopsis);
};

const mapDispatchToProps = dispatch => (synopsisActions);

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(PatientSummary);