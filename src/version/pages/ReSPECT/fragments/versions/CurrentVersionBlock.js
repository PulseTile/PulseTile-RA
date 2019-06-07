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

import TableHeadBlock from "../TableHeadBlock";
import SectionsInfo from "./SectionsInfo";
import sections from "../../sections";
import createPDF from "../pdfTool";

const styles = theme => ({
    mainBlock: {
        padding: 10,
    },
    blockTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 49,
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
        backgroundColor: theme.palette.mainColor,
        fontSize: 18,
        fontWeight: 700,
        paddingLeft: 15,
    },
    blockLoading: {
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: "center",
        backgroundColor: theme.palette.paperColor,
        borderLeft: `1px solid ${theme.palette.borderColor}`,
        borderRight: `1px solid ${theme.palette.borderColor}`,
        borderBottom: `1px solid ${theme.palette.borderColor}`,
    },
    title: {
        color: theme.isOldDesign ? theme.palette.fontColor : theme.palette.paperColor,
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
    }
});

class CurrentVersionBlock extends Component {

    render() {
        const { classes, currentVersion, versionInfo, toggleMode, patientInfo, isLoading } = this.props;
        return (
            <Grid className={classes.mainBlock} item xs={12} sm={6}>
                <div className={classes.blockTitle}>
                    <Typography className={classes.title}>ReSPECT Sections (Version {currentVersion})</Typography>
                    <Tooltip title="Print">
                        <IconButton className={classes.printButton} onClick={() => createPDF(versionInfo, patientInfo)} >
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                {
                    isLoading
                        ?
                            <div className={classes.blockLoading}>
                                <Typography>Loading...</Typography>
                            </div>
                        :
                            <Paper className={classes.root}>
                                <div className={classes.tableWrapper}>
                                    <Table className={classes.tableList} aria-labelledby="tableTitle">
                                        <TableHeadBlock />
                                        <SectionsInfo sections={sections} versionInfo={versionInfo} toggleMode={toggleMode} currentVersion={currentVersion} />
                                    </Table>
                                </div>
                            </Paper>
                }

            </Grid>
        );
    }

};

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
        versionInfo: get(state, 'custom.versionsServerInfo.version', null),
        isLoading: get(state, 'custom.versionsServerInfo.loading', null),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(CurrentVersionBlock));
