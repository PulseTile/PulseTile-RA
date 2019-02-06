import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";

import DashboardCard from "../../common/DashboardCard";
import { patientInfoAction } from "../../actions/patientInfoAction";
import { synopsisData, SHOW_ALL } from "./config";
import SettingsDialog from "./SettingsDialog";
import Breadcrumbs from "../../common/Breadcrumbs";
import { themeCommonElements } from "../../../version/config/theme.config";

const styles = theme => ({
    card: {
        display: "inline-block",
        width: "calc(25% - 20px)",
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
                                    items={get(patientInfo, item.list, [])}
                                    icon={item.icon}
                                    {...this.props}
                                />
                            );
                        })
                    }
                    { NonCorePanels && <NonCorePanels /> }
                </div>
            </div>
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