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
        borderRadius: 0,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
    },
    container: {
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: 100,
        backgroundColor: theme.palette.mainColor,
        background: theme.patientSummaryPanel.topBlock.background,
        backgroundSize: "cover",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        '&:hover': {
            cursor: "pointer",
        }
    },
    icon: {
        marginBottom: 10,
    },
    mainHeading: {
        margin: 0,
    },
    title: {
        marginBottom: 0,
        color: "#fff",
        fontSize: 20,
        fontWeight: 800,
    },
    list: {
        padding: 0,
        backgroundColor: "#fff",
        border: "1px solid #e5e5e5",
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 15,
        fontSize: "1rem",
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
    emptyRows: {
        height: 150,
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
});

class PatientSummaryInfo extends Component {

    componentDidMount() {
        this.props.getPatientSynopsis();
    }

    render() {
        const { classes, loading, showMode, showHeadings, location } = this.props;
        const breadcrumbsResource = [
            { url: location.pathname, title: "Patient Summary", isActive: false }
        ];
        const FeedsPanels = get(themeCommonElements, 'feedsPanels', false);
        const RespectPanel = get(themeCommonElements, 'respectPanel', false);
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
                    { RespectPanel && <RespectPanel showMode={showMode} {...this.props} /> }
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {

    const patientSummaryProps = {
        loading: state.custom.demographics.loading,
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
        getPatientSynopsis() {
            synopsisActions.map(item => {
                return dispatch(item.request());
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientSummaryInfo));