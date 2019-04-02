import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { personalDetailsAction } from "../../actions/ReSPECT/personalDetailsAction";
import { summaryInformationAction } from "../../actions/ReSPECT/summaryInformationAction";
import { personalPreferencesAction } from "../../actions/ReSPECT/personalPreferencesAction";
import { clinicalRecommendationsAction } from "../../actions/ReSPECT/clinicalRecommendationsAction";
import { capacityAndRepresentationAction } from "../../actions/ReSPECT/capacityAndRepresentationAction";
import { involvementAction } from "../../actions/ReSPECT/involvenentAction";
import { clinicalSignaturesAction } from "../../actions/ReSPECT/clinicalSignaturesAction";
import { emergencyViewAction } from "../../actions/ReSPECT/emergencyViewAction";
import { confirmationAction } from "../../actions/ReSPECT/confirmationAction";
import { emergencyContactsAction } from "../../actions/ReSPECT/emergencyContactsAction";
import { versionsAction } from "../../actions/ReSPECT/versionsAction";

import Breadcrumbs from "../../../core/common/Breadcrumbs";
import RespectPageHeader from "./fragments/RespectPageHeader";
import TableHeadBlock from "./fragments/TableHeadBlock";
import TableBodyBlock from "./fragments/TableBodyBlock";
import CurrentSectionBlock from "./fragments/CurrentSectionBlock";
import sections from "./sections";

const styles = theme => ({
    root: {
        width: '100%',
    },
    mainBlock: {
        padding: 10,
    },
    blockTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    title: {
        color: "#fff",
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: "#e5e5e5",
            '& tr th span span': {
                color: "#000",
            },
            '& tr th': {
                paddingLeft: 10,
            },
            '& tr': {
                height: 48,
            },
        },
        '& tbody tr td': {
            paddingLeft: 10,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.mainColor,
        },
        '& tbody tr:hover td span': {
            color: "#fff"
        }
    },
});

class SectionsTable extends Component {

    state = {
        currentRow: this.props.sectionForShow ? this.props.sectionForShow : null,
    };

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.getSectionsInfo(userId);
        this.props.getVersionsInfo(userId);
    }

    onRowClick = id => {
        this.setState({
            currentRow: id,
        })
    };

    getCurrentSection = id => {
        let result = null;
        sections.forEach(item => {
            if (item.id === id) {
                result = item;
            }
        });
        return result;
    };

    render() {
        const { classes, sectionsInfo, toggleMode, versionsInfo, currentVersion, sectionForShow } = this.props;
        const { currentRow } = this.state;
        const breadcrumbsResource = [
            { url: null, title: "ReSPECT", isActive: false, onClickAction: toggleMode },
            { url: null, title: 'New Version', isActive: false }
        ];

        let isVersionInfo = false;
        let versionSectionsInfo = null;
        let latestVersionInfo = null;
        if (currentVersion && sectionForShow) {
            versionSectionsInfo = get(versionsInfo, [ [currentVersion - 1], 'sections' ], null);
            isVersionInfo = true;
        } else if (Array.isArray(versionsInfo) && versionsInfo.length > 0) {
            const versionsNumber = versionsInfo.length;
            latestVersionInfo = get(versionsInfo, [ [versionsNumber - 1], 'sections' ], null);
        }
        const currentSection = this.getCurrentSection(currentRow);

        return (
            <React.Fragment>
                <RespectPageHeader />
                <Breadcrumbs resource={breadcrumbsResource} />
                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12} sm={currentRow ? 6 : 12}>
                        <div className={classes.blockTitle}>
                            <Typography className={classes.title}>ReSPECT Sections</Typography>
                        </div>
                        <Paper className={classes.root}>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.tableList} aria-labelledby="tableTitle">
                                    <TableHeadBlock />
                                    <TableBodyBlock
                                        sections={sections}
                                        currentRow={currentRow}
                                        onRowClick={this.onRowClick}
                                        sectionsInfo={isVersionInfo ? versionSectionsInfo : sectionsInfo}
                                        latestVersionInfo={latestVersionInfo}
                                    />
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                    {
                        currentRow &&
                            <CurrentSectionBlock
                                currentSection={currentSection}
                                currentRow={currentRow}
                                onRowClick={this.onRowClick}
                                isVersionInfo={isVersionInfo}
                                sectionsInfo={isVersionInfo ? versionSectionsInfo : sectionsInfo}
                                latestVersionInfo={latestVersionInfo}
                                toggleMode={toggleMode}
                            />
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        sectionsInfo: {
            personalDetails: state.custom.personalDetails.data,
            summaryInformation: state.custom.summaryInformation.data,
            personalPreferences: state.custom.personalPreferences.data,
            clinicalRecommendations: state.custom.clinicalRecommendations.data,
            capacityAndRepresentation: state.custom.capacityAndRepresentation.data,
            involvement: state.custom.involvement.data,
            clinicalSignatures: state.custom.clinicalSignatures.data,
            emergencyView: state.custom.emergencyView.data,
            confirmation: state.custom.confirmation.data,
            emergencyContacts: state.custom.emergencyContacts.data,
        },
        versionsInfo: state.custom.versionsInfo.data,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSectionsInfo(userId) {
            dispatch(personalDetailsAction.request(userId));
            dispatch(summaryInformationAction.request(userId));
            dispatch(personalPreferencesAction.request(userId));
            dispatch(clinicalRecommendationsAction.request(userId));
            dispatch(capacityAndRepresentationAction.request(userId));
            dispatch(involvementAction.request(userId));
            dispatch(clinicalSignaturesAction.request(userId));
            dispatch(emergencyViewAction.request(userId));
            dispatch(confirmationAction.request(userId));
            dispatch(emergencyContactsAction.request(userId));
        },
        getVersionsInfo(userId) {
            dispatch(versionsAction.request(userId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SectionsTable));
