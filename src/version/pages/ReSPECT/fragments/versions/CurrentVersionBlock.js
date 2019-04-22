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
    printButton: {
        color: "#fff",
    }
});

class CurrentVersionBlock extends Component {

    render() {
        const { classes, currentVersion, versionInfo, toggleMode, patientInfo } = this.props;

        const personalDetails = {
            preferredName: get(patientInfo, 'prefix', null),
            firstName: get(patientInfo, 'firstName', null),
            surname: get(patientInfo, 'lastName', null),
            streetAddress: get(patientInfo, 'address', null),
            addressSecondLine: "",
            city: get(patientInfo, 'city', null),
            county: get(patientInfo, 'district', null),
            postCode: get(patientInfo, 'postCode', null),
            country: get(patientInfo, 'country', null),
            nhsNumber: get(patientInfo, 'nhsNumber', null),
            birthDate: get(patientInfo, 'birthDate', null),
        };

        return (
            <Grid className={classes.mainBlock} item xs={12} sm={6}>
                <div className={classes.blockTitle}>
                    <Typography className={classes.title}>ReSPECT Sections (Version {currentVersion})</Typography>
                    <Tooltip title="Create">
                        <IconButton className={classes.printButton} onClick={() => createPDF(versionInfo, personalDetails)} >
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.tableList} aria-labelledby="tableTitle">
                            <TableHeadBlock />
                            <SectionsInfo sections={sections} versionInfo={versionInfo} toggleMode={toggleMode} currentVersion={currentVersion} />
                        </Table>
                    </div>
                </Paper>
            </Grid>
        );
    }

};

const mapStateToProps = state => {
    return {
        patientInfo: get(state, 'custom.currentPatient.patientInfo.data', null),
        versionInfo: get(state, 'custom.versionsServerInfo.version', null),
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(CurrentVersionBlock));
