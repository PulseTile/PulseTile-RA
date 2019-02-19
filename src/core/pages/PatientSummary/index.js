import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import DashboardCard from "../../common/DashboardCard";
import { patientInfoAction } from "../../actions/patientInfoAction";
import { synopsisData, SHOW_ALL } from "./config";
import SettingsDialog from "./SettingsDialog";
import Breadcrumbs from "../../common/Breadcrumbs";
import { themeCommonElements } from "../../../version/config/theme.config";

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
});

class PatientSummaryInfo extends Component {

    componentDidMount() {
        const currentUserID = localStorage.getItem('userId');
        this.props.getPatientInfo(currentUserID);
    }

    render() {
        const { classes, patientInfo, loading, showMode, showHeadings, location } = this.props;
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
                                    items={get(patientInfo, item.list, [])}
                                    icon={item.icon}
                                    {...this.props}
                                />
                            );
                        })
                    }
                    <FeedsPanels />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        patientInfo: state.custom.patientInfo.data,
        loading: state.custom.patientInfo.loading,
        showMode: state.custom.showMode.data,
        showHeadings: state.custom.showHeadings.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientInfo(userId) {
            dispatch(patientInfoAction.request(userId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientSummaryInfo));