import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';

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
import { versionsServerAction } from "../../actions/ReSPECT/versionsServerAction";

import Breadcrumbs from "../../../core/common/Breadcrumbs";
import RespectPageHeader from "./fragments/RespectPageHeader";
import TableHeadBlock from "./fragments/TableHeadBlock";
import TableBodyBlock from "./fragments/TableBodyBlock";
import CurrentSectionBlock from "./fragments/CurrentSectionBlock";
import PublishButton from "./fragments/buttons/PublishButton";
import sections from "./sections";
import createPDF from "./fragments/pdfTool";

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        background: theme.patientSummaryPanel.container.background,
        backgroundSize: "cover",
    },
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
        color: theme.palette.fontColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    title: {
        color: theme.palette.fontColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 400,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: theme.palette.tableHeadColor,
            '& tr th span span': {
                color: theme.palette.fontColor,
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
            backgroundColor: theme.palette.secondaryMainColor,
        },
        '& tbody tr:hover td span': {
            color: theme.palette.paperColor,
        }
    },
    printButton: {
        color: theme.isOldDesign ? `${theme.palette.secondaryMainColor} !important` : `${theme.palette.paperColor} !important`,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        border: theme.isOldDesign ? `1px solid ${theme.palette.secondaryMainColor}` : null,
        height: 35,
        borderRadius: 0,
    },
});

let isFirst = true;

class SectionsTable extends Component {

    state = {
        currentRow: this.props.sectionForShow ? this.props.sectionForShow : null,
    };

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        this.props.getSectionsInfo(userId);
        this.props.getVersionsFromServer();
    }

    componentWillMount() {
        const { versionsList } = this.props;
        let latestVersion = get(versionsList, [0], null);
        if (latestVersion) {
            this.props.getLatestVersion(latestVersion.sourceId, latestVersion.version);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { firstVersionInfo, getVersionsFromServer } = nextProps;
        if (get(firstVersionInfo, 'compositionUid', null) && isFirst) {
            isFirst = false;
            setTimeout(() => {
                getVersionsFromServer();
            }, 10000);
        }
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
        const { classes, sectionsInfo, toggleMode, currentVersionInfo, latestVersionInfo, versionsList, firstVersionInfo, currentVersion, sectionForShow, patientInfo } = this.props;
        const { currentRow } = this.state;
        let isVersionInfo = false;
        let versionSectionsInfo = null;
        if (currentVersion && sectionForShow) {
            versionSectionsInfo = currentVersionInfo;
            isVersionInfo = true;
        }
        const versionTitle = isVersionInfo ? 'Version ' + currentVersion : 'New version';
        const breadcrumbsResource = [
            { url: null, title: "ReSPECT", isActive: false, onClickAction: toggleMode },
            { url: null, title: versionTitle, isActive: false }
        ];
        const currentSection = this.getCurrentSection(currentRow);
        return (
            <div className={classes.container}>
                <Breadcrumbs resource={breadcrumbsResource} />
                <RespectPageHeader />
                <Grid container spacing={16} className={classes.mainBlock}>
                    <Grid className={classes.list} item xs={12} sm={currentRow ? 6 : 12}>
                        <div className={classes.blockTitle}>
                            <Typography className={classes.title}>ReSPECT Sections</Typography>
                            { isVersionInfo &&
                                <Tooltip title="Print">
                                    <IconButton className={classes.printButton} onClick={() => createPDF(currentVersionInfo, patientInfo)} >
                                        <PrintIcon />
                                    </IconButton>
                                </Tooltip>
                            }
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
                                        isVersionInfo={isVersionInfo}
                                    />
                                </Table>
                                <PublishButton toggleMode={toggleMode} versionsList={versionsList} firstVersionInfo={firstVersionInfo} isVersionInfo={isVersionInfo} />
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
            </div>
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
        currentVersionInfo: get(state, 'custom.versionsServerInfo.version', null),
        latestVersionInfo: get(state, 'custom.versionsServerInfo.latest', []),
        firstVersionInfo: get(state, 'custom.versionsServerInfo.first', null),
        versionsList: get(state, 'custom.versionsServerInfo.data', []),
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
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
        getVersionsFromServer() {
            dispatch(versionsServerAction.request());
        },
        getLatestVersion(sourceId, version) {
            dispatch(versionsServerAction.requestLatest(sourceId, version));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SectionsTable));
