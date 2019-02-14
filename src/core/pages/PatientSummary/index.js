import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";

import DashboardCard from "../../common/DashboardCard";
import {
    synopsisAllergiesAction,
    synopsisContactsAction,
    synopsisMedicationsAction,
    synopsisProblemsAction } from "../../actions/synopsisActions";
import { synopsisData, getSynopsisProps, SHOW_ALL } from "./config";
import SettingsDialog from "./SettingsDialog";
import Breadcrumbs from "../../common/Breadcrumbs";

import { themeCommonElements } from "../../../version/config/theme.config";
import { nonCoreSynopsisActions } from "../../../version/config/nonCoreSynopsis";

const styles = theme => ({
    card: {
        display: "inline-block",
        width: "calc(25% - 20px)",
        minHeight: 302,
        float: "left",
        margin: "10px",
        padding: "5px",
        boxSizing: "border-box"
    },
    media: {
        backgroundColor: theme.patientSummaryPanel.media.backgroundColor,
    },
    container: {
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: "100px",
        backgroundColor: theme.patientSummaryPanel.topBlock.backgroundColor,
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    },
    icon: {
        marginBottom: "10px",
    },
    title: {
        marginBottom: 0,
    },
    list: {
        padding: 0,
    },
    listItem: {
        fontSize: "1rem",
    },
});

class PatientSummaryInfo extends Component {

    componentDidMount() {
        const currentUserID = localStorage.getItem('userId');
        this.props.getPatientSynopsis(currentUserID);
    }

    render() {
        const { classes, loading, showMode, showHeadings, location } = this.props;
        const breadcrumbsResource = [
            { url: location.pathname, title: "Patient Summary", isActive: false }
        ];
        const NonCorePanels = get(themeCommonElements, 'nonCorePanels', false);
        return (
            <div className={classes.container} >
                <Breadcrumbs resource={breadcrumbsResource} />
                <SettingsDialog className={classes.settingsIcon} />
                <div>
                    {
                        synopsisData.map((item, key) => {
                            return (
                                <DashboardCard
                                    key={key}
                                    showMode={showMode}
                                    showHeadings={showHeadings}
                                    id={item.id}
                                    title={item.title}
                                    list={item.list}
                                    loading={loading}
                                    items={get(this.props, item.list, [])}
                                    icon={item.icon}
                                    {...this.props}
                                />
                            );
                        })
                    }
                    <NonCorePanels />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    const patientSummaryProps = {
        loading: state.custom.patientInfo.loading,
        showMode: state.custom.showMode.data,
        showHeadings: state.custom.showHeadings.data,
    };

    const synopsisProps = getSynopsisProps(state);

    return Object.assign({}, patientSummaryProps, synopsisProps);
};

const mapDispatchToProps = dispatch => {

    const coreSynopsisActions = [
        synopsisAllergiesAction,
        synopsisContactsAction,
        synopsisProblemsAction,
        synopsisMedicationsAction,
    ];

    const synopsisActions = coreSynopsisActions.concat(nonCoreSynopsisActions);

    return {
        getPatientSynopsis(userId) {
            synopsisActions.map(item => {
                return dispatch(item.request(userId));
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientSummaryInfo));