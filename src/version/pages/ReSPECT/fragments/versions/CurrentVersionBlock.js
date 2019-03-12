import React, { Component } from "react";
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TableHeadBlock from "../TableHeadBlock";
import SectionsInfo from "./SectionsInfo";
import sections from "../../sections";

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
        fontWeight: 700,
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

class CurrentVersionBlock extends Component {

    render() {
        const { classes, currentVersion, versionsInfo, toggleMode } = this.props;
        const versionInfo = get(versionsInfo, [[currentVersion - 1], 'sections'], []);
        return (
            <Grid className={classes.mainBlock} item xs={12} sm={6}>
                <div className={classes.blockTitle}>
                    <Typography className={classes.title}>ReSPECT Sections (Version {currentVersion})</Typography>
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
        versionsInfo: state.custom.versionsInfo.data,
    }
};

export default connect(mapStateToProps, null)(withStyles(styles)(CurrentVersionBlock));
