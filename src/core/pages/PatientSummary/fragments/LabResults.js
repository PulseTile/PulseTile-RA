import React from "react";
import get from "lodash/get";
import moment from "moment";
import { GET_LIST } from "react-admin";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import customDataProvider from "../../../dataProviders/dataProvider";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import HorizontalBarChart from "./HorizontalBarChart";

const styles = theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableList: {
        '& thead': {
            backgroundColor: theme.palette.tableHeadColor,
            '& tr th': {
                fontSize: 14,
                paddingLeft: 10,
            },
        },
        '& tbody tr td span': {
            paddingLeft: 10,
            fontSize: 14,
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.secondaryMainColor,
            '& td span': {
                color: theme.palette.paperColor,
            }
        },
    },
    value: {
        marginTop: 15,
    },
    valueWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chartBlock: {
        width: '60%',
    }
});

const LabResults = ({ classes }) => {
    // const labResults = customDataProvider(GET_LIST, 'labresults', {});
    // const labResultsArray = get(labResults, 'data', []);

    const COLOR_AMBER = '#ffac5a';
    const COLOR_GREEN = '#2dcd0d';
    const COLOR_YELLOW = '#fbf800';
    const COLOR_RED = '#ff5d00';

    const dummyLabResults = [
        { testName: 'HBA1C', normalRange: '< 200', value: 187, units: 'mg/dL', dateCreated: '22-Jun-2019', color: COLOR_GREEN, maximal: 300 },
        { testName: 'Glucose', normalRange: '< 75', value: 42, units: 'mmol/L', dateCreated: '15-Jul-2019', color: COLOR_GREEN, maximal: 400  },
        { testName: 'Glucose', normalRange: '< 75', value: 70, units: 'mmol/L', dateCreated: '26-Jun-2019', color: COLOR_YELLOW, maximal: 140  },
        { testName: 'Glucose', normalRange: '< 75', value: 86, units: 'mg/L', dateCreated: '05-May-2019', color: COLOR_AMBER, maximal: 100  },
    ];

    return (
        <React.Fragment>
            <div className={classes.blockTitle}>
                <Typography className={classes.title}>Lab Results</Typography>
            </div>
            <Grid container xs={12} className={classes.content}>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.tableList} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Normal Range</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                dummyLabResults.map((item, key) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.testName}</span>
                                            </TableCell>
                                            <TableCell scope="row" padding="none">
                                                <span>{item.normalRange}</span>
                                            </TableCell>
                                            <TableCell scope="row" padding="none">
                                                <div className={classes.valueWithBar}>
                                                    <span className={classes.value}>{item.value} {item.units}</span>
                                                    <div className={classes.chartBlock}>
                                                        <HorizontalBarChart value={item.value} color={item.color} maximal={item.maximal} />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {/*<span>{moment(item.dateCreated).format('DD-MMM-YYYY')}</span>*/}
                                                <span>{item.dateCreated}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default withStyles(styles)(LabResults);
