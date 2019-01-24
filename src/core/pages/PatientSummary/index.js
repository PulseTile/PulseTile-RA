import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";

import DashboardCard from "../../common/DashboardCard";
import { patientInfoAction } from "../../actions/patientInfoAction";
import { synopsisData, SHOW_ALL } from "./config";
import { mergeStyles } from "../../helpers";
import SettingsDialog from "./SettingsDialog";
import themeStyles from "../../../version/styles";
import Breadcrumbs from "../../common/Breadcrumbs";

const coreStyles = {
    card: {
        display: "inline-block",
        width: "calc(25% - 20px)",
        float: "left",
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
        const { classes, patientInfo, loading, showMode, showHeadings, location } = this.props;
        const breadcrumbsResource = [
            { url: location.pathname, title: "Patient Summary", isActive: false }
        ];
        return (
            <div className={classes.container} >
                <Breadcrumbs resource={breadcrumbsResource} />
                <SettingsDialog />
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