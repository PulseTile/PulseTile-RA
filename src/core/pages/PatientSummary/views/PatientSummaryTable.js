import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";

import DashboardCard from "../../../common/DashboardCard";
import { themeCommonElements } from "../../../../version/config/theme.config";
import {getSynopsisProps, synopsisData} from "../config";

const styles = theme => ({
    card: {
        borderRadius: 0,
        boxShadow: theme.isOldDesign ? "0px 2px 4px rgba(0, 0, 0, 0.3)" : null,
    },
    media: {
        backgroundColor: theme.palette.mainColor,
    },
    topBlock: {
        display: "flex",
        flexDirection: "column",
        height: theme.isOldDesign ? 50 : 100,
        backgroundColor: theme.palette.tableHeadColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        color: theme.palette.mainColor,
        border: theme.isOldDesign ? `1px solid ${theme.palette.borderColor}` : null,
        '&:hover': {
            cursor: "pointer",
        },
    },
    icon: {
        marginBottom: 10,
        zIndex: 99999999,
    },
    mainHeading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
        zIndex: 99999999,
        '& svg': {
            color: theme.palette.fontColor,
        }
    },
    title: {
        marginBottom: 0,
        color: theme.palette.fontColor,
        fontSize: 18,
        fontWeight: 600,
        zIndex: 99999999,
    },
    list: {
        padding: 0,
        zIndex: 99999999,
    },
    listItemNoData: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 15,
        zIndex: 99999999,
        fontSize: "1rem",
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "justify",
        height: 48,
        paddingLeft: 15,
        paddingRight: 15,
        zIndex: 99999999,
        fontSize: "1rem",
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
        cursor: "pointer",
        color: theme.palette.fontColor,
        '&:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
            '& p': {
                color: theme.palette.paperColor,
            },
            '& svg': {
                color: theme.palette.paperColor,
            }
        }
    },
    emptyRows: {
        height: 150,
        zIndex: 99999999,
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
});

class PatientSummaryTable extends Component {

    render() {
        const { classes, history, loading, showMode, showHeadings } = this.props;
        const FeedsPanels = get(themeCommonElements, 'feedsPanels', false);
        const RespectPanel = get(themeCommonElements, 'respectPanel', false);
        return (
            <React.Fragment>
                {
                    synopsisData.map((item, key) => {
                        if (get(item, 'isSynopsis', false)) {
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
                        }
                    })
                }
                { FeedsPanels && <FeedsPanels /> }
                { RespectPanel && <RespectPanel showMode={showMode} {...this.props} /> }
            </React.Fragment>
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

export default connect(mapStateToProps, null)(withStyles(styles)(PatientSummaryTable));