import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

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
    summaryContainer: {
        margin: 0,
        width: "100%",
    },
    card: {
        minHeight: 302,
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
        height: 100,
        backgroundColor: theme.patientSummaryPanel.topBlock.backgroundColor,
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
    },
    icon: {
        marginBottom: 10,
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
        const FeedsPanels = get(themeCommonElements, 'feedsPanels', false);
        return (
            <Grid className={classes.container} >
                <Breadcrumbs resource={breadcrumbsResource} />
                <SettingsDialog className={classes.settingsIcon} />
                <Grid className={classes.summaryContainer} spacing={16} container>
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
                    { FeedsPanels && <FeedsPanels /> }
                </Grid>
            </Grid>
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